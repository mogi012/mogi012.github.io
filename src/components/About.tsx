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
            <h2 className="about-title">더 나은 경험을 만드는 데 집중합니다.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-text">{profile.about}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
