import { useState, useEffect, useRef } from 'react';
import { leadMagnetInfo } from '../data/leadMagnetData';
import LeadMagnetGuideModal from './LeadMagnetGuideModal';
import { trackEvent } from '../utils/analytics';

export default function LeadMagnetDownloadModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', bot_field: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);
  const errorSummaryRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          if (isGuideOpen) {
            setIsGuideOpen(false);
          } else {
            onClose();
          }
        }
        if (e.key === 'Tab') {
          const focusable = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose, isGuideOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your work email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid work email address.';
    }
    return errs;
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
    if (formData.bot_field) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        resource: leadMagnetInfo.title,
        downloadTime: new Date().toISOString(),
        formType: 'lead-magnet-modal',
      };

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      trackEvent('pdf_guide_downloaded', {
        formType: 'modal',
        resource: leadMagnetInfo.title,
      });

      setDownloaded(true);
      triggerDownload();
    } catch {
      setDownloaded(true);
      triggerDownload();
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <>
      <div className="lead-modal-backdrop" onClick={onClose} role="presentation">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
          aria-describedby="download-modal-desc"
          className="lead-modal-dialog lead-download-modal-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="lead-modal-header">
            <div className="lead-modal-header-titles">
              <span className="lead-badge-pill">{leadMagnetInfo.format} • {leadMagnetInfo.readTime}</span>
              <h2 id="download-modal-title">{leadMagnetInfo.title}</h2>
              <p id="download-modal-desc" className="lead-modal-subtitle">
                {leadMagnetInfo.subtitle}
              </p>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              className="lead-modal-close-btn"
              onClick={onClose}
              aria-label="Close download modal"
            >
              ✕
            </button>
          </div>

          <div className="lead-download-modal-body">
            {downloaded ? (
              <div className="lead-magnet-success" role="region" aria-live="polite">
                <div className="success-icon" aria-hidden="true">🎉</div>
                <h3>Your Free PDF Guide is Ready!</h3>
                <p>
                  Your download of <strong>{leadMagnetInfo.pdfFileName}</strong> should start automatically.
                </p>
                <div className="success-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={triggerDownload}
                  >
                    📥 Click Here If Download Didn&apos;t Start
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsGuideOpen(true)}
                  >
                    📖 Read Online in Browser
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form className="lead-magnet-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="modal_bot_field">Do not fill this field</label>
                  <input
                    id="modal_bot_field"
                    name="bot_field"
                    type="text"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.bot_field}
                    onChange={handleChange}
                  />
                </div>

                {Object.keys(errors).length > 0 && (
                  <div
                    ref={errorSummaryRef}
                    className="error-summary-box"
                    tabIndex="-1"
                    role="alert"
                    aria-live="assertive"
                  >
                    <h3>Please resolve the following:</h3>
                    <ul>
                      {Object.entries(errors).map(([field, msg]) => (
                        <li key={field}>
                          <a href={`#modal-lead-${field}-input`}>{msg}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="form-helper-note">
                  Enter your information below to instantly download the PDF guide.
                </p>

                <div className="form-group">
                  <label htmlFor="modal-lead-name-input">
                    Full Name <span className="req-star" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="modal-lead-name-input"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'modal-lead-name-error' : undefined}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Alex Morgan"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <span id="modal-lead-name-error" className="field-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="modal-lead-email-input">
                    Work Email <span className="req-star" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="modal-lead-email-input"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'modal-lead-email-error' : undefined}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., alex@company.com"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <span id="modal-lead-email-error" className="field-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? 'Generating Download Link...' : '📥 Download Free PDF Guide'}
                </button>

                <p className="privacy-micro-note">
                  🔒 No spam, ever. Zero obligation. Instant direct PDF download.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <LeadMagnetGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </>
  );
}
