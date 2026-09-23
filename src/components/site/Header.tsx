import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { useSiteSettings } from "./SiteSettingsContext";
import { telHref } from "@/lib/site";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "The Firm" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/people", label: "People" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Two bars: a slim ink strip carrying the number and the hours, and the
 * navigation on paper beneath it. The strip collapses on scroll, so the number
 * is the first thing on the page and costs nothing once you are reading.
 *
 * The header is opaque from the first pixel. Every page opens on a pale ground
 * now, and a transparent header that has to guess its own ink colour from the
 * route is a bug waiting for the one page that opens differently.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on navigation, so the back button cannot leave it open over
  // a page it no longer belongs to.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`overflow-hidden bg-ink text-ink-foreground transition-[max-height,opacity] duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-10 max-w-[92rem] items-center justify-between px-5 text-xs md:px-10">
          <a
            href={telHref(settings.phone)}
            className="inline-flex items-center gap-2.5 transition-colors hover:text-accent-ink"
          >
            <Phone size={13} strokeWidth={1.8} className="text-accent-ink" aria-hidden="true" />
            <span className="font-medium tracking-wide">{settings.phone}</span>
          </a>
          <p className="hidden text-ink-foreground/60 sm:block">{settings.hours}</p>
          <a
            href={`mailto:${settings.email}`}
            className="hidden transition-colors hover:text-accent-ink md:block"
          >
            {settings.email}
          </a>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[92rem] items-center justify-between px-5 md:px-10">
          <Link to="/" aria-label="Magma Legal Practitioners, home">
            <Logo tone="dark" variant="mark" />
          </Link>

          {/* The resting state is an opacity, not a colour, so that the active
              colour below is the only `text-*` on the element. Two competing
              text colours resolve by stylesheet order rather than by which one
              is listed last, which is how an active link ends up unhighlighted. */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="eyebrow link-underline opacity-70 transition-all hover:opacity-100"
                activeProps={{ className: "opacity-100 text-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="eyebrow hidden bg-primary px-6 py-3.5 text-primary-foreground transition-colors hover:bg-accent lg:inline-flex"
            >
              Book a consultation
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center transition-colors hover:text-accent lg:hidden"
            >
              {open ? <X size={20} strokeWidth={1.4} /> : <Menu size={20} strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-border bg-background transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[92rem] flex-col px-5 py-4 md:px-10">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-b border-border/60 py-4 font-display text-2xl transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="eyebrow mt-6 inline-flex justify-center bg-primary px-6 py-4 text-primary-foreground transition-colors hover:bg-accent"
          >
            Book a consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
