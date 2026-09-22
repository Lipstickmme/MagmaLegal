import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import lockupLight from "@/assets/brand/lockup-light.webp";
import { Reveal } from "@/components/site/Reveal";
import { WordRise } from "@/components/site/WordRise";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magma Legal Practitioners. Counsel, advocacy and advisory" },
      {
        name: "description",
        content:
          "Magma Legal Practitioners advises on corporate and commercial matters, disputes, property, energy, employment and private client work. Offices in Lagos, Abuja and Port Harcourt.",
      },
      { property: "og:title", content: "Magma Legal Practitioners" },
      {
        property: "og:description",
        content: "Commercial counsel and courtroom advocacy, held to one standard.",
      },
    ],
  }),
  component: Home,
});

/** The four figures the firm leads with. Placeholders — edit them here. */
const FIGURES = [
  { value: "14", label: "Years in practice" },
  { value: "600+", label: "Matters handled" },
  { value: "3", label: "Offices" },
  { value: "22", label: "Practitioners" },
];

const STANDARDS = [
  {
    n: "01",
    title: "The brief before the opinion",
    body: "We read everything, ask the awkward question early, and tell you what the file actually supports — not what it would be pleasant to hear.",
  },
  {
    n: "02",
    title: "Drafted to be relied on",
    body: "Agreements and pleadings written so the next reader — a regulator, a judge, your successor — finds the answer without calling us.",
  },
  {
    n: "03",
    title: "Commercial before adversarial",
    body: "Most matters should settle, and settle early. We litigate hard when it is the better route, and we say so plainly when it is not.",
  },
];

const PROCESS = [
  {
    n: "Stage 01",
    title: "Consultation",
    body: "An hour, on the record, to establish what has happened and what you need.",
  },
  {
    n: "Stage 02",
    title: "Assessment",
    body: "Documents reviewed, exposure quantified, and a written view of the options.",
  },
  {
    n: "Stage 03",
    title: "Strategy",
    body: "A scope, a fee basis and a timetable agreed in writing before work begins.",
  },
  {
    n: "Stage 04",
    title: "Execution",
    body: "Negotiation, drafting or advocacy, with the file reported on as it moves.",
  },
];

/** Six of the practice areas on the cover; the rest live on their own page. */
const FEATURED = PRACTICE_AREAS.slice(0, 6);

function Home() {
  return (
    <>
      {/* Hero. The lockup is the artwork — keyed off its black master, so it
          sits on this ground without a seam. */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 rule-grid-dark" />

        <div className="relative mx-auto flex w-full max-w-[92rem] flex-col items-center px-5 py-32 text-center md:px-10">
          <img
            src={lockupLight}
            alt={SITE.name}
            width={874}
            height={670}
            className="fade-in w-[min(22rem,66vw)]"
          />

          <p className="fade-in eyebrow mt-12 text-ink-foreground/70 [animation-delay:200ms]">
            Corporate &middot; Disputes &middot; Property &middot; Energy
          </p>

          <h1 className="fade-in mt-7 max-w-4xl font-display text-[2.35rem] leading-[1.08] md:text-[4.25rem] [animation-delay:320ms]">
            Counsel that holds up when it is tested
          </h1>

          <p className="fade-in mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/70 [animation-delay:440ms]">
            A commercial practice built for the moment a transaction turns, a regulator writes, or a
            claim is served. We give you the position in plain terms, then hold it.
          </p>

          <div className="fade-in mt-12 flex flex-wrap items-center justify-center gap-4 [animation-delay:560ms]">
            <Link
              to="/contact"
              className="group eyebrow inline-flex items-center gap-4 bg-ink-foreground px-8 py-4 text-ink transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Book a consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/practice-areas"
              className="group eyebrow inline-flex items-center gap-4 border border-ink-foreground/40 px-8 py-4 text-ink-foreground transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              Practice areas
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-8 mx-auto hidden w-fit flex-col items-center gap-3 eyebrow text-ink-foreground/40 md:flex"
        >
          <ArrowDown size={14} strokeWidth={1.4} />
          Scroll
        </span>
      </section>

      {/* The firm, in short */}
      <section className="relative bg-background py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 rule-grid opacity-60" />
        <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="eyebrow draw-rule draw-rule-in text-accent">The firm</p>
              <WordRise
                text="A small firm that takes the whole matter"
                className="mt-8 text-4xl leading-[1.1] md:text-5xl"
              />
              <p className="mt-10 border-l-2 border-accent pl-6 font-display text-xl leading-relaxed text-foreground/80 md:text-2xl">
                “Tell the client what the file supports, then do the work the file needs.”
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:pt-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {SITE.name} is a commercial practice advising companies, founders, lenders and
                private clients. The partner who takes your first call stays on the file: there is
                no handover to a team you have not met, and no opinion leaves this office without a
                partner's name on it.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We work across transactions, regulatory matters and contentious work, which means
                the lawyer drafting your agreement has argued the clause that goes wrong. It shows
                in the drafting.
              </p>
              <Reveal delay={200}>
                <Link
                  to="/about"
                  className="eyebrow link-underline mt-10 inline-flex items-center gap-3 text-accent"
                >
                  More about the firm
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </Link>
              </Reveal>
            </Reveal>
          </div>

          {/* Full width rather than stacked under the prose: the left column
              ends at the pull quote, and a four-up row is what fills that. */}
          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-12 sm:grid-cols-4">
            {FIGURES.map((figure, index) => (
              <Reveal key={figure.label} delay={index * 90} as="div">
                <dt className="font-display text-4xl md:text-6xl">{figure.value}</dt>
                <dd className="mt-3 eyebrow text-muted-foreground">{figure.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Practice areas */}
      <section className="bg-secondary py-24 md:py-36">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow draw-rule draw-rule-in text-accent">What we do</p>
              <WordRise text="Practice areas" className="mt-8 text-4xl leading-[1.1] md:text-6xl" />
            </div>
            <Link
              to="/practice-areas"
              className="eyebrow link-underline text-accent hover:text-accent"
            >
              All practice areas
            </Link>
          </Reveal>

          {/* Each card is a link, because the arrow says it is. They all land
              on /practice-areas — there are no per-area pages to point at. */}
          <div className="mt-16 grid border-t border-foreground/15 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((area, index) => (
              <Reveal
                key={area.slug}
                delay={index * 80}
                className="border-b border-foreground/15 lg:[&:not(:nth-child(3n))]:border-r"
              >
                <Link
                  to="/practice-areas"
                  hash={area.slug}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-background md:p-10"
                >
                  <p className="eyebrow draw-rule draw-rule-in text-accent">{area.n}</p>
                  <h3 className="mt-7 text-2xl transition-colors group-hover:text-accent md:text-[1.75rem]">
                    {area.title}
                  </h3>
                  <p className="mt-4 flex-1 text-muted-foreground">{area.blurb}</p>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.3}
                    className="mt-8 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32">
        <div className="pointer-events-none absolute inset-0 rule-grid-dark" />
        <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-accent-ink">How we hold ourselves</p>
            <WordRise
              text="Three standards, applied to every file"
              className="mt-8 max-w-3xl text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {STANDARDS.map((standard, index) => (
              <Reveal
                key={standard.n}
                delay={index * 110}
                className="border-t border-ink-foreground/25 pt-8"
              >
                <p className="eyebrow text-accent-ink">{standard.n}</p>
                <h3 className="mt-6 text-2xl">{standard.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-foreground/65">{standard.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-background py-24 md:py-36">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow draw-rule draw-rule-in text-accent">Working with us</p>
            <WordRise
              text="From first call to closed file"
              className="mt-8 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {PROCESS.map((stage, index) => (
              <Reveal key={stage.n} delay={index * 100} className="border-t border-border pt-8">
                <p className="eyebrow text-accent">{stage.n}</p>
                <h3 className="mt-6 text-2xl">{stage.title}</h3>
                <p className="mt-4 text-muted-foreground">{stage.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-border bg-secondary py-10">
        <div className="flex w-max marquee-track gap-14 pr-14">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex gap-14" aria-hidden={copy === 1}>
              {[
                "Corporate",
                "Litigation",
                "Property",
                "Energy",
                "Employment",
                "Private client",
              ].map((word) => (
                <span
                  key={`${word}-${copy}`}
                  className="flex items-center gap-14 font-display text-4xl text-foreground/70 md:text-6xl"
                >
                  {word}
                  <span className="h-2.5 w-2.5 rotate-45 bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Closing call */}
      <section className="bg-background py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <WordRise
            text="Something has landed on your desk. Send it to us."
            className="text-4xl leading-[1.1] md:text-6xl"
          />
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            A first consultation is an hour with a partner, at our office or yours, and you leave it
            knowing where you stand.
          </p>
          <Link
            to="/contact"
            className="mt-12 inline-flex items-center gap-4 bg-primary px-9 py-4 eyebrow text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Speak to counsel
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
