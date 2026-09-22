import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "The Firm" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/people", label: "People" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Every public page opens on a black band, so the header can float
  // transparently over it. The staff surfaces open on paper, where a
  // transparent header renders near-white text on near-white — so pin it solid.
  const onPaleSurface = pathname.startsWith("/admin") || pathname.startsWith("/auth");
  const solid = scrolled || open || onPaleSurface;

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-border bg-background/92 text-foreground backdrop-blur-xl"
          : "bg-transparent text-ink-foreground"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[92rem] items-center justify-between px-5 md:px-10">
        <Link to="/" className="text-current" aria-label="Magma Legal Practitioners, home">
          <Logo tone={solid ? "dark" : "light"} variant="mark" />
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
              className="eyebrow link-underline opacity-75 transition-all hover:opacity-100"
              activeProps={{
                className: `opacity-100 ${solid ? "text-accent" : "text-accent-ink"}`,
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className={`eyebrow hidden px-6 py-3 transition-colors lg:inline-flex ${
              solid
                ? "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                : "border border-ink-foreground/40 text-ink-foreground hover:border-accent-ink hover:text-accent-ink"
            }`}
          >
            Book a consultation
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center text-current transition-colors hover:text-accent-ink lg:hidden"
          >
            {open ? <X size={20} strokeWidth={1.4} /> : <Menu size={20} strokeWidth={1.4} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
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
