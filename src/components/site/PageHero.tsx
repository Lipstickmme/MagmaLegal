import { Link } from "@tanstack/react-router";

/**
 * The band every inner page opens on: a pale blush ground, the crumb, and the
 * title set large. Pale rather than black, because the page below it is pale
 * and a dark cap made every inner page look like the same page.
 *
 * `image` is a wide photograph printed full-bleed directly under the band,
 * which is where a page that has one wants it — under the sentence that
 * introduces it, not behind the words.
 */
export function PageHero({
  eyebrow,
  title,
  crumb,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  crumb: string;
  /** Optional standfirst under the title. */
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <>
      <section className="relative border-b border-border bg-accent-wash pb-16 pt-32 md:pb-20 md:pt-44">
        <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
          <p className="enter flex items-center gap-3 eyebrow text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
            <span className="text-foreground">{crumb}</span>
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="enter eyebrow text-accent" style={{ animationDelay: "120ms" }}>
                {eyebrow}
              </p>
              <h1
                className="enter mt-6 max-w-3xl font-display text-[2.6rem] leading-[1.05] md:text-[4.25rem]"
                style={{ animationDelay: "220ms" }}
              >
                {title}
              </h1>
            </div>
            {lead ? (
              <p
                className="enter max-w-xl border-l-2 border-accent pl-6 text-lg leading-relaxed text-muted-foreground lg:pb-3"
                style={{ animationDelay: "360ms" }}
              >
                {lead}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {image ? (
        <div className="relative border-b border-border">
          <div className="overflow-hidden">
            <img
              src={image}
              alt={imageAlt ?? ""}
              width={1344}
              height={576}
              className="hero-settle h-[16rem] w-full object-cover md:h-[26rem]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
