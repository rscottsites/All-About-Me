import { Link } from 'react-router-dom';
import { coreServices, sampleAuditDeliverable } from '../data/businessData';
import PackagesTable from '../components/PackagesTable';
import LeadMagnetSection from '../components/LeadMagnetSection';

export default function ServicesPage() {
  return (
    <div className="page-services">
      {/* ─── Header Section ──────────────────────────────────────── */}
      <section className="section page-header-section">
        <div className="container">
          <h1 id="services-page-title" className="page-title">
            Core Services &amp; Service Packages
          </h1>
          <p className="page-lead">
            Comprehensive digital accessibility engineering tailored for web, iOS, and Android applications.
            From initial WCAG compliance audits to direct codebase remediation and continuous QA retainers.
          </p>
        </div>
      </section>

      {/* ─── Core Services Detailed Breakdown ───────────────────────── */}
      <section className="section section-services-list">
        <div className="container">
          <h2 id="core-services-heading" className="section-heading">
            Core Engineering Services
          </h2>
          <p className="section-description">
            Tailored solutions covering audits, hands-on engineering remediation, and sprint QA testing across all major platforms.
          </p>

          <div className="services-detail-stack">
            {coreServices.map((service) => (
              <article key={service.id} className="service-detail-card">
                <div className="service-detail-header">
                  <div className="title-group">
                    <span className="detail-icon" aria-hidden="true">{service.icon}</span>
                    <div>
                      <h3>{service.title}</h3>
                      <div className="platform-badges" role="list">
                        {service.platforms.map((plat) => (
                          <span key={plat} className="badge-plat" role="listitem">
                            {plat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pricing-box">
                    <span className="price-tag">{service.pricing}</span>
                    <span className="time-tag">Time: {service.timeframe}</span>
                  </div>
                </div>

                <div className="service-detail-body">
                  <p className="service-desc">{service.summary}</p>
                  <h4>Key Capabilities &amp; Deliverables:</h4>
                  <ul className="highlights-list" role="list">
                    {service.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="check-mark" aria-hidden="true">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sample Deliverable Section ───────────────────────────── */}
      <section className="section section-deliverable">
        <div className="container">
          <div className="section-header">
            <h2 id="deliverable-heading" className="section-heading">
              {sampleAuditDeliverable.title}
            </h2>
            <p className="section-description">
              {sampleAuditDeliverable.subtitle}
            </p>
          </div>

          <div className="deliverable-card">
            <div className="deliverable-grid">
              {sampleAuditDeliverable.components.map((comp, idx) => (
                <div key={idx} className="deliverable-item">
                  <span className="deliverable-num" aria-hidden="true">0{idx + 1}</span>
                  <h3>{comp.title}</h3>
                  <p>{comp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service Packages Section ─────────────────────────────── */}
      <section className="section section-packages">
        <div className="container">
          <div className="section-header">
            <h2 id="packages-heading" className="section-heading">
              Service Packages &amp; Pricing
            </h2>
            <p className="section-description">
              Choose the engagement model that best matches your organization&apos;s current compliance state and development goals.
            </p>
          </div>

          <PackagesTable />
        </div>
      </section>

      {/* ─── Secondary Lead Magnet Section ──────────────────────── */}
      <LeadMagnetSection />

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section className="section section-cta-banner">
        <div className="container cta-banner-inner">
          <h2>Need a Custom Engineering Engagement?</h2>
          <p>
            Whether you need a full overhaul, a monthly retainer, or immediate fixes for critical violations, let&apos;s start with a free mini-audit of your site—delivered in 48 hours.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Request a Free Mini-Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
