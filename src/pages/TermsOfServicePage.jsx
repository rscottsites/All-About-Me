import { Link } from 'react-router-dom';

export default function TermsOfServicePage() {
  return (
    <div className="page-terms">
      {/* ─── Header Section ──────────────────────────────────────── */}
      <section className="section page-header-section" aria-labelledby="terms-page-title">
        <div className="container">
          <span className="section-badge-pill" aria-hidden="true">Legal &amp; Transparency</span>
          <h1 id="terms-page-title" className="page-title">
            Terms of Service
          </h1>
          <p className="page-lead">
            <strong>Effective Date:</strong> August 14, 2026
          </p>
        </div>
      </section>

      {/* ─── Main Content Section ────────────────────────────────── */}
      <section className="section section-privacy-content" aria-labelledby="terms-content-heading">
        <div className="container container-prose">
          <div className="privacy-prose-card">
            <h2 id="terms-content-heading" className="sr-only">
              Terms of Service Details
            </h2>

            <div className="privacy-section">
              <h3>1. Agreement to Terms</h3>
              <p>
                Welcome to <strong>RScott Sites</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using <a href="https://rscottsites.com" target="_blank" rel="noopener noreferrer">rscottsites.com</a> (the &quot;Site&quot;) and our digital accessibility engineering services, code audits, or downloadable resources, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use this Site.
              </p>
            </div>

            <div className="privacy-section">
              <h3>2. Intellectual Property Rights</h3>
              <p>
                All content on this Site, including but not limited to text, case studies, engineering code snippets, designs, graphics, and downloadable materials (such as <em>The 5 Most Common Web Accessibility Challenges</em> PDF), is the intellectual property of RScott Sites.
              </p>
              <ul>
                <li>You may view, download, and print materials for personal, non-commercial use or internal business evaluation.</li>
                <li>You may not republish, sell, rent, reproduce, or distribute our specific content or proprietary code solutions without explicit written permission.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>3. Professional Disclaimer and Limitations</h3>
              <p>
                Our digital accessibility audits, engineering fixes, and code snippets are provided for informational and educational purposes, or as part of a specific consulting engagement.
              </p>
              <ul>
                <li>
                  <strong>No Legal Advice:</strong> While our services aim to align with WCAG standards (e.g., WCAG 2.1/2.2 AA), our audits and recommendations do not constitute formal legal advice regarding compliance with the Americans with Disabilities Act (ADA) or other accessibility laws.
                </li>
                <li>
                  <strong>Implementation Risk:</strong> Any code snippets or engineering solutions provided in our &quot;Examples&quot; portfolio or free resources are provided &quot;as is.&quot; We are not responsible for how these snippets interact with your specific codebase or any subsequent issues that arise from your own implementation.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>4. Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by applicable law, RScott Sites shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of the Site, reliance on our resources, or implementation of our accessibility recommendations outside of a formal, signed consulting contract.
              </p>
            </div>

            <div className="privacy-section">
              <h3>5. Third-Party Links</h3>
              <p>
                Our Site may contain links to third-party websites or services that are not owned or controlled by RScott Sites. We assume no responsibility for the content, privacy policies, or practices of any third-party websites.
              </p>
            </div>

            <div className="privacy-section">
              <h3>6. Governing Law</h3>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal actions or proceedings arising out of these Terms shall be brought exclusively in the state or federal courts located in California.
              </p>
            </div>

            <div className="privacy-section">
              <h3>7. Changes to Terms</h3>
              <p>
                We reserve the right to modify or replace these Terms at any time. Any changes will be posted on this page with an updated &quot;Effective Date.&quot; Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            <div className="privacy-section">
              <h3>8. Contact Information</h3>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="privacy-contact-box">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:ryanscott@rscottsites.com">ryanscott@rscottsites.com</a>
                </p>
                <p>
                  <strong>Address:</strong> 4101 Dublin Blvd Ste F - 1080 Dublin, CA 94568-4603 United States
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
