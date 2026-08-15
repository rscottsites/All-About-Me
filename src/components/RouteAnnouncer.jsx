import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Home — End-to-End Digital Accessibility Engineering',
  '/services': 'Services & Packages — Digital Accessibility Engineering',
  '/about': 'About Ryan Scott — End-to-End Accessibility Engineer',
  '/examples': 'Portfolio & Case Studies — Accessibility Engineering',
  '/contact': 'Request a Free Mini-Audit — RScott Sites',
  '/privacy': 'Privacy Policy — RScott Sites',
  '/privacy-policy': 'Privacy Policy — RScott Sites',
  '/terms': 'Terms of Service — RScott Sites',
  '/terms-of-service': 'Terms of Service — RScott Sites',
  '/accessibility': 'Accessibility Statement — RScott Sites',
  '/accessibility-statement': 'Accessibility Statement — RScott Sites',
};

export default function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // 1. Scroll window to top of the page
    window.scrollTo(0, 0);

    // 2. Set document title
    const title = PAGE_TITLES[location.pathname] || 'RScott Sites — Digital Accessibility Engineering';
    document.title = title;

    // 3. Set live announcement for screen readers
    setAnnouncement(`Navigated to ${title}`);

    // 4. Reset focus to the top of the document (removes focus from clicked nav link/title)
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  }, [location.pathname]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </div>
  );
}
