import { profile } from "../data/content";
import Reveal from "./Reveal";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal>
          <div className="about-photo corner-brackets corner-brackets--static">
            Photo
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="about-title">나는 파라파라나 추고 있어야겠다..</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-text">{profile.about}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
