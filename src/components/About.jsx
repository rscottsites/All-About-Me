const EXPERTISE = [
  'WCAG 2.2 AA compliance & auditing',
  'Semantic HTML & ARIA authoring patterns',
  'Responsive, mobile-first CSS',
  'Keyboard navigation & focus management',
  'Screen reader testing (NVDA, VoiceOver, JAWS)',
  'Performance-focused front-end development',
  'iOS / Swift mobile development',
  'Python scripting & automation',
];

const STATS = [
  { label: 'Experience', value: '5+ Years' },
  { label: 'Focus',      value: 'Accessibility' },
  { label: 'Standard',   value: 'WCAG 2.2 AA' },
];

export default function About() {
  return (
    <section id="about" className="section section-about" aria-labelledby="about-heading">
      <div className="container about-inner">

        <div className="about-content">
          <h2 id="about-heading">About Ryan Scott</h2>
          <p className="lead">
            Ryan Scott is a Web Developer with 5+ years of experience building accessible
            websites and applications.
          </p>
          <p>
            He has a proven ability to design, develop, and test web content that meets
            Web Content Accessibility Guidelines (WCAG) 2.2 AA standards, and deep
            expertise using accessibility auditing tools and techniques to identify and
            fix accessibility issues across a wide range of platforms.
          </p>
          <p>
            Ryan is passionate about making the web more accessible for everyone — not
            because it is a compliance checkbox, but because inclusive design produces
            better experiences for all users. He brings that conviction to every project
            he touches.
          </p>

          <h3 className="about-subheading">Areas of Expertise</h3>
          <ul className="expertise-list" role="list">
            {EXPERTISE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="about-sidebar" aria-label="Quick facts about Ryan Scott">
          <div className="about-card">
            <dl className="about-stats">
              {STATS.map(({ label, value }) => (
                <div key={label} className="stat-item">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about-card about-cta-card">
            <p>Ready to build something great together?</p>
            <a href="#contact" className="btn btn-primary">Let&rsquo;s Talk</a>
          </div>
        </aside>

      </div>
    </section>
  );
}
