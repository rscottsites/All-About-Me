import { Link } from 'react-router-dom';
import { aboutContent } from '../data/businessData';

export default function AboutPage() {
  return (
    <div className="page-about">
      {/* ─── Header Section ──────────────────────────────────────── */}
      <section className="section page-header-section" aria-labelledby="about-page-title">
        <div className="container">
          <h1 id="about-page-title" className="page-title">
            About Ryan Scott
          </h1>
          <p className="page-lead">
            End-to-End Digital Accessibility Engineer bridging the gap between compliance reports and hands-on codebase remediation.
          </p>
        </div>
      </section>

      {/* ─── Main Bio Section ────────────────────────────────────── */}
      <section className="section section-about-body" aria-labelledby="about-headline">
        <div className="container about-grid">
          <div className="about-content">
            <h2 id="about-headline" className="about-subheadline">
              {aboutContent.headline}
            </h2>

            <div className="bio-paragraphs">
              {aboutContent.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="about-cta-row">
              <Link to="/contact" className="btn btn-primary">
                {aboutContent.ctaLabel}
              </Link>
            </div>
          </div>

          <aside className="about-sidebar">
            <div className="sidebar-card">
              <h3>Enterprise &amp; Community Experience</h3>
              <ul className="exp-list" role="list">
                <li>
                  <strong>Enterprise Experience</strong> — Digital Accessibility Engineering at Scale
                </li>
                <li>
                  <strong>Year Up Program</strong> — Foundation in Software Engineering &amp; Barrier Elimination
                </li>
                <li>
                  <strong>WCAG 2.1 / 2.2 AA</strong> — Full-Stack Audit &amp; Remediation Expert
                </li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Assistive Tech Stack</h3>
              <div className="at-pill-grid">
                <span className="at-pill">Desktop: NVDA</span>
                <span className="at-pill">Mobile: VoiceOver (iOS)</span>
                <span className="at-pill">Mobile: TalkBack (Android)</span>
                <span className="at-pill">Semantic HTML5</span>
                <span className="at-pill">ARIA 1.2 Patterns</span>
                <span className="at-pill">Keyboard Focus Traps</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Core Competencies Grid ──────────────────────────────── */}
      <section className="section section-skills" aria-labelledby="skills-heading">
        <div className="container">
          <h2 id="skills-heading" className="section-heading">
            Engineering &amp; Accessibility Competencies
          </h2>
          <div className="skills-grid">
            {aboutContent.skills.map((skillGroup, idx) => (
              <div key={idx} className="skill-card">
                <h3>{skillGroup.title}</h3>
                <ul role="list">
                  {skillGroup.items.map((item, iIdx) => (
                    <li key={iIdx}>
                      <span className="skill-check" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
