import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Loader.css";

const DURATION = 1400;

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        document.body.style.overflow = "";
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="loader-inner">
            <span className="loader-label">Loading System</span>
            <div className="loader-bar">
              <div className="loader-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="loader-pct">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
