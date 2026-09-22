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

      <section className="relative bg-background py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 rule-grid opacity-60" />
        <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
          <ul className="border-t border-border">
            {PRACTICE_AREAS.map((area, index) => (
              <Reveal
                key={area.slug}
                as="li"
                id={area.slug}
                delay={index * 60}
                /* scroll-mt clears the fixed header when the home page cards
                   link straight to one of these by hash. */
                className="grid scroll-mt-28 gap-8 border-b border-border py-12 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-16"
              >
                <div>
                  <p className="eyebrow draw-rule draw-rule-in text-accent">{area.n}</p>
                  <h2 className="mt-7 text-3xl leading-tight md:text-4xl">{area.title}</h2>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">{area.body}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
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
      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32">
        <div className="pointer-events-none absolute inset-0 rule-grid-dark" />
        <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-accent-ink">Fees</p>
            <WordRise
              text="You will know the basis before we begin"
              className="mt-8 max-w-3xl text-4xl leading-[1.1] md:text-5xl"
            />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/65">
              Every engagement starts with a letter setting out the scope, the fee basis and who is
              doing the work. No file moves without it.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {FEES.map((fee, index) => (
              <Reveal
                key={fee.title}
                delay={index * 110}
                className="border-t border-ink-foreground/25 pt-8"
              >
                <h3 className="text-2xl">{fee.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-foreground/65">{fee.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <Link
              to="/contact"
              className="eyebrow mt-16 inline-flex items-center gap-4 border border-ink-foreground/40 px-9 py-4 transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              Ask for a fee estimate
              <ArrowUpRight size={16} strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
