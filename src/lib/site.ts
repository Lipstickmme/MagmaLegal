/**
 * Defaults for the firm's identity and contact details.
 *
 * Contact rows are editable from the dashboard (Settings tab) and stored in
 * `site_settings`; these values are the fallback used when that row is absent
 * or the database is unreachable, so the footer never renders blank.
 *
 * Change the editable ones in /admin → Settings, which writes `site_settings`
 * and needs no redeploy; edit this file too if you want the same values to
 * survive a database that has not been migrated yet.
 *
 * There is deliberately no street address and no telephone number anywhere on
 * the site. The firm is reached by email, the contact forms and live chat.
 */
export const SITE = {
  name: "Magma Legal Practitioners",
  shortName: "Magma",
  domain: "magmalegalchambers.com",
  website: "www.magmalegalchambers.com",
  /** The public origin: canonical links, Open Graph and the sitemap use it. */
  url: "https://www.magmalegalchambers.com",
  email: "contact@magmalegalchambers.com",
  hours: "Monday to Friday, 8:30 a.m. to 6 p.m.",
} as const;

/** The editable subset. Keys match the columns of `site_settings`. */
export type SiteSettings = {
  email: string;
  website: string;
  hours: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  email: SITE.email,
  website: SITE.website,
  hours: SITE.hours,
};

/** `"/about"` → `"https://www.magmalegalchambers.com/about"`. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).href;
}

/** The canonical link and `og:url` for one public page, for a route's `head`. */
export function canonical(path: string) {
  const href = absoluteUrl(path);
  return {
    link: { rel: "canonical", href },
    meta: { property: "og:url", content: href },
  };
}
