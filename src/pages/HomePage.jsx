import { Link } from 'react-router-dom';
import {
  freelanceIdentity,
  homepageContent,
  coreServices,
  caseStudies,
  servicePackages,
} from '../data/businessData';

export default function HomePage() {
  return (
    <div className="page-home">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="section section-hero" aria-labelledby="hero-heading">
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="hero-badge-pill" aria-label="Role Identity">
              <span className="pill-dot" aria-hidden="true" />
              <span>{freelanceIdentity.title}</span>
            </div>
            <h1 id="hero-heading" className="hero-title">
              {homepageContent.headline}
            </h1>
            <p className="hero-sub">{homepageContent.subheadline}</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                {homepageContent.ctaText}
              </Link>
              <Link to="/services" className="btn btn-secondary">
                View Services &amp; Pricing
              </Link>
            </div>
          </div>

          <div className="hero-card-summary" aria-label="Identity Highlights">
            <div className="summary-card-inner">
              <h2>{freelanceIdentity.title}</h2>
              <p>{freelanceIdentity.summary}</p>
              <div className="tech-badge-list" role="list">
                <span className="tech-tag" role="listitem">WCAG 2.1 / 2.2 AA</span>
                <span className="tech-tag" role="listitem">Web (HTML/ARIA)</span>
                <span className="tech-tag" role="listitem">iOS (Swift)</span>
                <span className="tech-tag" role="listitem">Android (Kotlin)</span>
                <span className="tech-tag" role="listitem">NVDA / VoiceOver / TalkBack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Value Proposition Pillars ───────────────────────────── */}
      <section className="section section-pillars" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="pillars-heading" className="section-heading">
              Value Proposition
            </h2>
            <p className="section-description">
              Full-stack accessibility engineering that bridges the gap between legal audit checklists and direct codebase fixes.
            </p>
          </div>

          <div className="pillars-grid">
            {homepageContent.pillars.map((pillar) => (
              <div key={pillar.id} className="pillar-card">
                <div className="pillar-header">
                  <span className="pillar-icon" aria-hidden="true">{pillar.icon}</span>
                  <span className="pillar-badge">{pillar.badge}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services Overview Teaser ─────────────────────────────── */}
      <section className="section section-services-teaser" aria-labelledby="services-teaser-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="services-teaser-heading" className="section-heading">
              Core Services &amp; Packages
            </h2>
            <p className="section-description">
              From platform audits to codebase remediation and continuous sprint testing.
            </p>
          </div>

          <div className="services-teaser-grid">
            {coreServices.map((service) => (
              <div key={service.id} className="service-teaser-card">
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
                <h3>{service.title}</h3>
                <p className="service-platforms">
                  <strong>Platforms:</strong> {service.platforms.join(', ')}
                </p>
                <p>{service.summary}</p>
                <div className="service-card-meta">
                  <span className="meta-price">{service.pricing}</span>
                  <span className="meta-time">{service.timeframe}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="center-cta">
            <Link to="/services" className="btn btn-primary">
              Explore All Services &amp; Packages &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Case Studies Teaser ──────────────────────────── */}
      <section className="section section-cases-teaser" aria-labelledby="cases-teaser-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="cases-teaser-heading" className="section-heading">
              Accessibility Remediation Portfolio
            </h2>
            <p className="section-description">
              Examples of complex keyboard navigation, ARIA live region, and screen reader defect fixes.
            </p>
          </div>

          <div className="cases-grid-teaser">
            {caseStudies.slice(0, 3).map((study) => (
              <article key={study.id} className="case-teaser-card">
                <div className="case-badge-bar">
                  <span className={`severity-tag severity-${study.severity.toLowerCase()}`}>
                    {study.severity} Severity
                  </span>
                  <span className="platform-tag">{study.platform}</span>
                </div>
                <h3>{study.title}</h3>
                <p className="wcag-spec">
                  <strong>Standard:</strong> {study.wcag}
                </p>
                <p>{study.problem}</p>
              </article>
            ))}
          </div>

          <div className="center-cta">
            <Link to="/examples" className="btn btn-secondary">
              View Full Portfolio &amp; Engineering Details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner ────────────────────────────────────── */}
      <section className="section section-cta-banner" aria-labelledby="cta-banner-heading">
        <div className="container cta-banner-inner">
          <h2 id="cta-banner-heading">Ready to Make Your Product Accessible to Everyone?</h2>
          <p>
            Get a comprehensive review of your web or mobile product with a free, no-obligation mini-audit.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Request a Free Mini-Audit Now
          </Link>
        </div>
      </section>
    </div>
  );
}
