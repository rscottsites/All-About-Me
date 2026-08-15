import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { leadMagnetInfo } from '../data/leadMagnetData';
import LeadMagnetGuideModal from './LeadMagnetGuideModal';
import { trackEvent } from '../utils/analytics';

export default function LeadMagnetSection({ compact = false, className = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consent: false,
    bot_field: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const errorSummaryRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'First name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.consent) {
      newErrors.consent = 'Please provide your consent to download the guide.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = leadMagnetInfo.pdfUrl;
    link.download = leadMagnetInfo.pdfFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    if (formData.bot_field) {
      setDownloaded(true);
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: Send dispatch to /api/contact
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          websiteUrl: 'Lead Magnet Download (Web Accessibility Challenges PDF)',
          platform: 'lead-magnet',
          selectedPackage: 'Lead Magnet: 5 Common Web Accessibility Challenges',
          primaryGoal: 'lead-magnet-download',
          message: `User downloaded '${leadMagnetInfo.title}' from the website.`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      trackEvent('pdf_guide_downloaded', {
        formType: compact ? 'compact-section' : 'lead-section',
        resource: leadMagnetInfo.title,
      });

      if (res.ok && data.success) {
        setDownloaded(true);
        triggerDownload();
        return;
      }

      // Step 2: Fallback to Web3Forms
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'b9423c10-82a8-48b4-9279-8809f6d634db',
          subject: `[Lead Magnet] ${formData.name.trim()} downloaded Web Accessibility Challenges PDF`,
          from_name: formData.name.trim(),
          email: formData.email.trim(),
          to_email: 'ryanscott@rscottsites.com',
          message: `Lead Magnet Download: ${formData.name} (${formData.email}) downloaded '${leadMagnetInfo.title}'.`,
        }),
      });

      if (web3Res.ok) {
        setDownloaded(true);
        triggerDownload();
        return;
      }

      // Always deliver the PDF even if network notifications fail
      setDownloaded(true);
      triggerDownload();
    } catch (err) {
      console.warn('Lead magnet dispatch note:', err.message);
      setDownloaded(true);
      triggerDownload();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        id={compact ? undefined : 'lead-magnet'}
        className={`section-lead-magnet ${compact ? 'lead-magnet-compact' : ''} ${className}`}
        aria-labelledby="lead-magnet-heading"
      >
        <div className={compact ? 'lead-magnet-compact-inner' : 'container lead-magnet-inner'}>
          <div className="lead-magnet-content">
            <div className="lead-magnet-badge" aria-label="Free Resource Type">
              <span className="lead-badge-icon" aria-hidden="true">📄</span>
              <span>{leadMagnetInfo.format} &bull; {leadMagnetInfo.readTime}</span>
            </div>

            <h2 id="lead-magnet-heading" className="lead-magnet-title">
              {leadMagnetInfo.title}
            </h2>

            <p className="lead-magnet-subtitle">
              {leadMagnetInfo.subtitle}
            </p>

            {!compact && (
              <ul className="lead-magnet-topics" aria-label="5 common challenges covered in this guide">
                {leadMagnetInfo.highlights.slice(0, 4).map((h) => (
                  <li key={h.number}>
                    <span className="topic-icon" aria-hidden="true">✓</span>
                    <span>
                      <strong>{h.title}:</strong> {h.bestPractices}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lead-magnet-card-wrapper">
            <div className="lead-magnet-card">
              {downloaded ? (
                <div className="lead-magnet-success" role="region" aria-live="polite">
                  <div className="success-icon-badge" aria-hidden="true">🎉</div>
                  <h3 className="success-title">Your PDF Guide is Ready!</h3>
                  <p className="success-desc">
                    We've triggered your download of <strong>{leadMagnetInfo.pdfFileName}</strong>.
                  </p>
                  <div className="success-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setModalOpen(true)}
                    >
                      📖 Read Guide Online
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={triggerDownload}
                    >
                      📥 Re-download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="lead-magnet-form"
                  aria-label="Download 5 Common Web Accessibility Challenges PDF form"
                >
                  <h3 className="form-card-title">Get Free Instant Access</h3>
                  <p className="form-card-subtitle">
                    Zero spam. Download the PDF guide instantly to read or share with your team.
                  </p>

                  {Object.keys(errors).length > 0 && (
                    <div
                      ref={errorSummaryRef}
                      tabIndex={-1}
                      className="error-summary-box"
                      role="alert"
                      aria-live="assertive"
                    >
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>Please fix:</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem' }}>
                        {Object.entries(errors).map(([k, msg]) => (
                          <li key={k}>{msg}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Honeypot field */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="lead-bot-field">Do not fill this field:</label>
                    <input
                      id="lead-bot-field"
                      type="text"
                      name="bot_field"
                      value={formData.bot_field}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lead-name" className="form-label">
                      First Name <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="e.g. Sarah"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'lead-name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="lead-name-error" role="alert" className="field-error-text">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lead-email" className="form-label">
                      Work Email <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'lead-email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="lead-email-error" role="alert" className="field-error-text">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group form-group-checkbox">
                    <div className="checkbox-control">
                      <input
                        id="lead-consent-checkbox"
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? 'lead-consent-error' : undefined}
                        disabled={submitting}
                      />
                      <label htmlFor="lead-consent-checkbox" className="checkbox-label">
                        I consent to receive this digital accessibility guide and occasional updates.
                      </label>
                    </div>
                    <p className="checkbox-privacy-note">
                      🔒 We respect your inbox privacy. Unsubscribe anytime. View our <Link to="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy <span className="sr-only">(opens in a new tab)</span></Link> and <Link to="/terms" target="_blank" rel="noopener noreferrer">Terms of Service <span className="sr-only">(opens in a new tab)</span></Link>.
                    </p>
                    {errors.consent && (
                      <span id="lead-consent-error" role="alert" className="field-error-text">
                        {errors.consent}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary btn-block"
                  >
                    {submitting ? (
                      <span className="btn-loading-state">
                        <span className="spinner" aria-hidden="true" />
                        Preparing PDF Download...
                      </span>
                    ) : (
                      '📥 Download Free PDF Guide'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Guide Reader Modal */}
      <LeadMagnetGuideModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
