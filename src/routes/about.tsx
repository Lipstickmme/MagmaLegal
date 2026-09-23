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
          "A business law firm of 22 attorneys, organized so the partner who takes your call stays on your matter.",
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
    title: "The partner stays on the matter",
    body: "Whoever takes your first call answers for the matter at the end of it. Work is delegated; responsibility is not.",
  },
  {
    n: "02",
    title: "Bad news travels first",
    body: "A setback reaches you from us, on the day we learn of it, with the options already set out.",
  },
  {
    n: "03",
    title: "We decline the wrong engagement",
    body: "We turn down work we cannot do well, or cannot take on without a conflict. It is cheaper for everyone than finding out later.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="The firm"
        title="Built to be answerable"
        crumb="The Firm"
        lead="Twenty-two attorneys, organized so that the person who understands your matter is the person you can reach."
        image={teamLibrary}
        imageAlt="Attorneys of the firm in the library"
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
              {SITE.name} advises companies, lenders, founders and families. The work divides
              between transactions, regulatory matters and litigation, and we keep all three under
              one roof on purpose: a contract drafted by someone who has litigated one is a
              different document.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              What that means in practice is unglamorous. We read the whole file before advising on
              part of it. We put our assessment in writing, including the parts that go against you.
              We agree on fees before we begin, and we tell you when a matter no longer justifies
              the cost of fighting it.
            </p>
            <Link
              to="/people"
              className="group eyebrow link-underline mt-10 inline-flex items-center gap-3 text-accent"
            >
              Meet our attorneys
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
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
      <section className="border-t border-border bg-accent-wash py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-accent">What we hold to</p>
            <WordRise
              text="Three commitments, in writing"
              className="mt-5 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal key={value.n} delay={index * 100} className="bg-accent-wash p-8 md:p-10">
                <p className="eyebrow text-accent">{value.n}</p>
                <h2 className="mt-6 text-2xl">{value.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{value.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-16 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="btn-sweep group eyebrow inline-flex items-center gap-4 bg-primary px-8 py-4 text-primary-foreground"
            >
              Book a consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/practice-areas"
              className="eyebrow link-underline text-foreground/80 transition-colors hover:text-accent"
            >
              See our practice areas
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
