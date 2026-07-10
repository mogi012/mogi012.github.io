import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(dotY, { damping: 25, stiffness: 300, mass: 0.5 });
  const scaleMotion = useSpring(1, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      !!el.closest("a, button, [data-cursor-hover]");

    const over = (e: PointerEvent) => {
      scaleMotion.set(isInteractive(e.target) ? 1.8 : 1);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [dotX, dotY, scaleMotion]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, scale: scaleMotion }}
      />
    </>
  );
}
