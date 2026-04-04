import { services } from '../data/services';

export default function Services() {
  return (
    <section className="section section-services" aria-labelledby="services-heading">
      <div className="container">
        <h2 id="services-heading" className="sr-only">Services</h2>
        <ul className="services-list" role="list">
          {services.map(({ id, icon, title, description }) => (
            <li key={id} className="service-item">
              <span className="service-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
