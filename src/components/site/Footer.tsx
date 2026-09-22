import { Link } from "@tanstack/react-router";

import { contactDetails, SITE, telHref } from "@/lib/site";
import { useSiteSettings } from "./SiteSettingsContext";
import { Logo } from "./Logo";

export function Footer() {
  const settings = useSiteSettings();
  const details = contactDetails(settings);

  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 rule-grid-dark" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-ink/60" />
      <div className="relative mx-auto max-w-[92rem] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr_1fr]">
          <h2 className="select-none font-display text-[22vw] leading-[0.8] text-ink-foreground/10 lg:text-[8rem] lg:[writing-mode:vertical-rl]">
            Counsel
          </h2>

          <dl className="space-y-9">
            {details.map((detail) => (
              <div key={detail.label}>
                <dt className="text-sm text-accent-ink">{detail.label}</dt>
                <dd className="mt-2 text-lg text-ink-foreground/90">
                  {detail.label === "Email Address" ? (
                    <a
                      href={`mailto:${detail.value}`}
                      className="link-underline transition-colors hover:text-accent-ink"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col justify-end gap-8">
            <div>
              <Logo tone="light" />
            </div>
            <nav className="flex flex-wrap gap-6 eyebrow text-ink-foreground/60">
              <Link to="/about" className="transition-colors hover:text-accent-ink">
                The Firm
              </Link>
              <Link to="/practice-areas" className="transition-colors hover:text-accent-ink">
                Practice Areas
              </Link>
              <Link to="/people" className="transition-colors hover:text-accent-ink">
                People
              </Link>
            </nav>
            <p className="max-w-xs text-sm text-ink-foreground/50">
              {SITE.name} {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>

        {/* Offices. Each one prints its own phone, so nobody has to guess which
            office a single switchboard number belongs to. */}
        <div className="mt-20 border-t border-ink-foreground/15 pt-12">
          <p className="eyebrow text-accent-ink">Offices</p>
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {settings.offices.map((office) => (
              <li key={`${office.label}-${office.address}`}>
                <p className="font-display text-2xl text-ink-foreground">{office.label}</p>
                <address className="mt-3 max-w-xs text-sm leading-relaxed text-ink-foreground/70 not-italic">
                  {office.address}
                </address>
                {office.phone ? (
                  <a
                    href={telHref(office.phone)}
                    className="-mx-1 mt-2 inline-block px-1 py-1.5 text-sm text-ink-foreground/90 transition-colors hover:text-accent-ink"
                  >
                    {office.phone}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* Every jurisdiction words this differently, and a firm's own wording
            is the one that matters — treat this as the placeholder it is. */}
        <p className="mt-16 max-w-3xl border-t border-ink-foreground/15 pt-8 text-xs leading-relaxed text-ink-foreground/45">
          Nothing on this website is legal advice, and reading it or writing to us does not create a
          solicitor–client relationship. No engagement begins until we have accepted the matter in
          writing. Correspondence sent through this site is not privileged.
        </p>
      </div>
    </footer>
  );
}
