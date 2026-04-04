import { useState, useEffect, useCallback, useRef } from 'react';

const NAV_LINKS = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact', cta: true },
];

export default function Header({ activeSection }) {
  const [isOpen, setIsOpen]   = useState(false);
  const headerRef             = useRef(null);
  const toggleRef             = useRef(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Close on Escape and return focus to toggle button
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeMenu]);

  // Close when focus moves outside the header (keyboard users)
  const onFocusIn = useCallback(
    (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeMenu();
      }
    },
    [closeMenu]
  );

  useEffect(() => {
    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, [onFocusIn]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand" aria-label="RScott Sites — go to homepage">
          <span className="brand-name">
            RScott <span className="brand-accent">Sites</span>
          </span>
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-controls="primary-nav"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="hamburger" aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav${isOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <ul role="list">
            {NAV_LINKS.map(({ href, label, cta }) => (
              <li key={href}>
                <a
                  href={href}
                  className={cta ? 'nav-cta' : undefined}
                  aria-current={activeSection === href.slice(1) ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
