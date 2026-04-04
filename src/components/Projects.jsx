import { projects } from '../data/projects';

function ProjectCard({ title, badge, summary, technologies, role, purpose, githubUrl }) {
  const isPlaceholder = !githubUrl;

  return (
    <li className={`project-card${isPlaceholder ? ' project-card--placeholder' : ''}`}>
      <div className="project-header">
        <h3 className="project-title">{title}</h3>
        <span
          className="project-badge"
          aria-label={isPlaceholder ? undefined : `Primary language: ${badge}`}
        >
          {badge}
        </span>
      </div>

      <p className="project-summary">{summary}</p>

      <dl className="project-meta">
        <div>
          <dt>Technologies</dt>
          <dd>{technologies}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{role}</dd>
        </div>
        <div>
          <dt>Purpose</dt>
          <dd>{purpose}</dd>
        </div>
      </dl>

      {githubUrl ? (
        <a
          href={githubUrl}
          className="project-link"
          rel="noopener noreferrer"
          target="_blank"
          aria-label={`View ${title} on GitHub (opens in new tab)`}
        >
          View on GitHub <span aria-hidden="true">&rarr;</span>
        </a>
      ) : (
        <span className="project-link project-link--disabled" aria-label="Project coming soon">
          Coming Soon
        </span>
      )}
    </li>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section section-projects" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="projects-heading">Projects</h2>
          <p className="section-sub">
            A selection of work from Ryan&rsquo;s GitHub. View the full profile at{' '}
            <a
              href="https://github.com/wscott0511"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Ryan Scott's GitHub profile (opens in new tab)"
            >
              github.com/wscott0511
            </a>.
          </p>
        </div>

        <ul className="projects-grid" role="list">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </ul>
      </div>
    </section>
  );
}
