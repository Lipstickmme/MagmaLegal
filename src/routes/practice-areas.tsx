import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WordRise } from "@/components/site/WordRise";
import { PRACTICE_AREAS } from "@/lib/practice-areas";

export const Route = createFileRoute("/practice-areas")({
  head: () => ({
    meta: [
      { title: "Practice Areas. Magma Legal Practitioners" },
      {
        name: "description",
        content:
          "Corporate and commercial, litigation and dispute resolution, real estate, energy, employment, regulatory, intellectual property and private client work.",
      },
      { property: "og:title", content: "Practice Areas. Magma Legal Practitioners" },
      {
        property: "og:description",
        content: "Eight practice areas, run by the lawyers who will argue the clause.",
      },
    ],
  }),
  component: PracticeAreas,
});

/** How the firm charges. Plain about it on purpose — most sites are not. */
const FEES = [
  {
    title: "Fixed fee",
    body: "Incorporations, trade marks, wills, title perfection and most drafting: one quoted figure, agreed before we start.",
  },
  {
    title: "Hourly",
    body: "Disputes and transactions whose shape is not yet known, billed against a written estimate and reported monthly.",
  },
  {
    title: "Retainer",
    body: "Ongoing advisory for companies that would rather ask early than escalate late, at an agreed monthly commitment.",
  },
];

function PracticeAreas() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Eight practice areas, one standard"
        crumb="Practice Areas"
        lead="Transactional, regulatory and contentious work under one roof, which is why the lawyer drafting your agreement has argued the clause that goes wrong."
      />

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 md:px-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          {/* An index that stays on screen, so eight long sections do not mean
              scrolling back to the top to reach the ninth thing you wanted. */}
          <nav aria-label="Practice areas" className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow border-b border-border pb-4 text-muted-foreground">Index</p>
            <ol className="mt-5 space-y-3">
              {PRACTICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <a
                    href={`#${area.slug}`}
                    className="group flex gap-3 text-sm leading-snug text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="eyebrow pt-0.5 text-accent/70">{area.n}</span>
                    {area.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <ul className="border-t border-border">
            {PRACTICE_AREAS.map((area, index) => (
              <Reveal
                key={area.slug}
                as="li"
                id={area.slug}
                delay={index * 40}
                /* scroll-mt clears the fixed header when the index or a home
                   page row links straight to one of these by hash. */
                className="scroll-mt-28 border-b border-border py-12 md:py-14"
              >
                <div className="flex items-baseline gap-5">
                  <span className="eyebrow text-accent">{area.n}</span>
                  <h2 className="text-3xl leading-tight md:text-4xl">{area.title}</h2>
                </div>
                <div className="mt-7 grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14">
                  <p className="text-lg leading-relaxed text-muted-foreground">{area.body}</p>
                  <ul className="grid gap-3 self-start border-l border-border pl-8">
                    {area.work.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check
                          size={15}
                          strokeWidth={2}
                          className="mt-1 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span className="text-foreground/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Fees */}
      <section className="border-y border-border bg-accent-wash py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-accent">Fees</p>
            <WordRise
              text="You will know the basis before we begin"
              className="mt-5 text-4xl leading-[1.1] md:text-5xl"
            />
            <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
              Every engagement starts with a letter setting out the scope, the fee basis and who is
              doing the work. No file moves without it.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
            {FEES.map((fee, index) => (
              <Reveal key={fee.title} delay={index * 100} className="bg-card p-8 md:p-10">
                <h3 className="text-2xl">{fee.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{fee.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <Link
              to="/contact"
              className="group eyebrow mt-14 inline-flex items-center gap-4 bg-primary px-9 py-4 text-primary-foreground transition-colors hover:bg-accent"
            >
              Ask for a fee estimate
              <ArrowUpRight
                size={16}
                strokeWidth={1.4}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
