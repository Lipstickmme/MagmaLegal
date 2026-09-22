import lockupDark from "@/assets/brand/lockup-dark.webp";
import lockupLight from "@/assets/brand/lockup-light.webp";
import markDark from "@/assets/brand/mark-dark.webp";
import markLight from "@/assets/brand/mark-light.webp";

import { SITE } from "@/lib/site";

/**
 * The firm's lockup. Flat artwork rather than a tinted SVG, because the mark is
 * a knockout — the pillar shows through the scale beam and the crimson pans are
 * a gradient — which `currentColor` cannot express.
 *
 * `tone` names the surface, not the ink: "light" is the pale artwork for dark
 * grounds, "dark" the black artwork for pale ones. Each is keyed from the
 * master it was drawn on (see scripts/brand-assets.py), so it only composites
 * cleanly on that kind of ground.
 *
 * `variant` is "mark" in the header, where the stacked lockup would squeeze
 * "LEGAL PRACTITIONERS" to a few illegible pixels, and "lockup" wherever there
 * is height for the whole thing.
 */
export function Logo({
  tone = "dark",
  variant = "lockup",
  className,
}: {
  tone?: "light" | "dark";
  variant?: "mark" | "lockup";
  className?: string;
}) {
  const mark = variant === "mark";
  const src = mark
    ? tone === "light"
      ? markLight
      : markDark
    : tone === "light"
      ? lockupLight
      : lockupDark;

  return (
    <img
      src={src}
      alt={SITE.name}
      width={mark ? 354 : 874}
      height={mark ? 280 : 670}
      className={className ?? (mark ? "h-11 w-auto md:h-12" : "h-24 w-auto md:h-28")}
    />
  );
}
