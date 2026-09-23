/**
 * The firm's practice areas, in the order they are presented.
 *
 * One record, two readers: the home page prints the first six as rows using
 * `n`, `title` and `blurb`, and /practice-areas prints all of them with `body`
 * and `work`. Adding an area here puts it on both, so there is nothing to keep
 * in step. `n` is stored rather than derived from the index because it is a
 * label on the page, and a renumbering should be a visible edit.
 */
export type PracticeArea = {
  slug: string;
  n: string;
  title: string;
  /** One line, for the row on the home page. */
  blurb: string;
  /** Two or three sentences, for the practice areas page. */
  body: string;
  /** The work itself, as a client would ask for it. */
  work: string[];
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "corporate-transactional",
    n: "01",
    title: "Corporate & Transactional",
    blurb:
      "Entity formation, ownership agreements, acquisitions and the contracts that hold them together.",
    body: "We represent businesses from formation through sale: LLC and corporate structuring, operating and shareholder agreements, financings, and the commercial contracts a company runs on. When a deal needs due diligence, our attorneys do it themselves rather than sending a checklist.",
    work: [
      "Entity formation and restructuring",
      "Operating, shareholder and buy-sell agreements",
      "Mergers, acquisitions and divestitures",
      "Commercial contracts and distribution",
      "Corporate governance and board advisory",
    ],
  },
  {
    slug: "litigation-dispute-resolution",
    n: "02",
    title: "Litigation & Dispute Resolution",
    blurb:
      "Business disputes in state and federal court, and candid advice on whether to be there at all.",
    body: "We litigate contract, partnership and business tort disputes in state and federal court, seek and oppose emergency relief, and arbitrate or mediate when that resolves a matter faster. Every case starts with a written assessment of the merits, the exposure and the likely cost, because a dispute worth settling is worth settling early.",
    work: [
      "Commercial and contract litigation",
      "Temporary restraining orders and injunctions",
      "Collections and judgment enforcement",
      "Arbitration and mediation",
      "Appeals",
    ],
  },
  {
    slug: "real-estate",
    n: "03",
    title: "Real Estate",
    blurb: "Acquisitions, leasing and development, with the title work that keeps a closing clean.",
    body: "We handle commercial acquisitions and sales, leasing for landlords and tenants, and development and construction agreements. Title and survey issues are resolved before closing, and we say so plainly when a problem cannot be cured.",
    work: [
      "Purchase and sale transactions",
      "Title review and title insurance",
      "Commercial leasing",
      "Development and construction agreements",
      "Zoning, land use and entitlements",
    ],
  },
  {
    slug: "energy-natural-resources",
    n: "04",
    title: "Energy & Natural Resources",
    blurb: "Oil and gas, renewables and power: leases, project agreements and permits.",
    body: "We advise operators, developers, landowners and investors on oil and gas leases, mineral rights, renewable energy projects and power purchase agreements, together with the permits and approvals each depends on. When a project turns contentious, the attorneys who drafted the agreements handle the dispute.",
    work: [
      "Oil and gas leases and mineral rights",
      "Renewable energy project development",
      "Power purchase agreements",
      "Environmental permitting and compliance",
      "Energy regulatory approvals and disputes",
    ],
  },
  {
    slug: "employment-labor",
    n: "05",
    title: "Employment & Labor",
    blurb:
      "Agreements, handbooks, investigations and separations, handled before they become lawsuits.",
    body: "We draft the agreements and policies an employer is judged on, advise through investigations, discipline and reductions in force, and defend claims when they are filed. For executives we negotiate employment and separation agreements and review restrictive covenants.",
    work: [
      "Employment agreements and handbooks",
      "Wage-and-hour compliance",
      "Discrimination and harassment claims",
      "Non-compete, non-solicitation and trade secrets",
      "Executive compensation and separation",
    ],
  },
  {
    slug: "regulatory-compliance",
    n: "06",
    title: "Regulatory & Compliance",
    blurb: "Licensing, investigations, privacy and the records a regulator will ask for first.",
    body: "We obtain and maintain licenses, build compliance programs a business can actually follow, and represent clients in government investigations and enforcement actions. Where an exposure already exists, we assess it before deciding what to disclose.",
    work: [
      "Licensing and permits",
      "Anti-money-laundering and know-your-customer programs",
      "Data privacy compliance",
      "Government investigations and enforcement",
      "Internal investigations",
    ],
  },
  {
    slug: "intellectual-property-technology",
    n: "07",
    title: "Intellectual Property & Technology",
    blurb:
      "Trademarks, copyrights and technology agreements for businesses whose value is intangible.",
    body: "We register and enforce trademarks and copyrights, draft software, SaaS and licensing agreements, and advise technology companies on the terms they do business on. Infringement starts with a demand letter, and goes to court only when the letter does not work.",
    work: [
      "Trademark and copyright registration",
      "Software, SaaS and licensing agreements",
      "Technology development and services contracts",
      "Infringement and enforcement",
      "Terms of service and privacy policies",
    ],
  },
  {
    slug: "trusts-estates",
    n: "08",
    title: "Trusts & Estates",
    blurb: "Wills, trusts, probate and succession planning for families and family businesses.",
    body: "We prepare wills and trusts, administer estates and trusts, and plan succession for owners whose business and family share a balance sheet. Estate and trust disputes are handled in house, which is a good reason to get the planning right.",
    work: [
      "Wills and revocable trusts",
      "Probate and estate administration",
      "Trust administration",
      "Business succession planning",
      "Estate and trust litigation",
    ],
  },
];
