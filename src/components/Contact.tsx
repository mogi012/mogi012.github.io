import { FiArrowUpRight } from "react-icons/fi";
import { profile, socials } from "../data/content";
import Reveal from "./Reveal";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="contact-title">
            연락 <span className="accent">오이데~</span>
          </h2>
          <p className="contact-sub">
            협업 제안이나 궁금한 점이 있다면 언제든 편하게 연락 주세요.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a className="contact-cta" href={`mailto:${profile.email}`}>
            {profile.email}
            <FiArrowUpRight />
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="contact-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
