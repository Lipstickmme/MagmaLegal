import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import lockupDark from "@/assets/brand/lockup-dark.webp";
import { FrameReveal } from "@/components/site/FrameReveal";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WordRise } from "@/components/site/WordRise";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Firm. Magma Legal Practitioners" },
      {
        name: "description",
        content:
          "A commercial practice of 22 practitioners across Lagos, Abuja and Port Harcourt, organised so the partner who takes your call keeps the file.",
      },
      { property: "og:title", content: "The Firm. Magma Legal Practitioners" },
      {
        property: "og:description",
        content: "Who we are, how we work, and what we will not do.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  {
    n: "01",
    title: "The partner keeps the file",
    body: "Whoever takes your first call answers for the matter at the end of it. Work is delegated; responsibility is not.",
  },
  {
    n: "02",
    title: "Say it before it is asked",
    body: "A bad development reaches you from us, on the day we learn it, with the options already set out.",
  },
  {
    n: "03",
    title: "Decline the wrong instruction",
    body: "We turn down work we cannot do well, or cannot do without a conflict. It is cheaper for everyone than finding out later.",
  },
];

const TIMELINE = [
  {
    year: "2012",
    text: "The practice opens in Lagos with two partners and a commercial caseload.",
  },
  { year: "2015", text: "First arbitration mandate; the disputes group is formed around it." },
  { year: "2018", text: "Abuja office opens to serve regulatory and public-sector work." },
  { year: "2021", text: "Energy and natural resources becomes a standalone practice area." },
  { year: "2024", text: "Port Harcourt office opens; the firm passes twenty practitioners." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="The firm"
        title="Built to be answerable"
        crumb="The Firm"
        lead="Twenty-two practitioners across three offices, arranged so that the person who understands your matter is the person you can reach."
      />

      {/* Approach, alongside the mark */}
      <section className="relative bg-background py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 rule-grid opacity-60" />
        <div className="relative mx-auto grid max-w-[92rem] gap-16 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
          <FrameReveal className="border border-border bg-card p-10 md:p-16">
            <img
              src={lockupDark}
              alt={SITE.name}
              width={872}
              height={666}
              className="mx-auto w-full max-w-md"
            />
            <p className="mt-12 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              The mark is a set of scales hung from a fluted pillar: the balance a matter is weighed
              in, carried by the thing that has to hold it up. The crimson is deliberate — the pans
              are where the weight lands.
            </p>
          </FrameReveal>

          <Reveal delay={120} className="lg:pl-6">
            <p className="eyebrow draw-rule draw-rule-in text-accent">Our approach</p>
            <WordRise
              text="We would rather be exact than reassuring"
              className="mt-8 text-4xl leading-[1.1] md:text-5xl"
            />
            <p className="mt-10 text-lg leading-relaxed text-muted-foreground">
              {SITE.name} advises companies, lenders, founders and private clients. The work divides
              between transactions, regulatory matters and disputes, and we keep all three in the
              same rooms on purpose: a contract drafted by someone who has litigated one is a
              different document.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              What that means in practice is unglamorous. We read the whole file before advising on
              part of it. We put the merits in writing, including the parts that are against you. We
              quote a fee basis before we begin, and we tell you when a matter no longer justifies
              the cost of fighting it.
            </p>

            <Reveal delay={200}>
              <Link
                to="/people"
                className="eyebrow link-underline mt-12 inline-flex items-center gap-3 text-accent"
              >
                Meet the practitioners
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow draw-rule draw-rule-in text-accent">What we hold to</p>
            <WordRise
              text="Three commitments, in writing"
              className="mt-8 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.n}
                delay={index * 110}
                className="border-t border-foreground/20 pt-8"
              >
                <p className="eyebrow draw-rule draw-rule-in text-accent">{value.n}</p>
                <h3 className="mt-7 text-2xl">{value.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow draw-rule draw-rule-in text-accent">History</p>
            <WordRise
              text="How the firm grew"
              className="mt-8 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <div className="mt-14 border-t border-border">
            {TIMELINE.map((entry, index) => (
              <Reveal
                key={entry.year}
                delay={index * 80}
                className="grid gap-4 border-b border-border py-8 md:grid-cols-[10rem_1fr] md:py-10"
              >
                <p className="font-display text-3xl text-accent">{entry.year}</p>
                <p className="max-w-2xl text-lg text-muted-foreground">{entry.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
