import { launchRoadmap } from '../data/businessData';

export default function RoadmapTimeline() {
  return (
    <div className="roadmap-container">
      <div className="roadmap-timeline" role="list">
        {launchRoadmap.map((item, index) => (
          <div key={index} className="roadmap-step" role="listitem">
            <div className="roadmap-marker">
              <span className="step-number">{index + 1}</span>
            </div>
            <div className="roadmap-content">
              <div className="step-header">
                <span className="step-week">{item.week}</span>
                <h3 className="step-title">{item.title}</h3>
              </div>
              <ul className="step-checklist" role="list">
                {item.items.map((task, tIdx) => (
                  <li key={tIdx}>
                    <span className="task-bullet" aria-hidden="true">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
