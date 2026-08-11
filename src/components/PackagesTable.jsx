import { useNavigate } from 'react-router-dom';
import { servicePackages } from '../data/businessData';

export default function PackagesTable() {
  const navigate = useNavigate();

  const handleSelectPackage = (packageId) => {
    navigate(`/contact?package=${packageId}`);
  };

  return (
    <div className="packages-container">
      <div className="packages-grid">
        {servicePackages.map((pkg) => (
          <article
            key={pkg.id}
            className={`package-card ${pkg.popular ? 'is-popular' : ''}`}
            aria-labelledby={`pkg-title-${pkg.id}`}
          >
            {pkg.popular && <span className="popular-badge">Recommended</span>}
            <div className="package-header">
              <h3 id={`pkg-title-${pkg.id}`}>{pkg.name}</h3>
              <div className="package-price">
                <span className="price-val">{pkg.investment}</span>
                <span className="price-timeline">Timeline: {pkg.timeline}</span>
              </div>
            </div>

            <p className="package-scope">
              <strong>Scope of Work:</strong> {pkg.scope}
            </p>

            <ul className="package-features" role="list">
              {pkg.features.map((feat, idx) => (
                <li key={idx}>
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="package-footer">
              <button
                type="button"
                className={`btn ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleSelectPackage(pkg.id)}
              >
                Select {pkg.name.split(':')[0]}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
