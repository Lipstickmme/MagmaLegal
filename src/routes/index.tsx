import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";

import counselPortrait from "@/assets/photos/counsel-portrait.webp";
import teamWide from "@/assets/photos/team-wide.webp";
import { CountUp } from "@/components/site/CountUp";
import { FrameReveal } from "@/components/site/FrameReveal";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { EmailText } from "@/components/site/EmailText";
import { WordRise } from "@/components/site/WordRise";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magma Legal Practitioners. Business law, litigation and advisory" },
      {
        name: "description",
        content:
          "Magma Legal Practitioners advises businesses and families on corporate transactions, litigation, real estate, energy, employment, intellectual property and estate planning.",
      },
      { property: "og:title", content: "Magma Legal Practitioners" },
      {
        property: "og:description",
        content: "Business counsel and courtroom advocacy, held to one standard.",
      },
    ],
  }),
  component: Home,
});

/** The four figures the firm leads with. Placeholders — edit them here. */
const FIGURES = [
  { value: "22", label: "Attorneys" },
  { value: "14", label: "Years in practice" },
  { value: "600+", label: "Matters handled" },
  { value: "8", label: "Practice areas" },
];

const STAGES = [
  {
    n: "01",
    title: "Consultation",
    body: "An hour with an attorney to establish what has happened and what you need.",
  },
  {
    n: "02",
    title: "Assessment",
    body: "Documents reviewed, exposure quantified, and your options set out in writing.",
  },
  {
    n: "03",
    title: "Engagement",
    body: "Scope, fee arrangement and timetable agreed in an engagement letter.",
  },
  {
    n: "04",
    title: "Execution",
    body: "Negotiation, drafting or litigation, with regular reports as it moves.",
  },
];

/** Six of the practice areas on the cover; the rest live on their own page. */
const FEATURED = PRACTICE_AREAS.slice(0, 6);

function Home() {
  const settings = useSiteSettings();

  return (
    <>
      {/* ------------------------------------------------------------------
          Hero. The team photograph runs full bleed under a light overlay, with
          nothing written across it: in this frame the seated row's faces sit
          in the lower middle, so type laid over the photograph crosses a face
          at one width or another. The copy sits on a card that overlaps the
          photograph's lower edge instead — over the suits and the table, clear
          of every face at every width.
      ------------------------------------------------------------------- */}
      <section className="relative bg-background pt-[7.5rem]">
        {/* From tablet up the band keeps the photograph's own proportions, so
            the faces always end about 65% of the way down it and the card's
            overlap — a matching 24% of the band — never reaches them. Sized
            by viewport height instead, a short wide screen crops the photo top
            and bottom and pushes the faces down into the card. Past 1840px the
            band stops growing rather than cropping to a letterbox slice. */}
        <div className="relative mx-auto h-[clamp(19rem,58svh,40rem)] max-w-[115rem] overflow-hidden bg-ink md:aspect-[1344/576] md:h-auto md:max-h-[44rem]">
          <img
            src={teamWide}
            alt="The attorneys of Magma Legal Practitioners"
            width={1344}
            height={576}
            fetchPriority="high"
            className="hero-settle absolute inset-0 h-full w-full object-cover object-[50%_30%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/15" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent"
          />
        </div>

        <div className="relative mx-auto grid max-w-[92rem] gap-10 px-5 pb-16 md:px-10 md:pb-24 xl:grid-cols-[minmax(0,44rem)_1fr] xl:items-end xl:gap-14">
          <div
            className="enter relative z-10 -mt-24 border-t-2 border-accent bg-background p-6 shadow-[0_32px_64px_-40px_rgb(0_0_0/0.5)] md:mt-[calc(-1*min(10.5vw,10rem))] md:max-w-3xl md:p-12 xl:max-w-none"
            style={{ animationDelay: "250ms" }}
          >
            <p className="flex items-center gap-3 eyebrow text-accent">
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
              Business counsel since 2012
            </p>

            <h1 className="mt-6 font-display text-[2.4rem] leading-[1.06] md:text-[3.75rem]">
              Counsel that holds up when it is tested
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              For the moment a deal turns, a regulator calls, or a complaint is served. Plain
              advice, then the work to back it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
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
                className="eyebrow inline-flex items-center gap-4 border border-foreground/25 px-8 py-4 transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Practice areas
              </Link>
            </div>
          </div>

          {/* The figures sit beside the card from 1280px, below the
              photograph, so they never cover a face either; narrower, there is
              no room beside it and they run as a row underneath. Inside a Reveal on purpose: CountUp
              resets to zero when it comes into view, and the Reveal is still
              transparent at that moment, so the reset is never seen. */}
          <Reveal as="div" delay={400}>
            <dl className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4 xl:grid-cols-2">
              {FIGURES.map((figure) => (
                <div key={figure.label} className="bg-background px-6 py-7 md:px-8 md:py-9">
                  <dt className="font-display text-4xl leading-none md:text-5xl">
                    <CountUp value={figure.value} />
                  </dt>
                  <dd className="mt-3 eyebrow text-muted-foreground">{figure.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Practice areas, as a ledger rather than a grid of cards.
      ------------------------------------------------------------------- */}
      <section className="border-t border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground/15 pb-10">
            <div>
              <p className="eyebrow text-accent">What we do</p>
              <WordRise text="Practice areas" className="mt-5 text-4xl leading-[1.1] md:text-5xl" />
            </div>
            <Link
              to="/practice-areas"
              className="group eyebrow link-underline inline-flex items-center gap-3 text-accent"
            >
              All eight areas
              <ArrowRight
                size={15}
                strokeWidth={1.6}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <ul>
            {FEATURED.map((area, index) => (
              <Reveal key={area.slug} as="li" delay={index * 60}>
                <Link
                  to="/practice-areas"
                  hash={area.slug}
                  className="row-rule group grid items-baseline gap-x-8 gap-y-3 border-b border-border py-7 pl-5 pr-2 transition-colors duration-500 hover:bg-accent-wash lg:grid-cols-[4rem_1fr_1.1fr_2rem] lg:py-8"
                >
                  <span className="eyebrow text-accent">{area.n}</span>
                  <h3 className="text-2xl transition-colors duration-300 group-hover:text-accent md:text-[1.75rem]">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground">{area.blurb}</p>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.3}
                    className="hidden justify-self-end text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent lg:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Who we are
      ------------------------------------------------------------------- */}
      <section className="border-t border-border bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-[92rem] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow text-accent">The firm</p>
            <WordRise
              text="A small firm that takes the whole matter"
              className="mt-6 text-4xl leading-[1.1] md:text-5xl"
            />
            <p className="mt-9 text-lg leading-relaxed text-muted-foreground">
              {SITE.name} advises companies, lenders, founders and families. The partner who takes
              your first call stays on the matter: there is no handoff to a team you have not met,
              and no opinion leaves this office without a partner's signature on it.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We keep transactions, regulatory work and litigation under one roof on purpose. A
              contract drafted by someone who has litigated one is a different document.
            </p>
            <p className="mt-10 border-l-2 border-accent pl-6 font-display text-xl leading-relaxed md:text-2xl">
              “Tell the client what the file supports, then do the work the file needs.”
            </p>
            <Link
              to="/about"
              className="group eyebrow link-underline mt-10 inline-flex items-center gap-3 text-accent"
            >
              More about the firm
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          {/* The block sits outside FrameReveal because FrameReveal clips. */}
          <div className="group relative mx-auto w-full max-w-md lg:max-w-none">
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
                loading="lazy"
                className="img-zoom w-full object-cover"
              />
            </FrameReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          How an instruction runs, as one line with four stops.
      ------------------------------------------------------------------- */}
      <section className="border-t border-border bg-accent-wash py-20 md:py-28">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-accent">Working with us</p>
            <WordRise
              text="From first call to closed file"
              className="mt-5 max-w-2xl text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>

          <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STAGES.map((stage, index) => (
              <Reveal key={stage.n} as="li" delay={index * 120} className="relative">
                {/* The rule runs from each node to the next, and draws itself
                    once its stage is revealed; the last stage has none. */}
                {index < STAGES.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="draw-line absolute left-[1.1rem] top-[0.55rem] hidden h-px w-[calc(100%+2rem-1.1rem)] bg-accent/35 lg:block"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="relative mb-8 hidden h-[1.1rem] w-[1.1rem] rotate-45 bg-accent lg:block"
                />
                <p className="eyebrow text-accent lg:hidden">{stage.n}</p>
                <h3 className="mt-3 text-2xl lg:mt-0">{stage.title}</h3>
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
        <Reveal className="mx-auto grid max-w-[92rem] gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl leading-[1.1] md:text-5xl">
              Something has landed on your desk. Send it to us.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-accent-foreground/85">
              A first consultation is an hour with an attorney, and you leave it knowing where you
              stand.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <a
              href={`mailto:${settings.email}`}
              className="group inline-flex items-center gap-3 font-display text-2xl transition-opacity hover:opacity-80 md:text-3xl"
            >
              <Mail size={22} strokeWidth={1.4} aria-hidden="true" />
              <span className="link-underline break-words">
                <EmailText address={settings.email} />
              </span>
            </a>
            <Link
              to="/contact"
              className="group eyebrow inline-flex items-center gap-4 bg-accent-foreground px-8 py-4 text-accent-deep transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              Book a consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
