import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { coreServices, sampleAuditDeliverable } from '../data/businessData';
import PackagesTable from '../components/PackagesTable';
import LeadMagnetSection from '../components/LeadMagnetSection';

const SERVICES_TABS = [
  {
    id: 'services',
    label: 'Core engineering services',
  },
  {
    id: 'packages',
    label: 'Service packages & pricing',
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('services');
  const tabRefs = useRef([]);

  const handleTabKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % SERVICES_TABS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + SERVICES_TABS.length) % SERVICES_TABS.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = SERVICES_TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(SERVICES_TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="page-services">
      {/* ─── Header Section ──────────────────────────────────────── */}
      <section className="section page-header-section">
        <div className="container">
          <h1 id="services-page-title" className="page-title">
            Core services &amp; service packages
          </h1>
          <p className="page-lead">
            Comprehensive digital accessibility engineering tailored for web, iOS, and Android applications.
            From initial WCAG compliance audits to direct codebase remediation and continuous QA retainers.
          </p>
        </div>
      </section>

      {/* ─── Tabbed Services Section ────────────────────────────── */}
      <section className="section section-services-tabs" aria-label="Services and packages navigation">
        <div className="container">
          <div
            className="home-tablist"
            role="tablist"
            aria-label="Services and packages sections"
          >
            {SERVICES_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[idx] = el)}
                id={`services-tab-${tab.id}`}
                role="tab"
                type="button"
                className={`home-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`services-panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="home-tab-panels">
            {/* Tab Panel 1: Core Engineering Services */}
            <div
              id="services-panel-services"
              role="tabpanel"
              aria-labelledby="services-tab-services"
              tabIndex={0}
              className="home-tab-panel"
              hidden={activeTab !== 'services'}
            >
              <div className="section-header">
                <h2 id="core-services-heading" className="section-heading">
                  Core engineering services
                </h2>
                <p className="section-description">
                  Tailored solutions covering audits, hands-on engineering remediation, and sprint QA testing across all major platforms.
                </p>
              </div>

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
                      <h4>Key capabilities &amp; deliverables:</h4>
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

              {/* Sample Deliverable Section within Core Services */}
              <div className="section-deliverable-inline">
                <div className="section-header">
                  <h3 id="deliverable-heading" className="section-heading-sm">
                    {sampleAuditDeliverable.title}
                  </h3>
                  <p className="section-description">
                    {sampleAuditDeliverable.subtitle}
                  </p>
                </div>

                <div className="deliverable-card">
                  <div className="deliverable-grid">
                    {sampleAuditDeliverable.components.map((comp, idx) => (
                      <div key={idx} className="deliverable-item">
                        <span className="deliverable-num" aria-hidden="true">0{idx + 1}</span>
                        <h4>{comp.title}</h4>
                        <p>{comp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Panel 2: Service Packages and Pricing */}
            <div
              id="services-panel-packages"
              role="tabpanel"
              aria-labelledby="services-tab-packages"
              tabIndex={0}
              className="home-tab-panel"
              hidden={activeTab !== 'packages'}
            >
              <div className="section-header">
                <h2 id="packages-heading" className="section-heading">
                  Service packages &amp; pricing
                </h2>
                <p className="section-description">
                  Choose the engagement model that best matches your organization&apos;s current compliance state and development goals.
                </p>
              </div>

              <PackagesTable />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Secondary Lead Magnet Section ──────────────────────── */}
      <LeadMagnetSection />

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section className="section section-cta-banner">
        <div className="container cta-banner-inner">
          <h2>Need a custom engineering engagement?</h2>
          <p>
            Whether you need a full overhaul, a monthly retainer, or immediate fixes for critical violations, let&apos;s start with a free mini-audit of your site—delivered in 48 hours.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Request a free mini-audit
          </Link>
        </div>
      </section>
    </div>
  );
}
