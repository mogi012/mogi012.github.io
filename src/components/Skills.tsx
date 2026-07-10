import { skills } from "../data/content";
import Reveal from "./Reveal";
import "./Skills.css";

const MAX_LEVEL = 5;

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
              <div className="skill-card corner-brackets corner-brackets--static">
                <h3>{group.category}</h3>
                <div className="skill-items">
                  {group.items.map((item) => (
                    <div className="skill-item" key={item.name}>
                      <span className="skill-name">{item.name}</span>
                      <span
                        className="skill-pips"
                        aria-label={`${item.name} Lv.${item.level}`}
                      >
                        {Array.from({ length: MAX_LEVEL }, (_, idx) => (
                          <i key={idx} className={idx < item.level ? "on" : ""} />
                        ))}
                      </span>
                    </div>
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
