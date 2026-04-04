const NAV_LINKS = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          RScott <span className="brand-accent">Sites</span>
        </p>

        <nav aria-label="Footer navigation">
          <ul role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="footer-copy">
          <small>
            &copy; {new Date().getFullYear()} Ryan Scott. All rights reserved.
          </small>
        </p>
      </div>
    </footer>
  );
}
