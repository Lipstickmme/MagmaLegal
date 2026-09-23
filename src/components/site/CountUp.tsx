import { useEffect, useRef, useState } from "react";

/**
 * A figure that counts up from zero the first time it scrolls into view.
 *
 * `value` is printed as given — "600+" counts to 600 and keeps its "+". The
 * server renders the finished figure, so a reader without JavaScript, a search
 * engine and the first paint all see the real number; the reset to zero only
 * happens once the element is on screen, inside a Reveal that is still at
 * opacity 0 at that moment, so nobody sees the number jump backwards.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState<number | null>(target);

  useEffect(() => {
    const element = ref.current;
    if (!element || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          // Ease out: quick off the mark, gentle into the final figure.
          const eased = 1 - Math.pow(1 - progress, 3);
          setShown(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      // Fires no later than the Reveal around it (0.15, same margin), so the
      // reset to zero lands while the figure is still transparent.
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  if (target === null) return <span>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}
