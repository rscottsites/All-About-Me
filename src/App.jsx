import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import RouteAnnouncer from './components/RouteAnnouncer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ExamplesPage from './pages/ExamplesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AccessibilityStatementPage from './pages/AccessibilityStatementPage';
import { initCloudflareAnalytics } from './utils/analytics';

export default function App() {
  useEffect(() => {
    initCloudflareAnalytics();
  }, []);

  return (
    <Router>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <RouteAnnouncer />
      <Header />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/accessibility" element={<AccessibilityStatementPage />} />
          <Route path="/accessibility-statement" element={<AccessibilityStatementPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics
        scriptSrc="/_va/script.js"
        endpoint="/_va/insights"
        debug={import.meta.env.DEV}
      />
      <SpeedInsights debug={import.meta.env.DEV} />
    </Router>
  );
}
