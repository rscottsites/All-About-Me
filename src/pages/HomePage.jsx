import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LeadMagnetSection from '../components/LeadMagnetSection';
import {
  homepageContent,
  businessROI,
  processSteps,
  caseStudies,
} from '../data/businessData';

const HOME_TABS = [
  {
    id: 'roi',
    label: 'Why accessibility matters',
  },
  {
    id: 'pillars',
    label: 'Bridging the gap',
  },
  {
    id: 'portfolio',
    label: 'Case studies',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('roi');
  const tabRefs = useRef([]);

  const handleTabKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % HOME_TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + HOME_TABS.length) % HOME_TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = HOME_TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(HOME_TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="page-home">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="section section-hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1 id="hero-heading" className="hero-title">
              {homepageContent.headline}
            </h1>
            <p className="hero-sub">{homepageContent.subheadline}</p>
            <div className="tech-badge-list" role="list">
              <span className="tech-tag" role="listitem">WCAG 2.1 / 2.2 AA</span>
              <span className="tech-tag" role="listitem">Web (HTML/ARIA)</span>
              <span className="tech-tag" role="listitem">iOS (Swift)</span>
              <span className="tech-tag" role="listitem">Android (Kotlin)</span>
              <span className="tech-tag" role="listitem">NVDA / VoiceOver / TalkBack</span>
            </div>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-secondary">
                View services &amp; pricing
              </Link>
            </div>
          </div>

          <div className="hero-card-summary">
            <div className="summary-card-inner">
              <h2>Free accessibility mini-audit</h2>
              <div className="summary-card-action">
                <p className="summary-card-hook">
                  Find the accessibility barriers hiding in your most important website flows—before they cost you customers or create legal exposure.
                  <br />
                  Get a free mini-audit and prioritized WCAG risk scorecard within 48 hours.
                </p>
                <Link to="/contact" className="btn btn-primary">
                  {homepageContent.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3-Step Process Flow (2-Column Minimalist Layout) ────── */}
      <section className="section section-process" aria-labelledby="process-heading">
        <div className="container process-layout">
          <div className="process-header-col">
            <h2 id="process-heading" className="process-main-title">
              How we work
            </h2>
            <p className="process-lead">
              From low-friction initial audit to hands-on code remediation and verified WCAG compliance.
            </p>
          </div>

          <div className="process-steps-col">
            {processSteps.map((step) => (
              <div key={step.step} className="process-step-item" aria-label={`Step ${step.step}`}>
                <div className="step-num-wrap">
                  <span className="step-num" aria-hidden="true">{step.step}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tabbed Knowledge & Capabilities Section ────────────── */}
      <section className="section section-tabbed-capabilities" aria-label="Core accessibility areas">
        <div className="container">
          <div
            className="home-tablist"
            role="tablist"
            aria-label="Capabilities and value sections"
          >
            {HOME_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[idx] = el)}
                id={`home-tab-${tab.id}`}
                role="tab"
                type="button"
                className={`home-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`home-panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="home-tab-panels">
            {/* Tab Panel 1: Business ROI */}
            <div
              id="home-panel-roi"
              role="tabpanel"
              aria-labelledby="home-tab-roi"
              tabIndex={0}
              className="home-tab-panel"
              hidden={activeTab !== 'roi'}
            >
              <div className="section-header">
                <h2 id="roi-heading" className="section-heading">
                  Why accessibility matters to your bottom line
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

            {/* Tab Panel 2: Pillars */}
            <div
              id="home-panel-pillars"
              role="tabpanel"
              aria-labelledby="home-tab-pillars"
              tabIndex={0}
              className="home-tab-panel"
              hidden={activeTab !== 'pillars'}
            >
              <div className="section-header">
                <h2 id="pillars-heading" className="section-heading">
                  Bridging the gap between audit and remediation
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

            {/* Tab Panel 3: Featured Case Studies Teaser */}
            <div
              id="home-panel-portfolio"
              role="tabpanel"
              aria-labelledby="home-tab-portfolio"
              tabIndex={0}
              className="home-tab-panel"
              hidden={activeTab !== 'portfolio'}
            >
              <div className="section-header">
                <h2 id="cases-teaser-heading" className="section-heading">
                  Case studies
                </h2>
                <p className="section-description">
                  Real-world examples of complex keyboard navigation, ARIA live region, and screen reader defect fixes.
                </p>
              </div>

              <div className="cases-grid-teaser">
                {caseStudies.slice(0, 3).map((study) => (
                  <article key={study.id} className="case-teaser-card">
                    <div className="case-badge-bar">
                      <span className={`severity-tag severity-${study.severity.toLowerCase().split(' ')[0]}`}>
                        {study.severity}
                      </span>
                      <span className="platform-tag">{study.platform}</span>
                    </div>
                    <h3>{study.title}</h3>
                    <p className="wcag-spec">
                      <strong>Standard:</strong> {study.wcag}
                    </p>
                    <p>{study.problem}</p>
                    {study.businessImpact && (
                      <div className="case-teaser-result">
                        <strong>Business Outcome:</strong> {study.businessImpact}
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <div className="center-cta">
                <Link to="/examples" className="btn btn-secondary">
                  View full portfolio &amp; engineering details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Secondary Lead Magnet Section ──────────────────────── */}
      <LeadMagnetSection />

      {/* ─── Bottom CTA Banner ────────────────────────────────────── */}
      <section className="section section-cta-banner">
        <div className="container cta-banner-inner">
          <h2 id="cta-banner-heading">Ready to make your product accessible to everyone?</h2>
          <p>
            Get a comprehensive review of your web or mobile product with a free, no-obligation mini-audit delivered in 48 hours.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Request a free mini-audit
          </Link>
        </div>
      </section>
    </div>
  );
}
