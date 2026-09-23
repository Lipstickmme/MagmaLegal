import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";

import counselPortrait from "@/assets/photos/counsel-portrait.webp";
import teamLibrary from "@/assets/photos/team-library.webp";
import teamWide from "@/assets/photos/team-wide.webp";
import { FrameReveal } from "@/components/site/FrameReveal";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { WordRise } from "@/components/site/WordRise";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { SITE, telHref } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magma Legal Practitioners. Counsel, advocacy and advisory" },
      {
        name: "description",
        content:
          "Magma Legal Practitioners advises on corporate and commercial matters, disputes, property, energy, employment and private client work.",
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
  { value: "22", label: "Practitioners" },
  { value: "8", label: "Practice areas" },
];

const STAGES = [
  {
    n: "01",
    title: "Consultation",
    body: "An hour, on the record, to establish what has happened.",
  },
  {
    n: "02",
    title: "Assessment",
    body: "Documents reviewed, exposure quantified, options in writing.",
  },
  { n: "03", title: "Strategy", body: "Scope, fee basis and timetable agreed before work begins." },
  { n: "04", title: "Execution", body: "Negotiation, drafting or advocacy, reported as it moves." },
];

/** Six of the practice areas on the cover; the rest live on their own page. */
const FEATURED = PRACTICE_AREAS.slice(0, 6);

function Home() {
  const settings = useSiteSettings();

  return (
    <>
      {/* ------------------------------------------------------------------
          Hero. Split rather than centred, and on paper rather than black:
          the photograph carries the right half, so the left can stay quiet.
      ------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-accent-wash lg:block" />
        <div className="relative mx-auto grid max-w-[92rem] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="flex items-center gap-3 eyebrow text-accent">
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
              Commercial counsel since 2012
            </p>

            <h1 className="mt-8 font-display text-[2.6rem] leading-[1.04] md:text-[4.5rem]">
              Counsel that holds up when it is tested
            </h1>

            <p className="mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A commercial practice built for the moment a transaction turns, a regulator writes, or
              a claim is served. We give you the position in plain terms, then hold it.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group eyebrow inline-flex items-center gap-4 bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-accent"
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
                className="eyebrow inline-flex items-center gap-4 border border-foreground/25 px-8 py-4 transition-colors hover:border-accent hover:text-accent"
              >
                Practice areas
              </Link>
            </div>

            <a
              href={telHref(settings.phone)}
              className="group mt-12 flex w-fit items-center gap-4 border-t border-border pt-7"
            >
              <Phone size={18} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
              <span>
                <span className="block eyebrow text-muted-foreground">Or speak to someone now</span>
                <span className="mt-1 block font-display text-2xl transition-colors group-hover:text-accent md:text-[1.75rem]">
                  {settings.phone}
                </span>
              </span>
            </a>
          </div>

          {/* The portrait sits proud of a crimson block, which is what keeps the
              hero from reading as a photograph dropped onto a page. The block
              and the figure are outside FrameReveal because it clips. */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -right-5 -top-5 hidden h-44 w-44 bg-accent md:block"
            />
            <FrameReveal className="relative">
              <img
                src={counselPortrait}
                alt="A partner of the firm at her desk"
                width={819}
                height={1024}
                className="w-full object-cover"
              />
            </FrameReveal>
            {/* Bottom left, not bottom right: the chat launcher owns that corner
                of the viewport and the two would overlap at the top of the page. */}
            <div className="absolute bottom-0 left-0 hidden bg-primary px-8 py-6 text-primary-foreground md:block">
              <p className="font-display text-4xl leading-none">14</p>
              <p className="mt-2 eyebrow text-primary-foreground/70">Years in practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Practice areas, as a ledger rather than a grid of cards.
      ------------------------------------------------------------------- */}
      <section className="border-y border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground/15 pb-10">
            <div>
              <p className="eyebrow text-accent">What we do</p>
              <WordRise text="Practice areas" className="mt-5 text-4xl leading-[1.1] md:text-5xl" />
            </div>
            <Link
              to="/practice-areas"
              className="eyebrow link-underline inline-flex items-center gap-3 text-accent"
            >
              All eight areas
              <ArrowRight size={15} strokeWidth={1.6} />
            </Link>
          </Reveal>

          <ul>
            {FEATURED.map((area, index) => (
              <Reveal key={area.slug} as="li" delay={index * 50}>
                <Link
                  to="/practice-areas"
                  hash={area.slug}
                  className="group grid items-baseline gap-x-8 gap-y-3 border-b border-border py-7 transition-colors hover:bg-accent-wash md:grid-cols-[4rem_1fr_1.1fr_2rem] md:py-8"
                >
                  <span className="eyebrow text-accent">{area.n}</span>
                  <h3 className="text-2xl transition-colors group-hover:text-accent md:text-[1.75rem]">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground">{area.blurb}</p>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.3}
                    className="hidden justify-self-end text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          The firm, photographed. Full bleed, no scrim, nothing written on it.
      ------------------------------------------------------------------- */}
      <section>
        <img
          src={teamWide}
          alt="The practitioners of Magma Legal Practitioners"
          width={1344}
          height={576}
          loading="lazy"
          className="h-[18rem] w-full object-cover md:h-[34rem]"
        />
        <div className="border-y border-border bg-background">
          <dl className="mx-auto grid max-w-[92rem] grid-cols-2 divide-x divide-border md:grid-cols-4">
            {FIGURES.map((figure) => (
              <div key={figure.label} className="px-5 py-10 text-center md:px-10 md:py-12">
                <dt className="font-display text-4xl md:text-6xl">{figure.value}</dt>
                <dd className="mt-3 eyebrow text-muted-foreground">{figure.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Who we are
      ------------------------------------------------------------------- */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-[92rem] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow text-accent">The firm</p>
            <WordRise
              text="A small firm that takes the whole matter"
              className="mt-6 text-4xl leading-[1.1] md:text-5xl"
            />
            <p className="mt-9 text-lg leading-relaxed text-muted-foreground">
              {SITE.name} advises companies, lenders, founders and private clients. The partner who
              takes your first call stays on the file: there is no handover to a team you have not
              met, and no opinion leaves this office without a partner's name on it.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We keep transactions, regulatory work and disputes in the same rooms on purpose. A
              contract drafted by someone who has litigated one is a different document.
            </p>
            <p className="mt-10 border-l-2 border-accent pl-6 font-display text-xl leading-relaxed md:text-2xl">
              “Tell the client what the file supports, then do the work the file needs.”
            </p>
            <Link
              to="/about"
              className="eyebrow link-underline mt-10 inline-flex items-center gap-3 text-accent"
            >
              More about the firm
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </Reveal>

          <div className="relative">
            <FrameReveal>
              <img
                src={teamLibrary}
                alt="Members of the firm in the library"
                width={1344}
                height={576}
                loading="lazy"
                className="w-full object-cover"
              />
            </FrameReveal>
            <span
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 hidden h-28 w-28 border-b-2 border-r-2 border-accent md:block"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          How an instruction runs, as one line with four stops.
      ------------------------------------------------------------------- */}
      <section className="border-y border-border bg-accent-wash py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-accent">Working with us</p>
            <WordRise
              text="From first call to closed file"
              className="mt-5 max-w-2xl text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>

          <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
            {STAGES.map((stage, index) => (
              <Reveal key={stage.n} as="li" delay={index * 90} className="relative">
                {/* The rule runs between the nodes, not under the last one. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[0.6rem] hidden h-px bg-accent/30 md:block ${
                    index === STAGES.length - 1 ? "w-0" : "w-full"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="relative mb-8 hidden h-[1.1rem] w-[1.1rem] rotate-45 bg-accent md:block"
                />
                <p className="eyebrow text-accent md:hidden">{stage.n}</p>
                <h3 className="mt-3 text-2xl md:mt-0">{stage.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{stage.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Closing call. The one saturated band on the page.
      ------------------------------------------------------------------- */}
      <section className="bg-accent-deep text-accent-foreground">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:px-10 md:py-24">
          <div>
            <h2 className="font-display text-4xl leading-[1.1] md:text-5xl">
              Something has landed on your desk. Send it to us.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-accent-foreground/85">
              A first consultation is an hour with a partner, and you leave it knowing where you
              stand.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 md:items-end">
            <a
              href={telHref(settings.phone)}
              className="font-display text-3xl transition-opacity hover:opacity-80 md:text-[2.5rem]"
            >
              {settings.phone}
            </a>
            <Link
              to="/contact"
              className="group eyebrow inline-flex items-center gap-4 bg-accent-foreground px-8 py-4 text-accent-deep transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Book a consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
