/**
 * Defaults for the firm's identity and contact details.
 *
 * Contact rows are editable from the dashboard (Settings tab) and stored in
 * `site_settings`; these values are the fallback used when that row is absent
 * or the database is unreachable, so the footer never renders blank.
 *
 * PLACEHOLDERS. The phone number, email and domain below are made up — the
 * shape is right, the details are not. Change them in /admin → Settings, which
 * writes `site_settings` and needs no redeploy; edit this file too if you want
 * the same values to survive a database that has not been migrated yet.
 *
 * There is deliberately no street address anywhere on the site. The firm is
 * reached by phone and by email, and a page that prints an address invites
 * people to turn up at one.
 */
export const SITE = {
  name: "Magma Legal Practitioners",
  shortName: "Magma",
  domain: "magmalegal.com",
  website: "www.magmalegal.com",
  email: "chambers@magmalegal.com",
  phone: "+234 (0) 801 234 5678",
  hours: "Monday to Friday, 08:30 to 18:00",
} as const;

/** The editable subset. Keys match the columns of `site_settings`. */
export type SiteSettings = {
  email: string;
  website: string;
  phone: string;
  hours: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  email: SITE.email,
  website: SITE.website,
  phone: SITE.phone,
  hours: SITE.hours,
};

/**
 * The rows printed in the footer and on the contact page, in the order
 * somebody with a problem would want them: the number first.
 */
export function contactDetails(settings: SiteSettings) {
  return [
    { label: "Telephone", value: settings.phone, href: telHref(settings.phone) },
    { label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { label: "Office hours", value: settings.hours },
    { label: "Website", value: settings.website },
  ];
}

/** `+234 (0) 801 234 5678` → `+2348012345678`, which is what a dialler wants. */
export function telHref(phone: string): string {
  // The (0) is a national trunk prefix: correct in print, wrong after a country
  // code, and a dialler that keeps it calls the wrong number or nothing at all.
  return `tel:${phone.replace(/\(0\)/g, "").replace(/[^\d+]/g, "")}`;
}
