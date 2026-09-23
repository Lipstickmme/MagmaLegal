import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

import { SITE, telHref } from "@/lib/site";
import { useSiteSettings } from "./SiteSettingsContext";
import { Logo } from "./Logo";

const SITEMAP = [
  { to: "/about", label: "The Firm" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/people", label: "People" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const settings = useSiteSettings();

  return (
    <footer className="bg-ink text-ink-foreground">
      <span className="block h-px bg-accent-ink/50" />
      <div className="mx-auto max-w-[92rem] px-5 py-20 md:px-10 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <Logo tone="light" className="h-20 w-auto md:h-24" />
            <p className="mt-8 max-w-sm leading-relaxed text-ink-foreground/60">
              Commercial counsel, advocacy and advisory. Transactions, regulatory matters and
              disputes, run by the people whose names are on them.
            </p>
          </div>

          <nav>
            <p className="eyebrow text-accent-ink">Sitemap</p>
            <ul className="mt-7 space-y-4">
              {SITEMAP.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-accent-ink">Speak to us</p>
            <a
              href={telHref(settings.phone)}
              className="mt-7 flex items-center gap-4 font-display text-3xl transition-colors hover:text-accent-ink md:text-[2.5rem]"
            >
              <Phone size={22} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
              {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="mt-6 inline-flex items-center gap-3 text-ink-foreground/80 transition-colors hover:text-accent-ink"
            >
              <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
              {settings.email}
            </a>
            <p className="mt-6 text-sm text-ink-foreground/55">{settings.hours}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ink-foreground/15 pt-10 md:flex-row md:items-start md:justify-between">
          {/* Every jurisdiction words this differently, and a firm's own wording
              is the one that matters — treat this as the placeholder it is. */}
          <p className="max-w-3xl text-xs leading-relaxed text-ink-foreground/45">
            Nothing on this website is legal advice, and reading it or writing to us does not create
            a solicitor–client relationship. No engagement begins until we have accepted the matter
            in writing. Correspondence sent through this site is not privileged.
          </p>
          <p className="shrink-0 text-xs text-ink-foreground/45">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
