export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-heading">Accessibility Portfolio</h2>
        <p className="section-description">
          A selection of case studies demonstrating hands-on accessibility remediation and engineering solutions.
        </p>

        <div className="case-studies">
          <article className="case-study">
            <h3>Custom Accessible Modal & Focus Management</h3>
            <ul>
              <li><strong>WCAG Criterion:</strong> 2.1.2 No Keyboard Trap (A) & 2.4.3 Focus Order (A)</li>
              <li><strong>Severity:</strong> <span className="severity-critical">Critical</span></li>
            </ul>
            <p><strong>The Issue:</strong> A custom promotional modal on a checkout flow was trapping keyboard focus, preventing screen reader users and keyboard-only users from closing the dialog or accessing the rest of the page.</p>
          </article>

          <article className="case-study">
            <h3>Form Error Identification & Screen Reader Feedback</h3>
            <ul>
              <li><strong>WCAG Criterion:</strong> 3.3.1 Error Identification (A) & 1.4.1 Use of Color (A)</li>
              <li><strong>Severity:</strong> <span className="severity-high">High</span></li>
            </ul>
            <p><strong>The Issue:</strong> Form validation errors were indicated only by turning the input borders red. Screen readers did not announce the error text dynamically, leaving visually impaired users unaware of why their submission failed.</p>
          </article>

          <article className="case-study">
            <h3>Dynamic Content Updates with ARIA Live Regions</h3>
            <ul>
              <li><strong>WCAG Criterion:</strong> 4.1.3 Status Messages (AA)</li>
              <li><strong>Severity:</strong> <span className="severity-medium">Medium</span></li>
            </ul>
            <p><strong>The Issue:</strong> When users added an item to their shopping cart, a visual toast notification appeared, but it was completely silent for screen reader users relying on TalkBack and NVDA.</p>
          </article>
        </div>
      </div>
    </section>
  );
}