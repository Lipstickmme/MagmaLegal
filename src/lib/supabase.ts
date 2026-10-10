import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getPublicConfig } from "./public-config";

// New-style Supabase keys (`sb_publishable_…`) are opaque strings, not bearer
// JWTs, so they must not be sent as an Authorization header.
function isOpaqueApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function apiKeyFetch(apiKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (isOpaqueApiKey(apiKey) && headers.get("Authorization") === `Bearer ${apiKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", apiKey);
    return fetch(input, { ...init, headers });
  };
}

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Supabase is not configured. Set SUPABASE_URL (or VITE_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_ANON_KEY (or VITE_SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY) in your deployment environment, then redeploy. Visit /api/health to see what the running server can read.",
    );
    this.name = "SupabaseNotConfiguredError";
  }
}

let client: SupabaseClient | undefined;
let visitorClient: SupabaseClient | undefined;

function build(storageKey?: string): SupabaseClient {
  const config = getPublicConfig();
  if (!config?.supabaseUrl || !config.supabaseAnonKey) throw new SupabaseNotConfiguredError();

  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    global: { fetch: apiKeyFetch(config.supabaseAnonKey) },
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: typeof window !== "undefined" && !storageKey,
      ...(storageKey ? { storageKey } : {}),
    },
  });
}

/**
 * A Proxy, not an eager client: `createClient` throws on an empty URL and this
 * module is in the SSR bundle, where it is imported long before the root
 * route's loader has delivered the config. Building on first property access
 * moves that moment to the first real call.
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    if (!client) client = build();
    return Reflect.get(client, prop, receiver);
  },
});

/**
 * The live chat's own client, with its own stored session.
 *
 * Sharing the staff client meant that signing in at /admin replaced the
 * visitor's anonymous session in the same browser. The conversation the
 * visitor had open then belonged to a different `auth.uid()`, and RLS refused
 * every message in it. A separate storage key keeps the two identities apart.
 */
export const visitorSupabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    if (!visitorClient) visitorClient = build("magma-visitor-chat");
    return Reflect.get(visitorClient, prop, receiver);
  },
});

/** Drops the memoised clients — used when the config arrives after a first read. */
export function resetSupabaseClient(): void {
  client = undefined;
  visitorClient = undefined;
}
