import { useSearchParams } from 'react-router-dom';
import MiniAuditForm from '../components/MiniAuditForm';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const selectedPackage = searchParams.get('package') || 'mini-audit';

  return (
    <div className="page-contact">
      {/* ─── Page Header ────────────────────────────────────────── */}
      <section className="section page-header-section" aria-labelledby="contact-page-title">
        <div className="container">
          <h1 id="contact-page-title" className="page-title">
            Request a Free Mini-Audit &amp; Get in Touch
          </h1>
          <p className="page-lead">
            Take the first step toward WCAG 2.1/2.2 AA compliance. Request a free mini-audit of your key user flows,
            or inquire about codebase remediation engineering and monthly retainers.
          </p>
        </div>
      </section>

      {/* ─── Contact Form & Sidebar Section ────────────────────────── */}
      <section className="section section-contact-body" aria-labelledby="contact-form-heading">
        <div className="container contact-grid">
          <div className="form-column">
            <h2 id="contact-form-heading" className="section-subheading">
              Mini-Audit Request Intake Form
            </h2>
            <p className="form-intro">
              Fill out the form below to receive a zero-obligation mini-audit of your digital product.
            </p>

            <MiniAuditForm initialPackage={selectedPackage} />
          </div>

          <aside className="contact-sidebar">
            <div className="sidebar-card highlight-card">
              <h3>What&apos;s Included in Your Free Mini-Audit?</h3>
              <ul className="audit-benefits-list" role="list">
                <li>
                  <span className="benefit-icon" aria-hidden="true">🎯</span>
                  <div>
                    <strong>Focused Flow Evaluation:</strong>
                    <span>Audit of 1-2 critical user conversion funnels (checkout, signup, dashboard).</span>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon" aria-hidden="true">⚡</span>
                  <div>
                    <strong>Top WCAG Defects Identified:</strong>
                    <span>Highlight of top 3-5 blocking keyboard trap or screen reader accessibility violations.</span>
                  </div>
                </li>
                <li>
                  <span className="benefit-icon" aria-hidden="true">🛠</span>
                  <div>
                    <strong>Actionable Code Roadmap:</strong>
                    <span>Engineering instructions on how your dev team can fix the violations in code.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Direct Contact Information</h3>
              <p className="contact-info-line">
                <strong>Email:</strong>{' '}
                <a href="mailto:ryanscott@rscottsites.com" className="contact-link">
                  ryanscott@rscottsites.com
                </a>
              </p>
              <p className="contact-info-line">
                <strong>Response Time:</strong> 1–2 business days guaranteed.
              </p>
              <p className="contact-info-line">
                <strong>Location:</strong> Remote / U.S. West Coast
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
