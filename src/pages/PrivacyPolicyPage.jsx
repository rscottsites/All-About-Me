import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <div className="page-privacy">
      {/* ─── Header Section ──────────────────────────────────────── */}
      <section className="section page-header-section" aria-labelledby="privacy-page-title">
        <div className="container">
          <span className="section-badge-pill" aria-hidden="true">Legal &amp; Transparency</span>
          <h1 id="privacy-page-title" className="page-title">
            Privacy Policy
          </h1>
          <p className="page-lead">
            <strong>Effective Date:</strong> August 14, 2026
          </p>
        </div>
      </section>

      {/* ─── Main Content Section ────────────────────────────────── */}
      <section className="section section-privacy-content" aria-labelledby="privacy-content-heading">
        <div className="container container-prose">
          <div className="privacy-prose-card">
            <h2 id="privacy-content-heading" className="sr-only">
              Privacy Policy Details
            </h2>

            <p className="privacy-intro">
              Welcome to <strong>RScott Sites</strong>. This Privacy Policy explains how your personal information is collected, used, and protected when you visit <a href="https://rscottsites.com" target="_blank" rel="noopener noreferrer">rscottsites.com</a> and interact with the services provided.
            </p>

            <div className="privacy-section">
              <h3>1. Information Collected</h3>
              <ul>
                <li>
                  <strong>Information You Provide:</strong> When you opt to download the free PDF guide, <em>The 5 Most Common Web Accessibility Challenges</em>, or request a mini-audit, your First Name and Work Email are collected.
                </li>
                <li>
                  <strong>Usage Data:</strong> This site uses <strong>Vercel Web Analytics</strong> to understand website traffic and performance. Vercel is a privacy-first analytics platform that collects anonymized, aggregated metrics (such as page views). It does not use tracking cookies, nor does it collect Personally Identifiable Information (PII) or track visitors across different days or websites.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>2. How Your Information is Used &amp; Retained</h3>
              <p>The information collected is used strictly for the following purposes:</p>
              <ul>
                <li>To deliver the requested accessibility guide directly to your inbox.</li>
                <li>To send you occasional emails regarding digital accessibility engineering services, insights, and updates.</li>
                <li>To monitor and improve website performance using anonymized data.</li>
              </ul>
              <p>
                <strong>Data Retention:</strong> We retain your contact information only for as long as you remain subscribed to our communications. If you choose to unsubscribe, your personal data will be promptly removed from our active mailing lists.
              </p>
            </div>

            <div className="privacy-section">
              <h3>3. Cookies and Tracking Technologies</h3>
              <p>
                RScott Sites prioritizes your privacy. Both our website analytics and email delivery systems run entirely without the use of non-essential tracking cookies.
              </p>
            </div>

            <div className="privacy-section">
              <h3>4. Data Sharing and Disclosure</h3>
              <p>
                Your personal information is never sold or shared with external marketing platforms. When you request a resource, your name and email are processed securely via our own server infrastructure to deliver the content directly to your inbox. We do not use third-party marketing services to profile or track your interactions.
              </p>
            </div>

            <div className="privacy-section">
              <h3>5. Your Data Privacy Rights</h3>
              <p>
                Depending on your geographic location, you may have specific rights regarding your personal data under laws like the GDPR or CCPA. You always retain the right to:
              </p>
              <ul>
                <li>Access, update, or request deletion of the information held about you.</li>
                <li>Opt-out of communications at any time by replying directly to an email with your request or using an unsubscribe link if provided.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>6. Children’s Privacy</h3>
              <p>
                Our website and services are intended for professionals and businesses. We do not knowingly collect personal information from children under the age of 13 (or 16 in applicable jurisdictions). If we become aware that we have inadvertently collected such data, we will take steps to delete it immediately.
              </p>
            </div>

            <div className="privacy-section">
              <h3>7. Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. Any updates will be posted on this page, and the &quot;Effective Date&quot; at the top will be revised accordingly.
              </p>
            </div>

            <div className="privacy-section">
              <h3>8. Contact Information</h3>
              <p>
                If you have any questions about this Privacy Policy or how your data is handled, please reach out:
              </p>
              <div className="privacy-contact-box">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:ryanscott@rscottsites.com">ryanscott@rscottsites.com</a>
                </p>
                <p>
                  <strong>Location:</strong> 4101 Dublin Blvd Ste F - 1080 Dublin, CA 94568-4603 United States
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
