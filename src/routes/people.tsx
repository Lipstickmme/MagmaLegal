import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WordRise } from "@/components/site/WordRise";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People. Magma Legal Practitioners" },
      {
        name: "description",
        content:
          "The partners, counsel and associates of Magma Legal Practitioners, and the work each of them leads.",
      },
      { property: "og:title", content: "People. Magma Legal Practitioners" },
      {
        property: "og:description",
        content: "Who will be on your file, and what they do.",
      },
    ],
  }),
  component: People,
});

/**
 * PLACEHOLDER PROFILES. Every person below is invented, and publishing them as
 * the firm's practitioners would misrepresent the practice — replace all eight
 * with the firm's real people (or delete the ones you do not need) before this
 * site goes live. There are deliberately no portraits: the cards draw initials,
 * so nothing here depends on a photograph existing.
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
    name: "A. Okonkwo",
    role: "Managing Partner",
    admitted: "Admitted 2009",
    focus: ["Corporate & Commercial", "Energy"],
    bio: "Leads the transactional practice. Acts on acquisitions, joint ventures and upstream assignments, and chairs the firm's conflicts review.",
  },
  {
    name: "B. Eze",
    role: "Partner, Disputes",
    admitted: "Admitted 2010",
    focus: ["Litigation", "Arbitration"],
    bio: "Appears in commercial disputes and arbitrations, and takes the firm's urgent applications. Writes the merits opinion on every contentious file.",
  },
  {
    name: "C. Adeyemi",
    role: "Partner, Property",
    admitted: "Admitted 2011",
    focus: ["Real Estate", "Construction"],
    bio: "Handles acquisitions, perfection of title and development documentation, including the searches that stop a purchase becoming a claim.",
  },
  {
    name: "D. Bello",
    role: "Counsel, Regulatory",
    admitted: "Admitted 2013",
    focus: ["Regulatory", "Compliance"],
    bio: "Advises on licensing, anti-money-laundering frameworks and regulatory investigations, and runs internal investigations for clients.",
  },
  {
    name: "E. Nwachukwu",
    role: "Senior Associate",
    admitted: "Admitted 2016",
    focus: ["Employment", "Litigation"],
    bio: "Drafts the contracts and handbooks employers are judged on, and defends tribunal claims when a process has gone wrong.",
  },
  {
    name: "F. Suleiman",
    role: "Senior Associate",
    admitted: "Admitted 2017",
    focus: ["Intellectual Property", "Technology"],
    bio: "Registers and enforces trade marks, and drafts the software, SaaS and licensing terms technology clients trade on.",
  },
  {
    name: "G. Idris",
    role: "Associate",
    admitted: "Admitted 2020",
    focus: ["Corporate", "Private Client"],
    bio: "Company formations, secretarial support, wills and estate administration, and the diligence behind the firm's transactions.",
  },
  {
    name: "H. Ogbonna",
    role: "Associate",
    admitted: "Admitted 2022",
    focus: ["Disputes", "Recovery"],
    bio: "Debt recovery and enforcement, and the document-heavy end of the disputes practice from pleadings through to trial bundles.",
  },
];

/** `A. Okonkwo` → `AO`. Initials rather than a stock portrait of a stranger. */
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
        eyebrow="People"
        title="The practitioners"
        crumb="People"
        lead="Three partners, counsel and five associates. The name at the top of your engagement letter is the name that answers for the matter."
      />

      <section className="relative bg-background py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 rule-grid opacity-60" />
        <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PEOPLE.map((person, index) => (
              <Reveal
                key={person.name}
                delay={(index % 4) * 80}
                className="card-lift group flex flex-col bg-card p-8"
              >
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center border border-border font-display text-xl text-foreground transition-colors group-hover:border-accent group-hover:text-accent"
                >
                  {initials(person.name)}
                </span>
                <h2 className="mt-8 text-2xl leading-tight">{person.name}</h2>
                <p className="mt-2 eyebrow text-accent">{person.role}</p>
                <p className="mt-4 text-sm text-muted-foreground">{person.admitted}</p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {person.bio}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2 border-t border-border pt-5">
                  {person.focus.map((area) => (
                    <li
                      key={area}
                      className="border border-border px-3 py-1 text-xs text-foreground/70"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment */}
      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32">
        <div className="pointer-events-none absolute inset-0 rule-grid-dark" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-10">
          <Reveal>
            <p className="eyebrow text-accent-ink">Working here</p>
            <WordRise
              text="We hire for judgement, not for volume"
              className="mt-8 text-4xl leading-[1.1] md:text-5xl"
            />
            <p className="mt-8 text-lg leading-relaxed text-ink-foreground/65">
              We take one or two practitioners a year and train them on real files from the first
              week. If that is the practice you want, send a CV and a piece of your own drafting.
            </p>
            <a
              href={`mailto:${settings.email}?subject=Application`}
              className="eyebrow mt-12 inline-flex items-center gap-4 border border-ink-foreground/40 px-9 py-4 transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              {settings.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
