import { profile } from "../data/content";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </span>
      <a className="footer-top" href="#top">
        Back to top ↑
      </a>
    </footer>
  );
}
