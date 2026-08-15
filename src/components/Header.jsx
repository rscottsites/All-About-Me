import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services & Packages' },
  { to: '/about', label: 'About' },
  { to: '/examples', label: 'Examples' },
  { to: '/contact', label: 'Request Mini-Audit', cta: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  // Close on Escape and return focus to toggle button
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
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
        <Link to="/" className="brand" aria-label="RScott Sites — go to homepage" onClick={closeMenu}>
          <span className="brand-name">
            RScott <span className="brand-accent">Sites</span>
          </span>
          <span className="brand-subtitle">Accessibility Engineering</span>
        </Link>

        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-controls="primary-nav"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMenu}
        >
          <span className="hamburger" aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav${isOpen ? ' is-open' : ''}`}
        >
          <ul role="list">
            {NAV_LINKS.map(({ to, label, cta }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${cta ? 'nav-cta' : 'nav-link'}${isActive ? ' active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isOpen && (
        <div
          className="nav-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {isHomePage && (
        <aside className="top-lead-banner" aria-label="Free PDF Guide">
          <div className="container top-lead-banner-inner">
            <div className="top-lead-banner-content">
              <span className="top-lead-banner-badge" aria-hidden="true">
                📘 Free PDF Guide
              </span>
              <span className="top-lead-banner-text">
                The 5 Most Common Web Accessibility Challenges (And Their Solutions)
              </span>
            </div>
            <a href="#lead-magnet" className="top-lead-banner-cta">
              <span>Download Free PDF</span>
              <span className="top-lead-banner-arrow" aria-hidden="true">&darr;</span>
            </a>
          </div>
        </aside>
      )}
    </header>
  );
}
