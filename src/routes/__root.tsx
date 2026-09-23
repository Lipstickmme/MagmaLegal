import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { loadPublicConfig, setPublicConfig } from "../lib/public-config";
import { loadSiteSettings } from "../lib/site-settings";
import { SiteSettingsProvider } from "@/components/site/SiteSettingsContext";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollUp } from "@/components/site/ScrollUp";
import { ChatWidget } from "@/components/chat/ChatWidget";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // The browser's Supabase config is delivered at runtime, from here — never
  // inlined at build time behind a VITE_ prefix. One build, any project.
  loader: async () => {
    const [config, settings] = await Promise.all([loadPublicConfig(), loadSiteSettings()]);
    return { config, settings };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Magma Legal Practitioners" },
      {
        name: "description",
        content:
          "Magma Legal Practitioners — business law, litigation and advisory for companies, founders and families.",
      },
      { name: "author", content: "Magma Legal Practitioners" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/link-card.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/link-card.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500;600&family=Jost:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { config, settings } = Route.useLoaderData();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Set before any child renders, so anything reaching for `supabase` during
  // its first mount already has real values. Module scope, not context: the
  // Supabase proxy and the server-function middleware read it too, and neither
  // is a component.
  setPublicConfig(config);

  // A deployment without Supabase is a working brochure site, not a broken
  // one: visitors see no banner and no launcher for a chat that cannot
  // connect. What is missing is reported where staff look for it instead —
  // /api/health, and the notice on /admin and /auth.
  const backendReady = config.missing.length === 0;

  // Staff surfaces do not get the visitor widget either.
  const onStaffSurface = pathname.startsWith("/admin") || pathname.startsWith("/auth");
  const showChat = backendReady && !onStaffSurface;

  return (
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider value={settings}>
        <Header />
        <main>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <ScrollUp />
        {showChat ? <ChatWidget /> : null}
      </SiteSettingsProvider>
    </QueryClientProvider>
  );
}
