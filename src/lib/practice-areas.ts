/**
 * The firm's practice areas, in the order they are presented.
 *
 * One record, two readers: the home page prints the first six as cards using
 * `n`, `title` and `blurb`, and /practice-areas prints all of them with `body`
 * and `work`. Adding an area here puts it on both, so there is nothing to keep
 * in step. `n` is stored rather than derived from the index because it is a
 * label on the page, and a renumbering should be a visible edit.
 */
export type PracticeArea = {
  slug: string;
  n: string;
  title: string;
  /** One line, for the card on the home page. */
  blurb: string;
  /** Two or three sentences, for the practice areas page. */
  body: string;
  /** The work itself, as a client would ask for it. */
  work: string[];
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "corporate-commercial",
    n: "01",
    title: "Corporate & Commercial",
    blurb:
      "Incorporation, shareholder arrangements, acquisitions and the agreements that hold them together.",
    body: "We act for companies from incorporation through to sale: constitutional documents, shareholder and joint venture arrangements, financing, and the commercial contracts a business runs on. Where a deal needs diligence, we run it ourselves rather than sending a questionnaire.",
    work: [
      "Company formation and restructuring",
      "Shareholder and joint venture agreements",
      "Mergers, acquisitions and disposals",
      "Commercial contracts and distribution",
      "Corporate governance and secretarial support",
    ],
  },
  {
    slug: "litigation-dispute-resolution",
    n: "02",
    title: "Litigation & Dispute Resolution",
    blurb:
      "Advocacy in court and arbitration, and the hard advice about whether to be there at all.",
    body: "We appear in commercial disputes, debt recovery, injunctions and appeals, and we arbitrate and mediate where that resolves a matter faster. Every file opens with a written view of the merits, the exposure and the likely cost, because a claim worth settling is worth settling early.",
    work: [
      "Commercial and contractual disputes",
      "Injunctions and urgent applications",
      "Debt recovery and enforcement",
      "Arbitration and mediation",
      "Appeals and judicial review",
    ],
  },
  {
    slug: "real-estate-property",
    n: "03",
    title: "Real Estate & Property",
    blurb: "Title, leases, development and the searches that stop a purchase becoming a dispute.",
    body: "We handle acquisitions and disposals, perfection of title, leases and tenancy arrangements, and development and construction documentation. Title work is done before the money moves, and we say so when a title cannot be made good.",
    work: [
      "Sale, purchase and perfection of title",
      "Leases, tenancies and service charge disputes",
      "Development and construction agreements",
      "Mortgages and security over land",
      "Land use, planning and compulsory acquisition",
    ],
  },
  {
    slug: "energy-natural-resources",
    n: "04",
    title: "Energy & Natural Resources",
    blurb: "Upstream and power transactions, host community arrangements and regulatory approvals.",
    body: "We advise operators, service companies and investors on licensing, farm-ins and farm-outs, power purchase and supply arrangements, and the consents each of those depends on. Contentious work in the sector is run by the same lawyers who drafted the contract.",
    work: [
      "Licensing, assignments, farm-ins and farm-outs",
      "Power purchase and off-take agreements",
      "Oilfield and drilling services contracts",
      "Environmental and host community compliance",
      "Sector regulatory approvals and disputes",
    ],
  },
  {
    slug: "employment-labour",
    n: "05",
    title: "Employment & Labour",
    blurb: "Contracts, handbooks, disciplinaries and exits, handled before they reach a tribunal.",
    body: "We draft the contracts and policies an employer is judged on, advise through disciplinary and redundancy processes, and defend claims when they come. For employees and executives we review terms, negotiate exits and pursue wrongful dismissal claims.",
    work: [
      "Employment contracts and staff handbooks",
      "Disciplinary, grievance and redundancy process",
      "Executive appointments and exit negotiation",
      "Restraint of trade and confidentiality",
      "Industrial relations and tribunal claims",
    ],
  },
  {
    slug: "regulatory-compliance",
    n: "06",
    title: "Regulatory & Compliance",
    blurb:
      "Licensing, investigations, data protection and the paperwork a regulator will ask for first.",
    body: "We obtain and maintain sector licences, build compliance programmes that a business can actually follow, and represent clients in regulatory investigations and enforcement. Where an exposure already exists, we quantify it before deciding what to disclose.",
    work: [
      "Licence applications and renewals",
      "Anti-money-laundering and know-your-customer frameworks",
      "Data protection and privacy compliance",
      "Regulatory investigations and enforcement",
      "Internal investigations and whistleblowing",
    ],
  },
  {
    slug: "intellectual-property-technology",
    n: "07",
    title: "Intellectual Property & Technology",
    blurb:
      "Trade marks, software and licensing agreements for businesses whose value is intangible.",
    body: "We register and defend trade marks, draft software, SaaS and licensing agreements, and advise technology businesses on the terms they trade on. Infringement is met with the letter first and proceedings only where the letter fails.",
    work: [
      "Trade mark, design and copyright registration",
      "Software, SaaS and licensing agreements",
      "Technology transfer and development contracts",
      "Infringement, passing off and enforcement",
      "Platform terms and consumer compliance",
    ],
  },
  {
    slug: "private-client-estates",
    n: "08",
    title: "Private Client & Estates",
    blurb: "Wills, probate, trusts and succession planning for families and family businesses.",
    body: "We prepare wills and trusts, administer estates, and plan succession for owners whose business and family are the same balance sheet. Contentious probate is handled in-house, which is a reason to get the planning right.",
    work: [
      "Wills, codicils and estate planning",
      "Probate and letters of administration",
      "Trusts and family settlements",
      "Succession planning for family businesses",
      "Contentious probate and estate disputes",
    ],
  },
];
