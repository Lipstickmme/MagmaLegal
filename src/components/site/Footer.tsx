import { Link } from "@tanstack/react-router";
import { Clock, Mail } from "lucide-react";

import { SITE } from "@/lib/site";
import { useSiteSettings } from "./SiteSettingsContext";
import { EmailText } from "./EmailText";
import { Logo } from "./Logo";

const SITEMAP = [
  { to: "/about", label: "The Firm" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/people", label: "Attorneys" },
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
              Business law, litigation and advisory. Transactions, regulatory matters and disputes,
              handled by the attorneys whose names are on them.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-accent-ink">Sitemap</p>
            <ul className="mt-7 space-y-4">
              {SITEMAP.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-accent-ink">Contact</p>
            <a
              href={`mailto:${settings.email}`}
              className="group mt-7 flex items-center gap-4 font-display text-2xl transition-colors hover:text-accent-ink lg:text-xl xl:text-3xl"
            >
              <Mail size={20} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
              <span className="break-words">
                <EmailText address={settings.email} />
              </span>
            </a>
            <p className="mt-6 flex items-center gap-3 text-sm text-ink-foreground/60">
              <Clock size={15} strokeWidth={1.5} aria-hidden="true" />
              {settings.hours}
            </p>
            <Link
              to="/contact"
              className="eyebrow mt-8 inline-flex border border-ink-foreground/35 px-6 py-3 transition-colors duration-300 hover:border-accent-ink hover:text-accent-ink"
            >
              Book a consultation
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ink-foreground/15 pt-10 md:flex-row md:items-start md:justify-between">
          {/* Standard US wording, but the rules differ by state (several require
              "Attorney Advertising" on a firm's site) — have the firm's own
              counsel settle the final text. */}
          <p className="max-w-3xl text-xs leading-relaxed text-ink-foreground/45">
            Attorney Advertising. The information on this website is for general information only
            and is not legal advice. Contacting us does not create an attorney–client relationship,
            and no engagement begins until we have accepted the matter in writing. Please do not
            send confidential information through this site. Prior results do not guarantee a
            similar outcome.
          </p>
          <p className="shrink-0 text-xs text-ink-foreground/45">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
