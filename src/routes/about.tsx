import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import lockupDark from "@/assets/brand/lockup-dark.webp";
import teamLibrary from "@/assets/photos/team-library.webp";
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
          "A commercial practice of 22 practitioners, organised so the partner who takes your call keeps the file.",
      },
      { property: "og:title", content: "The Firm. Magma Legal Practitioners" },
      { property: "og:description", content: "Who we are, how we work, and what we will not do." },
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
  { year: "2012", text: "The practice opens with two partners and a commercial caseload." },
  { year: "2015", text: "First arbitration mandate; the disputes group is formed around it." },
  { year: "2018", text: "A regulatory practice is built out for licensing and investigations." },
  { year: "2021", text: "Energy and natural resources becomes a standalone practice area." },
  { year: "2024", text: "The firm passes twenty practitioners across three practice groups." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="The firm"
        title="Built to be answerable"
        crumb="The Firm"
        lead="Twenty-two practitioners, arranged so that the person who understands your matter is the person you can reach."
        image={teamLibrary}
        imageAlt="Members of the firm in the library"
      />

      {/* Approach, alongside the mark */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-[92rem] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow text-accent">Our approach</p>
            <WordRise
              text="We would rather be exact than reassuring"
              className="mt-6 text-4xl leading-[1.1] md:text-5xl"
            />
            <p className="mt-9 text-lg leading-relaxed text-muted-foreground">
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
            <Link
              to="/people"
              className="eyebrow link-underline mt-10 inline-flex items-center gap-3 text-accent"
            >
              Meet the practitioners
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </Reveal>

          <FrameReveal className="border border-border bg-card p-10 md:p-14">
            <img
              src={lockupDark}
              alt={SITE.name}
              width={872}
              height={666}
              loading="lazy"
              className="mx-auto w-full max-w-sm"
            />
            <p className="mt-12 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              The mark is a set of scales hung from a fluted pillar: the balance a matter is weighed
              in, carried by the thing that has to hold it up. The crimson is deliberate — the pans
              are where the weight lands.
            </p>
          </FrameReveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-accent-wash py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-accent">What we hold to</p>
            <WordRise
              text="Three commitments, in writing"
              className="mt-5 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal key={value.n} delay={index * 100} className="bg-accent-wash p-8 md:p-10">
                <p className="eyebrow text-accent">{value.n}</p>
                <h2 className="mt-6 text-2xl">{value.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* History, on a spine */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-accent">History</p>
            <WordRise
              text="How the firm grew"
              className="mt-5 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>

          <ol className="relative mt-14 max-w-4xl">
            {/* The spine stops at the last node rather than running off the end. */}
            <span
              aria-hidden="true"
              className="absolute bottom-10 left-[0.3rem] top-3 w-px bg-accent/25 md:left-[7.3rem]"
            />
            {TIMELINE.map((entry, index) => (
              <Reveal
                key={entry.year}
                as="li"
                delay={index * 70}
                className="relative grid gap-2 pb-10 pl-8 md:grid-cols-[7rem_1fr] md:gap-10 md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.45rem] h-[0.7rem] w-[0.7rem] rotate-45 bg-accent md:left-[7rem]"
                />
                <p className="font-display text-2xl text-accent md:text-right md:text-3xl">
                  {entry.year}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground md:pl-10">
                  {entry.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
