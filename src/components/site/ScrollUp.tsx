import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollUp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      // A solid paper tile rather than an outline in `foreground`: this floats
      // over the near-black bands as well as the pale ones, and a near-black
      // hairline on a near-black ground is not there at all.
      //
      // Same 14 and same right-6 as the chat launcher, so the two stack as one
      // column in the corner; bottom-24 leaves a gap between them.
      className={`fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center border border-border bg-background text-foreground shadow-lg transition-all duration-500 hover:bg-primary hover:text-primary-foreground ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={18} strokeWidth={1.5} />
    </button>
  );
}
