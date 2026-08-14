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
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}
