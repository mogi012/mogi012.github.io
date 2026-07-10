import { skills } from "../data/content";
import Reveal from "./Reveal";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
            사용하는 기술들
          </h2>
        </Reveal>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div className="skill-card">
                <h3>{group.category}</h3>
                <div className="skill-items">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
