import { Link } from "@tanstack/react-router";

import markLight from "@/assets/brand/mark-light.webp";

/**
 * The band every inner page opens on. Typographic rather than photographic:
 * there is no stock photography anywhere on this site, and a black ground with
 * the mark ghosted into the corner carries a page better than a picture of a
 * courthouse nobody in the firm has been to.
 */
export function PageHero({
  eyebrow,
  title,
  crumb,
  lead,
}: {
  eyebrow: string;
  title: string;
  crumb: string;
  /** Optional standfirst under the title. */
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-40 text-ink-foreground md:pb-32 md:pt-52">
      <div className="pointer-events-none absolute inset-0 rule-grid-dark" />
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" />
      <img
        src={markLight}
        alt=""
        aria-hidden="true"
        width={354}
        height={280}
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-[22rem] w-auto -translate-y-1/2 opacity-[0.07] lg:block"
      />
      <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
        <p className="eyebrow text-accent-ink">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.05] md:text-7xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/70">{lead}</p>
        ) : null}
        <p className="mt-10 flex items-center gap-3 eyebrow text-ink-foreground/50">
          <Link to="/" className="transition-colors hover:text-accent-ink">
            Home
          </Link>
          <span className="h-1.5 w-1.5 rotate-45 bg-accent-ink/70" />
          {crumb}
        </p>
      </div>
    </section>
  );
}
