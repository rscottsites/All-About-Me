export default function Home() {
  return (
    <section id="home" className="home-section">
      <div className="container">
        <div className="hero">
          <h1 className="hero-heading">End-to-End Digital Accessibility Engineering</h1>
          <p className="hero-description">
            I help forward-thinking companies achieve WCAG compliance, mitigate legal risk, and build inclusive digital experiences.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Request a Free Mini-Audit</a>
          </div>
        </div>

        <div className="value-props">
          <h2 className="section-heading">Core Capabilities</h2>
          <div className="grid-3">
            <div className="card">
              <h3>🔍 Audit</h3>
              <p>Rigorous manual and automated testing to identify WCAG 2.1/2.2 AA violations.</p>
            </div>
            <div className="card">
              <h3>🛠️ Remediate</h3>
              <p>Hands-on engineering to fix ARIA, semantic HTML, keyboard nav, and focus management issues.</p>
            </div>
            <div className="card">
              <h3>🔄 Maintain</h3>
              <p>Ongoing regression testing and monthly QA to ensure your product stays compliant.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}