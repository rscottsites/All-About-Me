import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Home — End-to-End Digital Accessibility Engineering',
  '/services': 'Services & Packages — Digital Accessibility Engineering',
  '/about': 'About Ryan Scott — End-to-End Accessibility Engineer',
  '/examples': 'Portfolio & Case Studies — Accessibility Engineering',
  '/contact': 'Request a Free Mini-Audit — RScott Sites',
};

export default function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // 1. Scroll to top on route change
    window.scrollTo(0, 0);

    // 2. Set document title
    const title = PAGE_TITLES[location.pathname] || 'RScott Sites — Digital Accessibility Engineering';
    document.title = title;

    // 3. Set announcement for screen readers
    setAnnouncement(`Navigated to ${title}`);

    // 4. Move focus to main heading or main container for keyboard users
    setTimeout(() => {
      const mainHeading = document.querySelector('h1');
      if (mainHeading) {
        mainHeading.setAttribute('tabIndex', '-1');
        mainHeading.focus({ preventScroll: true });
      } else {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.setAttribute('tabIndex', '-1');
          mainContent.focus({ preventScroll: true });
        }
      }
    }, 100);
  }, [location.pathname]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </div>
  );
}
