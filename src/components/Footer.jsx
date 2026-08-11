import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/services', label: 'Services & Packages' },
  { to: '/about',    label: 'About' },
  { to: '/examples', label: 'Examples' },
  { to: '/contact',  label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <p className="footer-brand">
              RScott <span className="brand-accent">Sites</span>
            </p>
            <p className="footer-tagline">
              End-to-End Digital Accessibility Engineering
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul role="list">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            <small>
              &copy; {new Date().getFullYear()} Ryan Scott. All rights reserved. | WCAG 2.2 AA Verified
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
}
