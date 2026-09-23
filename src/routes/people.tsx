import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import counselDesk from "@/assets/photos/counsel-desk.webp";
import { FrameReveal } from "@/components/site/FrameReveal";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { WordRise } from "@/components/site/WordRise";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "Attorneys. Magma Legal Practitioners" },
      {
        name: "description",
        content:
          "The partners, counsel and associates of Magma Legal Practitioners, and the work each of them leads.",
      },
      { property: "og:title", content: "Attorneys. Magma Legal Practitioners" },
      { property: "og:description", content: "Who will be on your matter, and what they do." },
    ],
  }),
  component: People,
});

/**
 * PLACEHOLDER PROFILES. Every person below is invented, and publishing them as
 * the firm's attorneys would misrepresent the practice — replace all eight
 * with the firm's real people (or delete the ones you do not need) before this
 * site goes live. The photographs are stock imagery and belong to nobody named
 * here, which is why no name is printed against a face.
 */
type Person = {
  name: string;
  role: string;
  admitted: string;
  focus: string[];
  bio: string;
};

const PEOPLE: Person[] = [
  {
    name: "A. Whitfield",
    role: "Managing Partner",
    admitted: "2009",
    focus: ["Corporate", "Energy"],
    bio: "Leads the transactional practice. Represents buyers, sellers and investors in acquisitions and joint ventures, and chairs the firm's conflicts committee.",
  },
  {
    name: "B. Castellano",
    role: "Partner, Litigation",
    admitted: "2010",
    focus: ["Commercial Litigation", "Arbitration"],
    bio: "Tries business disputes in state and federal court and in arbitration, and handles the firm's emergency motions and injunctions.",
  },
  {
    name: "C. Brennan",
    role: "Partner, Real Estate",
    admitted: "2011",
    focus: ["Real Estate", "Construction"],
    bio: "Handles acquisitions, leasing and development, including the title and survey review that keeps a closing from turning into a lawsuit.",
  },
  {
    name: "D. Harlow",
    role: "Counsel, Regulatory",
    admitted: "2013",
    focus: ["Regulatory", "Compliance"],
    bio: "Advises on licensing, anti-money-laundering programs and privacy compliance, and represents clients in government and internal investigations.",
  },
  {
    name: "E. Mercer",
    role: "Senior Associate",
    admitted: "2016",
    focus: ["Employment", "Litigation"],
    bio: "Drafts the agreements and handbooks employers are judged on, and defends discrimination, wage-and-hour and non-compete claims.",
  },
  {
    name: "F. Tanaka",
    role: "Senior Associate",
    admitted: "2017",
    focus: ["Intellectual Property", "Technology"],
    bio: "Registers and enforces trademarks and copyrights, and drafts the software, SaaS and licensing agreements technology clients do business on.",
  },
  {
    name: "G. Reyes",
    role: "Associate",
    admitted: "2020",
    focus: ["Corporate", "Trusts & Estates"],
    bio: "Entity formations, corporate governance, wills and trusts, and the due diligence behind the firm's transactions.",
  },
  {
    name: "H. Sullivan",
    role: "Associate",
    admitted: "2022",
    focus: ["Litigation", "Collections"],
    bio: "Collections and judgment enforcement, and the document-heavy side of litigation, from pleadings and discovery through trial.",
  },
];

/** `A. Whitfield` → `AW`. Initials rather than a stock portrait of a stranger. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-z]/g, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function People() {
  const settings = useSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Attorneys"
        title="The people on your matter"
        crumb="Attorneys"
        lead="Three partners, counsel and five associates. The name at the top of your engagement letter is the name that answers for the work."
      />

      {/* One photograph, with the thing it is there to say printed under it. */}
      <section className="relative">
        <FrameReveal>
          <img
            src={counselDesk}
            alt="A partner of the firm at her desk"
            width={1344}
            height={576}
            className="h-[18rem] w-full object-cover md:h-[30rem]"
          />
        </FrameReveal>
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          {/* `relative z-10`, not just a negative margin: an in-flow block
              paints its background before an image's pixels, so without its
              own layer the card's white sits *under* the photograph while its
              text lands on top. The reveal's transform hid this until the
              animation finished and the transform was dropped. */}
          <Reveal className="relative z-10 border border-l-2 border-border border-l-accent bg-card p-8 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] md:-mt-24 md:max-w-2xl md:p-12">
            <p className="font-display text-2xl leading-snug md:text-[1.75rem]">
              “Every matter has a partner's name on it. If you cannot reach that person, you have
              not been given the right name.”
            </p>
            <p className="mt-6 eyebrow text-muted-foreground">The firm's first rule</p>
          </Reveal>
        </div>
      </section>

      {/* The roster, as a list rather than a wall of cards. */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <ul className="border-t border-border">
            {PEOPLE.map((person, index) => (
              <Reveal
                key={person.name}
                as="li"
                delay={(index % 4) * 60}
                className="row-rule group grid items-start gap-x-8 gap-y-4 border-b border-border py-8 pl-5 transition-colors duration-500 hover:bg-accent-wash lg:grid-cols-[4.5rem_14rem_1fr_12rem] lg:py-9"
              >
                <span
                  aria-hidden="true"
                  className="flex h-[4.5rem] w-[4.5rem] items-center justify-center border border-border bg-background font-display text-xl transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
                >
                  {initials(person.name)}
                </span>
                <div>
                  <h2 className="text-2xl leading-tight">{person.name}</h2>
                  <p className="mt-2 eyebrow text-accent">{person.role}</p>
                </div>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">{person.bio}</p>
                <div className="lg:text-right">
                  <p className="eyebrow text-muted-foreground">Admitted {person.admitted}</p>
                  <ul className="mt-3 flex flex-wrap gap-2 lg:justify-end">
                    {person.focus.map((area) => (
                      <li
                        key={area}
                        className="border border-border bg-background px-2.5 py-1 text-xs"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Recruiting */}
      <section className="border-t border-border bg-accent-wash py-20 md:py-28">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 md:grid-cols-[1.2fr_1fr] md:items-center md:px-10">
          <Reveal>
            <p className="eyebrow text-accent">Careers</p>
            <WordRise
              text="We hire for judgment, not for volume"
              className="mt-5 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We hire one or two associates a year and put them on real matters from their first
              week. If that is the practice you want, send your résumé and a writing sample.
            </p>
            <a
              href={`mailto:${settings.email}?subject=Associate%20application`}
              className="btn-sweep group eyebrow mt-8 inline-flex items-center gap-4 bg-primary px-8 py-4 text-primary-foreground"
            >
              Apply by email
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
