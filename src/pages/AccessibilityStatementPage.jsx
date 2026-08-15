import { Link } from 'react-router-dom';

export default function AccessibilityStatementPage() {
  return (
    <div className="page-accessibility-statement">
      {/* ─── Header Section ──────────────────────────────────────── */}
      <section className="section page-header-section" aria-labelledby="accessibility-page-title">
        <div className="container">
          <span className="section-badge-pill" aria-hidden="true">Digital Inclusion</span>
          <h1 id="accessibility-page-title" className="page-title">
            Accessibility Statement
          </h1>
          <p className="page-lead">
            <strong>Effective Date:</strong> August 14, 2026
          </p>
        </div>
      </section>

      {/* ─── Main Content Section ────────────────────────────────── */}
      <section className="section section-privacy-content" aria-labelledby="accessibility-content-heading">
        <div className="container container-prose">
          <div className="privacy-prose-card">
            <h2 id="accessibility-content-heading" className="sr-only">
              Accessibility Statement Details
            </h2>

            <div className="privacy-section">
              <h3>1. Our Commitment</h3>
              <p>
                At <strong>RScott Sites</strong>, digital accessibility is not just an afterthought—it is the core of our engineering practice. We are firmly committed to ensuring digital inclusion for all individuals, regardless of ability or technology. We believe the web should be an empowering, barrier-free space for everyone.
              </p>
            </div>

            <div className="privacy-section">
              <h3>2. Accessibility Standard</h3>
              <p>
                We actively work to ensure that this website (<a href="https://rscottsites.com" target="_blank" rel="noopener noreferrer">rscottsites.com</a>) conforms to the <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong>. These guidelines, established by the World Wide Web Consortium (W3C), explain how to make web content more accessible for people with sensory, cognitive, and mobility disabilities.
              </p>
            </div>

            <div className="privacy-section">
              <h3>3. Engineering Practices and Measures</h3>
              <p>
                To maintain our WCAG 2.2 AA verification and ensure a seamless user experience, we employ the following practices:
              </p>
              <ul>
                <li>
                  <strong>Semantic Structure:</strong> Use of proper HTML landmarks, heading structures, and ARIA attributes where necessary to support screen readers and assistive technologies.
                </li>
                <li>
                  <strong>Keyboard Navigation:</strong> Ensuring all interactive elements, forms, and menus are fully navigable using a keyboard without trapping focus.
                </li>
                <li>
                  <strong>Visual Design:</strong> Maintaining high color contrast ratios, providing visible focus indicators, and avoiding reliance on color alone to convey meaning.
                </li>
                <li>
                  <strong>Continuous Auditing:</strong> Regularly monitoring and testing our codebase with both automated tools and manual reviews to identify and remediate potential barriers.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>4. Known Limitations</h3>
              <p>
                While we strive for comprehensive accessibility across all pages and resources on rscottsites.com, the dynamic nature of web technologies means that occasional accessibility challenges may arise. If you encounter any barriers or have difficulty accessing specific content, including our downloadable PDF resources, please let us know so we can resolve the issue promptly.
              </p>
            </div>

            <div className="privacy-section">
              <h3>5. Feedback and Contact Information</h3>
              <p>
                We welcome your feedback on the accessibility of RScott Sites. If you encounter any accessibility barriers, require an alternative format for any of our content, or have suggestions for improvement, please reach out directly:
              </p>
              <div className="privacy-contact-box">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:ryanscott@rscottsites.com">ryanscott@rscottsites.com</a>
                </p>
                <p>
                  <strong>Address:</strong> 4101 Dublin Blvd Ste F - 1080 Dublin, CA 94568-4603 United States
                </p>
                <p>
                  <em>We aim to respond to all accessibility-related inquiries within 1-2 business days.</em>
                </p>
              </div>
            </div>

            <div className="privacy-back-cta">
              <Link to="/contact" className="btn btn-primary">
                Contact Ryan Scott &rarr;
              </Link>
              <Link to="/" className="btn btn-secondary">
                &larr; Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
