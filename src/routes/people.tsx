import { createFileRoute } from "@tanstack/react-router";

import counselDesk from "@/assets/photos/counsel-desk.webp";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { WordRise } from "@/components/site/WordRise";

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
      { property: "og:description", content: "Who will be on your file, and what they do." },
    ],
  }),
  component: People,
});

/**
 * PLACEHOLDER PROFILES. Every person below is invented, and publishing them as
 * the firm's practitioners would misrepresent the practice — replace all eight
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
    name: "A. Okonkwo",
    role: "Managing Partner",
    admitted: "2009",
    focus: ["Corporate & Commercial", "Energy"],
    bio: "Leads the transactional practice. Acts on acquisitions, joint ventures and upstream assignments, and chairs the firm's conflicts review.",
  },
  {
    name: "B. Eze",
    role: "Partner, Disputes",
    admitted: "2010",
    focus: ["Litigation", "Arbitration"],
    bio: "Appears in commercial disputes and arbitrations, and takes the firm's urgent applications. Writes the merits opinion on every contentious file.",
  },
  {
    name: "C. Adeyemi",
    role: "Partner, Property",
    admitted: "2011",
    focus: ["Real Estate", "Construction"],
    bio: "Handles acquisitions, perfection of title and development documentation, including the searches that stop a purchase becoming a claim.",
  },
  {
    name: "D. Bello",
    role: "Counsel, Regulatory",
    admitted: "2013",
    focus: ["Regulatory", "Compliance"],
    bio: "Advises on licensing, anti-money-laundering frameworks and regulatory investigations, and runs internal investigations for clients.",
  },
  {
    name: "E. Nwachukwu",
    role: "Senior Associate",
    admitted: "2016",
    focus: ["Employment", "Litigation"],
    bio: "Drafts the contracts and handbooks employers are judged on, and defends tribunal claims when a process has gone wrong.",
  },
  {
    name: "F. Suleiman",
    role: "Senior Associate",
    admitted: "2017",
    focus: ["Intellectual Property", "Technology"],
    bio: "Registers and enforces trade marks, and drafts the software, SaaS and licensing terms technology clients trade on.",
  },
  {
    name: "G. Idris",
    role: "Associate",
    admitted: "2020",
    focus: ["Corporate", "Private Client"],
    bio: "Company formations, secretarial support, wills and estate administration, and the diligence behind the firm's transactions.",
  },
  {
    name: "H. Ogbonna",
    role: "Associate",
    admitted: "2022",
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

      {/* One photograph, with the thing it is there to say printed under it. */}
      <section className="relative">
        <img
          src={counselDesk}
          alt="A partner of the firm at her desk"
          width={1344}
          height={576}
          className="h-[18rem] w-full object-cover md:h-[30rem]"
        />
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <Reveal className="-mt-px border-b border-l-2 border-r border-t border-border border-l-accent bg-card p-8 md:-mt-20 md:max-w-2xl md:p-12">
            <p className="font-display text-2xl leading-snug md:text-[1.75rem]">
              “Every file has a partner's name on it. If you cannot reach that person, you have not
              been given the right number.”
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
                delay={index * 40}
                className="group grid items-start gap-x-8 gap-y-4 border-b border-border py-8 transition-colors hover:bg-accent-wash md:grid-cols-[4.5rem_14rem_1fr_11rem] md:py-9"
              >
                <span
                  aria-hidden="true"
                  className="flex h-[4.5rem] w-[4.5rem] items-center justify-center border border-border font-display text-xl transition-colors group-hover:border-accent group-hover:text-accent"
                >
                  {initials(person.name)}
                </span>
                <div>
                  <h2 className="text-2xl leading-tight">{person.name}</h2>
                  <p className="mt-2 eyebrow text-accent">{person.role}</p>
                </div>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">{person.bio}</p>
                <div className="md:text-right">
                  <p className="eyebrow text-muted-foreground">Admitted {person.admitted}</p>
                  <ul className="mt-3 flex flex-wrap gap-2 md:justify-end">
                    {person.focus.map((area) => (
                      <li key={area} className="border border-border px-2.5 py-1 text-xs">
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

      {/* Recruitment */}
      <section className="border-t border-border bg-accent-wash py-20 md:py-28">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 md:grid-cols-[1.2fr_1fr] md:items-center md:px-10">
          <Reveal>
            <p className="eyebrow text-accent">Working here</p>
            <WordRise
              text="We hire for judgement, not for volume"
              className="mt-5 text-4xl leading-[1.1] md:text-5xl"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We take one or two practitioners a year and train them on real files from the first
              week. If that is the practice you want, send a CV and a piece of your own drafting.
            </p>
            <a
              href={`mailto:${settings.email}?subject=Application`}
              className="eyebrow mt-8 inline-flex items-center gap-4 bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-accent"
            >
              {settings.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
