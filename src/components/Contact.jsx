import { useState, useRef } from 'react';

const EMPTY_FIELDS  = { name: '', email: '', message: '' };
const EMPTY_ERRORS  = { name: '', email: '', message: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CONTACT_DETAILS = [
  {
    id:    'email',
    icon:  '✉',
    label: 'Email',
    display: 'rscottsites@outlook.com',
    href:  'mailto:rscottsites@outlook.com',
  },
  {
    id:    'phone',
    icon:  '📞',
    label: 'Phone',
    display: '(925) 337-5474',
    href:  'tel:+19253375474',
  },
  {
    id:      'linkedin',
    icon:    '👥',
    label:   'LinkedIn',
    display: 'linkedin.com/in/william-ryan-scott',
    href:    'https://www.linkedin.com/in/william-ryan-scott/',
    external: true,
    ariaLabel: 'Ryan Scott on LinkedIn (opens in new tab)',
  },
  {
    id:      'github',
    icon:    '💻',
    label:   'GitHub',
    display: 'github.com/wscott0511',
    href:    'https://github.com/wscott0511',
    external: true,
    ariaLabel: 'Ryan Scott on GitHub (opens in new tab)',
  },
];

export default function Contact() {
  const [fields,     setFields]     = useState(EMPTY_FIELDS);
  const [errors,     setErrors]     = useState(EMPTY_ERRORS);
  const [status,     setStatus]     = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  const nameRef    = useRef(null);
  const emailRef   = useRef(null);
  const messageRef = useRef(null);
  const statusRef  = useRef(null);
  const fieldRefs  = { name: nameRef, email: emailRef, message: messageRef };

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const next = { ...EMPTY_ERRORS };
    let valid = true;

    const name = fields.name.trim();
    if (!name) {
      next.name = 'Please enter your full name.';
      valid = false;
    } else if (name.length > 100) {
      next.name = 'Name must be 100 characters or fewer.';
      valid = false;
    }

    const email = fields.email.trim();
    if (!email) {
      next.email = 'Please enter your email address.';
      valid = false;
    } else if (!EMAIL_RE.test(email)) {
      next.email = 'Please enter a valid email address.';
      valid = false;
    }

    const message = fields.message.trim();
    if (!message) {
      next.message = 'Please enter a message.';
      valid = false;
    } else if (message.length > 2000) {
      next.message = 'Message must be 2000 characters or fewer.';
      valid = false;
    }

    setErrors(next);
    return { valid, next };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ text: '', type: '' });

    const { valid, next } = validate();
    if (!valid) {
      // Focus the first field with an error
      const firstKey = Object.keys(next).find((k) => next[k]);
      fieldRefs[firstKey]?.current?.focus();
      return;
    }

    setSubmitting(true);

    /*
     * PRODUCTION NOTE:
     * Replace the timeout below with a real fetch() POST to your form endpoint
     * (e.g. Netlify Forms, Formspree, or a custom server-side handler).
     * The endpoint must validate and sanitize all input server-side,
     * implement CSRF protection, and rate-limit submissions.
     *
     *   const data = new FormData(e.target);
     *   await fetch('/api/contact', { method: 'POST', body: data });
     */
    await new Promise((resolve) => setTimeout(resolve, 800));

    setFields(EMPTY_FIELDS);
    setErrors(EMPTY_ERRORS);
    setStatus({
      text: 'Thank you! Your message has been sent. Ryan will be in touch soon.',
      type: 'success',
    });
    setSubmitting(false);
    statusRef.current?.focus();
  }

  return (
    <section id="contact" className="section section-contact" aria-labelledby="contact-heading">
      <div className="container contact-inner">

        <div className="contact-info">
          <h2 id="contact-heading">Get in Touch</h2>
          <p className="lead">
            Whether you need a new website, an accessibility audit, or targeted enhancements
            to an existing site, Ryan would love to hear from you.
          </p>

          <ul className="contact-details" role="list">
            {CONTACT_DETAILS.map(({ id, icon, label, display, href, external, ariaLabel }) => (
              <li key={id}>
                <span className="contact-label" aria-hidden="true">{icon}</span>
                <span className="sr-only">{label}:</span>
                <a
                  href={href}
                  {...(external
                    ? { rel: 'noopener noreferrer', target: '_blank', 'aria-label': ariaLabel }
                    : {})}
                >
                  {display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-form-wrapper">
          <form
            id="contact-form"
            className="contact-form"
            noValidate
            aria-label="Contact Ryan Scott"
            onSubmit={handleSubmit}
          >

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name
                <span className="required" aria-hidden="true"> *</span>
                <span className="sr-only"> (required)</span>
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                value={fields.name}
                onChange={handleChange}
                autoComplete="name"
                required
                aria-required="true"
                aria-describedby="name-error"
                aria-invalid={errors.name ? 'true' : 'false'}
                maxLength={100}
                placeholder="Your full name"
              />
              <span id="name-error" className="field-error" role="alert">
                {errors.name}
              </span>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
                <span className="required" aria-hidden="true"> *</span>
                <span className="sr-only"> (required)</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                autoComplete="email"
                required
                aria-required="true"
                aria-describedby="email-error"
                aria-invalid={errors.email ? 'true' : 'false'}
                maxLength={254}
                placeholder="you@example.com"
              />
              <span id="email-error" className="field-error" role="alert">
                {errors.email}
              </span>
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">
                Message
                <span className="required" aria-hidden="true"> *</span>
                <span className="sr-only"> (required)</span>
              </label>
              <textarea
                ref={messageRef}
                id="message"
                name="message"
                value={fields.message}
                onChange={handleChange}
                rows={6}
                required
                aria-required="true"
                aria-describedby="message-error"
                aria-invalid={errors.message ? 'true' : 'false'}
                maxLength={2000}
                placeholder="Tell Ryan about your project or question..."
              />
              <span id="message-error" className="field-error" role="alert">
                {errors.message}
              </span>
            </div>

            {/* Form-level status (success / error) */}
            <div
              ref={statusRef}
              role="status"
              aria-live="polite"
              tabIndex={-1}
              className={`form-status${status.type ? ` form-status--${status.type}` : ''}`}
            >
              {status.text}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={submitting}
            >
              {submitting ? (
                'Sending\u2026'
              ) : (
                <>Send Message <span aria-hidden="true">&#8594;</span></>
              )}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
