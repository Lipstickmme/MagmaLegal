/**
 * Defaults for the firm's identity and contact details.
 *
 * Contact rows are editable from the dashboard (Settings tab) and stored in
 * `site_settings`; these values are the fallback used when that row is absent
 * or the database is unreachable, so the footer never renders blank.
 *
 * PLACEHOLDERS. Every address, phone number and email below is made up — the
 * shape is right, the details are not. Change them in /admin → Settings, which
 * writes `site_settings` and needs no redeploy; edit this file too if you want
 * the same values to survive a database that has not been migrated yet.
 */
export const SITE = {
  name: "Magma Legal Practitioners",
  shortName: "Magma",
  domain: "magmalegal.com",
  website: "www.magmalegal.com",
  email: "chambers@magmalegal.com",
  hours: "Monday to Friday, 08:30 to 18:00",
} as const;

/** One office. `label` is the city, which is how people refer to them. */
export type Office = {
  label: string;
  address: string;
  phone: string;
};

export const DEFAULT_OFFICES: Office[] = [
  {
    label: "Lagos",
    address: "Magma Chambers, 14 Idejo Street, Victoria Island, Lagos",
    phone: "+234 800 000 0001",
  },
  {
    label: "Abuja",
    address: "2nd Floor, Trident House, Central Business District, Abuja",
    phone: "+234 800 000 0002",
  },
  {
    label: "Port Harcourt",
    address: "Suite 7, Waterline Court, GRA Phase 2, Port Harcourt",
    phone: "+234 800 000 0003",
  },
];

/** The editable subset. Keys match the columns of `site_settings`. */
export type SiteSettings = {
  email: string;
  website: string;
  hours: string;
  offices: Office[];
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  email: SITE.email,
  website: SITE.website,
  hours: SITE.hours,
  offices: DEFAULT_OFFICES,
};

/**
 * Coerce whatever came back from the `offices` jsonb column into a list we can
 * render. Anything malformed, or a column that predates the migration, falls
 * back to the offices above rather than leaving the footer without a single
 * address on it.
 */
export function parseOffices(value: unknown): Office[] {
  if (!Array.isArray(value)) return DEFAULT_OFFICES;

  const offices = value
    .map((entry): Office | null => {
      if (!entry || typeof entry !== "object") return null;
      const row = entry as Record<string, unknown>;
      const address = String(row["address"] ?? "").trim();
      if (!address) return null;
      return {
        label: String(row["label"] ?? "").trim() || "Office",
        address,
        phone: String(row["phone"] ?? "").trim(),
      };
    })
    .filter((office): office is Office => office !== null);

  return offices.length > 0 ? offices : DEFAULT_OFFICES;
}

/** The firm's first listed address, where one line is all there is room for. */
export function primaryOffice(settings: SiteSettings): Office {
  return settings.offices[0] ?? DEFAULT_OFFICES[0]!;
}

/**
 * The rows that are the same wherever you are. The offices print separately,
 * one block each, because each has its own phone number.
 */
export function contactDetails(settings: SiteSettings) {
  return [
    { label: "Website", value: settings.website },
    { label: "Email Address", value: settings.email },
    { label: "Office Hours", value: settings.hours },
  ];
}

/** `+234 800 000 0001` → `+2348000000001`, which is what a dialler wants. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
