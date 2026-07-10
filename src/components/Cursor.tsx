import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Rect = { x: number; y: number; width: number; height: number } | null;
type Corner = "tl" | "tr" | "bl" | "br";

const GAP = 6;
const SIZE = 16;

function cornerPosition(rect: Rect, corner: Corner) {
  if (!rect) return { x: -100, y: -100, opacity: 0 };
  const left = rect.x - GAP;
  const top = rect.y - GAP;
  const right = rect.x + rect.width + GAP;
  const bottom = rect.y + rect.height + GAP;
  const positions: Record<Corner, { x: number; y: number }> = {
    tl: { x: left, y: top },
    tr: { x: right - SIZE, y: top },
    bl: { x: left, y: bottom - SIZE },
    br: { x: right - SIZE, y: bottom - SIZE },
  };
  return { ...positions[corner], opacity: 1 };
}

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });
  const [rect, setRect] = useState<Rect>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const el = e.target;
      const target =
        el instanceof HTMLElement
          ? el.closest<HTMLElement>("a, button, [data-cursor-hover]")
          : null;

      if (target) {
        const r = target.getBoundingClientRect();
        setRect({ x: r.left, y: r.top, width: r.width, height: r.height });
      } else {
        setRect(null);
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  const hovering = !!rect;

  return (
    <>
      <motion.div
        className="cursor-core"
        style={{ x, y, rotate: 45 }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-ring-wrap"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 0.3 : 1, opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="cursor-ring" />
      </motion.div>
      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <motion.span
          key={corner}
          className={`cursor-bracket ${corner}`}
          animate={cornerPosition(rect, corner)}
          transition={{ type: "spring", damping: 24, stiffness: 260 }}
        />
      ))}
    </>
  );
}
