const BADGES = [
  { icon: '☑',  label: 'WCAG 2.2 AA' },
  { icon: '📄', label: 'Semantic HTML' },
  { icon: '📱', label: 'Mobile-First' },
  { icon: '🔒', label: 'Secure Code' },
];

export default function Hero() {
  return (
    <section id="home" className="section section-hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">Web development &amp; accessibility</p>
          <h1 id="hero-heading">
            Building the web <span className="highlight">everyone</span> can use
          </h1>
          <p className="hero-sub">
            RScott Sites delivers accessible, high-quality websites and web applications
            — designed from the ground up to meet WCAG 2.2 AA standards and work for
            every visitor, on every device.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Get in touch</a>
            <a href="#projects" className="btn btn-secondary">View projects</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          {BADGES.map(({ icon, label }) => (
            <div key={label} className="hero-badge">
              <span className="badge-icon">{icon}</span>
              <span className="badge-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
