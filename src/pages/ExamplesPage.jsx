import { useState } from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/businessData';

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredStudies =
    activeTab === 'all'
      ? caseStudies
      : caseStudies.filter((cs) => {
          const plat = cs.platform.toLowerCase();
          const cat = (cs.category || '').toLowerCase();
          if (activeTab === 'web') {
            return plat.includes('web') || cat === 'web';
          }
          if (activeTab === 'mobile') {
            return (
              plat.includes('mobile') ||
              plat.includes('ios') ||
              plat.includes('android') ||
              cat === 'mobile'
            );
          }
          return true;
        });

  return (
    <div className="page-examples">
      {/* ─── Header Section ──────────────────────────────────────── */}
      <section className="section page-header-section" aria-labelledby="examples-page-title">
        <div className="container">
          <h1 id="examples-page-title" className="page-title">
            Accessibility Engineering Portfolio
          </h1>
          <p className="page-lead">
            Real-world case studies demonstrating hands-on accessibility remediation, keyboard focus management,
            ARIA live region engineering, and native mobile assistive tech routing.
          </p>
        </div>
      </section>

      {/* ─── Case Studies Gallery ─────────────────────────────────── */}
      <section className="section section-cases-full" aria-labelledby="cases-heading">
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Filter case studies by platform">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Case Studies
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'web'}
              className={`filter-btn ${activeTab === 'web' ? 'active' : ''}`}
              onClick={() => setActiveTab('web')}
            >
              Web &amp; ARIA
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'mobile'}
              className={`filter-btn ${activeTab === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveTab('mobile')}
            >
              Native Mobile (iOS/Android)
            </button>
          </div>

          <div className="cases-detail-list">
            {filteredStudies.map((study) => (
              <article key={study.id} className="case-card-full" aria-labelledby={`study-title-${study.id}`}>
                <div className="case-card-header">
                  <div className="case-meta">
                    <span className={`severity-tag severity-${study.severity.toLowerCase()}`}>
                      {study.severity} Severity
                    </span>
                    <span className="platform-tag">{study.platform}</span>
                  </div>
                  <h2 id={`study-title-${study.id}`} className="case-title">
                    {study.title}
                  </h2>
                  <p className="case-wcag">
                    <strong>WCAG Criterion:</strong> {study.wcag}
                  </p>
                </div>

                <div className="case-card-body">
                  <div className="case-section">
                    <h3>The Problem</h3>
                    <p>{study.problem}</p>
                  </div>

                  <div className="case-section">
                    <h3>The Remediation Solution</h3>
                    <p>{study.solution}</p>
                  </div>

                  {study.codeSnippet && (
                    <div className="case-section code-section">
                      <h3>Engineering Code Snippet</h3>
                      <pre className="code-block">
                        <code>{study.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section className="section section-cta-banner">
        <div className="container cta-banner-inner">
          <h2>Have Similar Accessibility Challenges in Your Codebase?</h2>
          <p>
            I can conduct a full audit and provide direct engineering fixes for your team.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Request a Free Mini-Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
