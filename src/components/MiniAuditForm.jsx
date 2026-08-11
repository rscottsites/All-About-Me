import { useState, useRef } from 'react';

export default function MiniAuditForm({ initialPackage = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    platform: 'web',
    selectedPackage: initialPackage || 'mini-audit',
    primaryGoal: 'compliance',
    message: '',
    bot_field: '', // Honeypot field for bot prevention
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@company.com).';
    }
    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = 'Please enter your website or application URL.';
    } else if (
      !/^https?:\/\//i.test(formData.websiteUrl.trim()) &&
      !/^[a-z0-9-]+(\.[a-z0-9-]+)+/i.test(formData.websiteUrl.trim())
    ) {
      newErrors.websiteUrl = 'Please enter a valid web URL or app store link.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data = {};
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      }

      if (!res.ok || data.success === false) {
        const friendlyError =
          data.error ||
          (res.status === 404
            ? 'Form server route is not available locally. You can send your request directly via email.'
            : 'We could not dispatch your request automatically. Please email rscott.sites@gmail.com directly.');
        throw new Error(friendlyError);
      }

      setSubmitted(true);
    } catch (err) {
      console.warn('Form submission notice:', err.message);

      // In local development mode, simulate success if backend server route is not running locally
      if (import.meta.env.DEV) {
        console.log('Dev mode: Simulated successful mini-audit submission:', formData);
        setSubmitted(true);
      } else {
        setServerError(
          err.message ||
            'We encountered a problem sending your request. Please email rscott.sites@gmail.com directly.'
        );
        setTimeout(() => {
          errorSummaryRef.current?.focus();
        }, 50);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoLink = `mailto:rscott.sites@gmail.com?subject=${encodeURIComponent(
    `[Mini-Audit Request] ${formData.name || 'New Lead'}`
  )}&body=${encodeURIComponent(
    `Hi Ryan,\n\nI would like to request a free mini-audit.\n\nName: ${formData.name}\nEmail: ${formData.email}\nWebsite/App URL: ${formData.websiteUrl}\nPlatform: ${formData.platform}\nPackage Interest: ${formData.selectedPackage}\nPrimary Goal: ${formData.primaryGoal}\nDetails: ${formData.message}\n`
  )}`;

  if (submitted) {
    return (
      <div
        className="form-success-card"
        role="region"
        aria-live="polite"
        aria-label="Mini-Audit Request Confirmation"
      >
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>
        <h3>Request Received!</h3>
        <p>
          Thank you, <strong>{formData.name}</strong>. I have received your request for a
          free mini-audit for <strong>{formData.websiteUrl}</strong>.
        </p>
        <p>
          I will review your platform and get back to you at <strong>{formData.email}</strong> within
          1–2 business days with an actionable initial audit overview.
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              websiteUrl: '',
              platform: 'web',
              selectedPackage: 'mini-audit',
              primaryGoal: 'compliance',
              message: '',
              bot_field: '',
            });
          }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || !!serverError;

  return (
    <form className="mini-audit-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot input field to block automated spam bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="bot_field">Do not fill this field</label>
        <input
          id="bot_field"
          name="bot_field"
          type="text"
          tabIndex="-1"
          autoComplete="off"
          value={formData.bot_field}
          onChange={handleChange}
        />
      </div>

      {hasErrors && (
        <div
          ref={errorSummaryRef}
          className="error-summary-box"
          tabIndex="-1"
          role="alert"
          aria-live="assertive"
          aria-labelledby="error-summary-heading"
        >
          <h3 id="error-summary-heading">Please review the following:</h3>
          {serverError ? (
            <div className="server-error-content">
              <p style={{ margin: 0, fontWeight: 600 }}>{serverError}</p>
              <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>
                Or click here to{' '}
                <a href={mailtoLink} style={{ textDecoration: 'underline', fontWeight: 700 }}>
                  email rscott.sites@gmail.com directly with 1-click
                </a>
                .
              </p>
            </div>
          ) : (
            <ul>
              {Object.entries(errors).map(([field, msg]) => (
                <li key={field}>
                  <a href={`#${field}-input`}>{msg}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name-input">
          Full Name <span className="required-asterisk" aria-hidden="true">*</span>
        </label>
        <input
          id="name-input"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          placeholder="e.g. Jane Doe"
          disabled={submitting}
        />
        {errors.name && (
          <span id="name-error" className="field-error-message">
            <span aria-hidden="true">⚠️ </span>{errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email-input">
          Work Email Address <span className="required-asterisk" aria-hidden="true">*</span>
        </label>
        <input
          id="email-input"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="e.g. jane@company.com"
          disabled={submitting}
        />
        {errors.email && (
          <span id="email-error" className="field-error-message">
            <span aria-hidden="true">⚠️ </span>{errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="websiteUrl-input">
          Website or App URL <span className="required-asterisk" aria-hidden="true">*</span>
        </label>
        <input
          id="websiteUrl-input"
          name="websiteUrl"
          type="url"
          value={formData.websiteUrl}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.websiteUrl}
          aria-describedby={errors.websiteUrl ? 'websiteUrl-error' : undefined}
          placeholder="https://yourcompany.com"
          disabled={submitting}
        />
        {errors.websiteUrl && (
          <span id="websiteUrl-error" className="field-error-message">
            <span aria-hidden="true">⚠️ </span>{errors.websiteUrl}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="platform-input">Platform Type</label>
          <select
            id="platform-input"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="web">Web Application / Site</option>
            <option value="ios">iOS Native App (Swift/UIKit)</option>
            <option value="android">Android Native App (Kotlin)</option>
            <option value="multi">Multi-Platform (Web + Mobile)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="package-input">Service Package Interest</label>
          <select
            id="package-input"
            name="selectedPackage"
            value={formData.selectedPackage}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="mini-audit">Free Mini-Audit (Initial Review)</option>
            <option value="package-a">Package A: The Complete Overhaul ($7,000–$15,000)</option>
            <option value="package-b">Package B: Monthly Accessibility QA ($1,000–$4,000/mo)</option>
            <option value="package-c">Package C: Targeted Fixes ($1,500–$3,500)</option>
            <option value="hourly">Hourly Remediation Engineering ($75–$150/hr)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="primaryGoal-input">Primary Objective</label>
        <select
          id="primaryGoal-input"
          name="primaryGoal"
          value={formData.primaryGoal}
          onChange={handleChange}
          disabled={submitting}
        >
          <option value="compliance">Achieve WCAG 2.1 / 2.2 AA Compliance</option>
          <option value="legal-risk">Mitigate Legal Risk / Address Demand Letter</option>
          <option value="code-remediation">Direct Codebase Remediation & ARIA Fixes</option>
          <option value="qa-sprint">Ongoing Sprint & Assistive Tech QA Retainer</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message-input">Additional Project Details (Optional)</label>
        <textarea
          id="message-input"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your product, tech stack, key user flows, or specific accessibility challenges..."
          disabled={submitting}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-submit"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? 'Submitting Request...' : 'Request Free Mini-Audit'}
      </button>
    </form>
  );
}
