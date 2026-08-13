import { Link } from 'react-router-dom';
import {
  freelanceIdentity,
  homepageContent,
  businessROI,
  processSteps,
  testimonials,
  coreServices,
  caseStudies,
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

      {/* ─── Business ROI & Bottom-Line Section ────────────────────── */}
      <section className="section section-roi" aria-labelledby="roi-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="roi-heading" className="section-heading">
              Why Accessibility Matters to Your Bottom Line
            </h2>
            <p className="section-description">
              Web accessibility is more than compliance—it directly protects revenue, improves search engine rankings, and expands your market reach.
            </p>
          </div>

          <div className="roi-grid">
            {businessROI.map((item) => (
              <div key={item.id} className="roi-card">
                <div className="roi-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
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

      {/* ─── 3-Step Process Flow ─────────────────────────────────── */}
      <section className="section section-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="process-heading" className="section-heading">
              How We Work: Simple 3-Step Engagement
            </h2>
            <p className="section-description">
              From low-friction initial audit to hands-on code remediation and verified WCAG compliance.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.step} className="process-card">
                <span className="step-num" aria-hidden="true">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
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
              Real-world examples of complex keyboard navigation, ARIA live region, and screen reader defect fixes.
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

      {/* ─── Social Proof & Testimonials ──────────────────────────── */}
      <section className="section section-testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="testimonials-heading" className="section-heading">
              Client &amp; Colleague Endorsements
            </h2>
            <p className="section-description">
              Trusted by engineering managers, architects, and product leaders.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="testimonial-card">
                <p className="quote-text">&ldquo;{t.quote}&rdquo;</p>
                <footer className="quote-footer">
                  <cite className="author-name">{t.author}</cite>
                  <span className="author-role">{t.role}, <strong>{t.company}</strong></span>
                </footer>
              </blockquote>
            ))}
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
