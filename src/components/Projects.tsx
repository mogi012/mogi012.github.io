import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "../data/content";
import Reveal from "./Reveal";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Projects</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
            제가 만든 것들
          </h2>
        </Reveal>

        <div className="projects-list">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <div className="project-row">
                <span className="project-index">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="project-main">
                  <h3>{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub repo`}
                    >
                      <FiGithub />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live link`}
                    >
                      <FiArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
