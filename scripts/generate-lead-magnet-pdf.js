import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

async function generatePdf() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The 5 Most Common Web Accessibility Challenges (And Their Solutions)</title>
  <style>
    @page {
      size: letter;
      margin: 1in 0.85in;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1E140A;
      line-height: 1.55;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #1E140A;
      margin: 0 0 10px 0;
      line-height: 1.25;
    }
    .author {
      font-size: 11pt;
      font-weight: bold;
      color: #1E140A;
      margin: 0 0 18px 0;
    }
    .intro {
      font-size: 11pt;
      color: #2A2016;
      margin-bottom: 24px;
      line-height: 1.55;
    }
    .challenge-section {
      margin-bottom: 20px;
    }
    .challenge-title {
      font-size: 12.5pt;
      font-weight: 700;
      color: #1E140A;
      margin: 0 0 8px 0;
    }
    ul {
      margin: 0;
      padding-left: 22px;
    }
    li {
      margin-bottom: 8px;
      line-height: 1.5;
    }
    li strong {
      color: #1E140A;
    }
    .footer-divider {
      margin-top: 36px;
      border: none;
      border-top: 1px solid #C8B89A;
      margin-bottom: 20px;
    }
    .services-heading {
      font-size: 13pt;
      font-weight: 700;
      color: #1E140A;
      margin: 0 0 10px 0;
    }
    .services-p {
      margin: 0 0 12px 0;
      font-size: 10.5pt;
    }
    .contact-list {
      list-style: disc;
      padding-left: 22px;
      font-size: 10.5pt;
    }
    .contact-list li {
      margin-bottom: 4px;
    }
    a {
      color: #7A5C1E;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>The 5 Most Common Web Accessibility Challenges (And Their Solutions)</h1>
  <p class="author">By Ryan Scott — Senior Accessibility Engineer (RScott Sites)</p>

  <p class="intro">
    Ensuring web application accessibility means providing an equitable experience for all users, regardless of whether they navigate via mouse, keyboard, or assistive technologies like screen readers. During development, certain common implementation gaps can create significant barriers. The following sections outline five frequent accessibility challenges and the professional standards for resolving them.
  </p>

  <div class="challenge-section">
    <h2 class="challenge-title">1. Modal Dialogs and Focus Management</h2>
    <ul>
      <li>
        <strong>The Challenge:</strong> When a modal dialog or pop-up appears, keyboard users may find that their focus remains on the underlying page content. This allows the cursor to "escape" the modal, leading to interactions with hidden elements and a confusing user experience.
      </li>
      <li>
        <strong>Best Practices:</strong> Developers should implement a "focus trap" within the modal. This ensures that keyboard navigation remains contained within the dialog until it is dismissed. Upon closing, focus must be programmatically returned to the original trigger element to maintain the user's context.
      </li>
    </ul>
  </div>

  <div class="challenge-section">
    <h2 class="challenge-title">2. Semantic HTML and Button Components</h2>
    <ul>
      <li>
        <strong>The Challenge:</strong> It is common for developers to style generic elements, such as generic text containers, to visually resemble buttons. However, these elements lack the native functionality required for keyboard interaction, failing to respond to standard 'Enter' or 'Space' key presses.
      </li>
      <li>
        <strong>Best Practices:</strong> Use native HTML button elements whenever possible. These elements provide built-in accessibility features, including proper role identification and keyboard event handling, which are automatically recognized by assistive technologies.
      </li>
    </ul>
  </div>

  <div class="challenge-section">
    <h2 class="challenge-title">3. Dynamic Content and ARIA Live Regions</h2>
    <ul>
      <li>
        <strong>The Challenge:</strong> Modern web applications often update content dynamically—such as displaying a "Success" notification—without a full page reload. While these updates are visible to sighted users, screen readers may not detect the change unless specifically instructed to do so.
      </li>
      <li>
        <strong>Best Practices:</strong> Utilize ARIA Live Regions to announce updates to screen reader users. By marking a container as a live region, the browser will automatically notify the assistive technology when the content inside changes, ensuring all users are informed of system status updates.
      </li>
    </ul>
  </div>

  <div class="challenge-section" style="page-break-before: auto;">
    <h2 class="challenge-title">4. Accessible Naming for Icon-Only Buttons</h2>
    <ul>
      <li>
        <strong>The Challenge:</strong> Buttons that rely solely on icons, such as a trash can for deletion, provide visual context but often lack a programmatic label. Without a text alternative, a screen reader may only announce the element as a "button," leaving the user without an understanding of its purpose.
      </li>
      <li>
        <strong>Best Practices:</strong> Provide descriptive labels using attributes like aria-label (e.g., "Delete item"). This ensures that the function of the button is clearly communicated to screen reader users, providing the necessary clarity for confident navigation.
      </li>
    </ul>
  </div>

  <div class="challenge-section">
    <h2 class="challenge-title">5. Input Validation and Error Identification</h2>
    <ul>
      <li>
        <strong>The Challenge:</strong> When form validation fails, error messages are often displayed visually near the relevant input field. If these errors are not programmatically linked to the input, a screen reader user may be unaware that an error has occurred or which specific field requires correction.
      </li>
      <li>
        <strong>Best Practices:</strong> Use ARIA attributes like aria-describedby to create a digital association between the input field and its corresponding error message. This ensures that the error is announced as soon as the user focuses on the field, allowing for efficient troubleshooting and form submission.
      </li>
    </ul>
  </div>

  <hr class="footer-divider" />

  <div class="services-block">
    <h3 class="services-heading">Professional Accessibility Services</h3>
    <p class="services-p">
      If your team needs a hands-on audit, developer training, or help fixing code, get in touch with <strong>Ryan Scott (RScott Sites)</strong>!
    </p>
    <ul class="contact-list">
      <li><strong>Website:</strong> <a href="https://rscottsites.com">https://rscottsites.com</a></li>
      <li><strong>Contact:</strong> <a href="mailto:ryanscott@rscottsites.com">ryanscott@rscottsites.com</a></li>
    </ul>
  </div>
</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  const outputPath = path.resolve(publicDir, 'The-5-Most-Common-Web-Accessibility-Challenges-And-Their-Solutions.pdf');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.8in',
      right: '0.8in',
      bottom: '0.8in',
      left: '0.8in',
    },
  });
  await browser.close();
  console.log('PDF generated at:', outputPath);
}

generatePdf();
