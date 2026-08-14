import { useEffect, useRef } from 'react';
import { leadMagnetInfo } from '../data/leadMagnetData';

export default function LeadMagnetGuideModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = leadMagnetInfo.pdfUrl;
    link.download = leadMagnetInfo.pdfFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="lead-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
        aria-describedby="guide-modal-desc"
        className="lead-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lead-modal-header">
          <div className="lead-modal-header-titles">
            <span className="lead-badge-pill">{leadMagnetInfo.format}</span>
            <h2 id="guide-modal-title">{leadMagnetInfo.title}</h2>
            <p id="guide-modal-desc" className="lead-modal-subtitle">
              By {leadMagnetInfo.author} &bull; {leadMagnetInfo.version}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="lead-modal-close-btn"
            onClick={onClose}
            aria-label="Close guide viewer"
          >
            ✕
          </button>
        </div>

        <div className="lead-modal-toolbar">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleDownloadPdf}
          >
            <span aria-hidden="true">📥</span> Download PDF Guide
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handlePrint}
          >
            <span aria-hidden="true">🖨️</span> Print / Save to PDF
          </button>
        </div>

        <div className="lead-modal-body">
          <div className="lead-guide-article">
            <p className="lead-guide-intro-text">
              {leadMagnetInfo.intro}
            </p>

            <div className="lead-guide-sections-list">
              {leadMagnetInfo.highlights.map((item) => (
                <article key={item.number} className="lead-guide-item-card">
                  <h3 className="lead-guide-item-heading">
                    {item.number}. {item.title}
                  </h3>
                  <ul className="lead-guide-bullets">
                    <li>
                      <strong>The Challenge:</strong> {item.challenge}
                    </li>
                    <li>
                      <strong>Best Practices:</strong> {item.bestPractices}
                    </li>
                  </ul>
                </article>
              ))}
            </div>

            <div className="lead-guide-services-callout">
              <h3>{leadMagnetInfo.services.title}</h3>
              <p>{leadMagnetInfo.services.description}</p>
              <ul className="lead-guide-contact-links">
                <li>
                  <strong>Website:</strong>{' '}
                  <a href={leadMagnetInfo.services.website} target="_blank" rel="noopener noreferrer">
                    {leadMagnetInfo.services.website}
                  </a>
                </li>
                <li>
                  <strong>Contact:</strong>{' '}
                  <a href={`mailto:${leadMagnetInfo.services.contactEmail}`}>
                    {leadMagnetInfo.services.contactEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lead-modal-footer">
          <p>
            Ready to ensure your web and mobile applications meet WCAG 2.1/2.2 AA standards?
          </p>
          <div className="lead-modal-footer-actions">
            <a href="/contact" className="btn btn-primary btn-sm">
              Request Free Mini-Audit
            </a>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
