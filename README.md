# Magma Legal Practitioners — site, live chat and chambers dashboard

A TanStack Start (SSR) app on Vercel, backed by Supabase and Resend. The public
site carries a visitor chat widget, an enquiry form and a consultation booking
form; `/admin` is a staff dashboard for everything that comes in.

Five public pages:

| Route             | What it is                                                           |
| ----------------- | -------------------------------------------------------------------- |
| `/`               | the lockup on black, the firm in short, practice areas, how we work  |
| `/about`          | the firm, its approach, what it commits to, and its history          |
| `/practice-areas` | all eight areas with the work under each, and how the firm charges   |
| `/people`         | the practitioners, drawn as initials — there is no stock photography |
| `/contact`        | contact details, the enquiry form and the consultation booking form  |

`/admin` and `/auth` are the staff surfaces, and both are `noindex`.

> **Before launch, replace the placeholder content.** See
> [Placeholder content](#placeholder-content) — the addresses, phone numbers,
> the eight practitioner profiles and the four figures on the home page are all
> invented, and publishing them as the firm's own would misrepresent it.

## How it fits together

Five rules drive the rest of the design.

1. **Visitors authenticate for real.** The chat widget calls
   `supabase.auth.signInAnonymously()`, so every row a visitor creates carries a
   genuine `auth.uid()` and row level security can grant them their own chat and
   nothing else. There is no bearer-token scheme to forge, and no service-role
   key in the browser — ever.
2. **Form submissions never touch the database from the browser.** `enquiries`
   and `bookings` have no anon policy at all. Writes go through `submitForm`, a
   server function holding the service-role key, so a leaked anon key cannot
   stuff the inbox.
3. **Chat rows _are_ written from the browser**, under the visitor's own
   session, because RLS expresses "your own session" precisely. The server
   function is used only to send the staff notification.
4. **The browser's Supabase config is served at runtime** from the root route's
   loader, never inlined at build time behind a `VITE_` prefix.
   `SUPABASE_URL`, `VITE_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL` are
   accepted as equivalent (and the same for the anon key), so connecting
   Vercel's Supabase integration is enough on its own.
5. **Missing configuration is never silent.** The page renders a notice naming
   exactly which variables are unset and where to set them, and `/api/health`
   prints what the running server can actually see.

## Setup

### 1. Enable anonymous sign-ins

Supabase dashboard → **Authentication → Sign In / Providers → Anonymous
sign-ins** → on.

Without this the chat widget shows "Anonymous sign-ins are disabled" and nothing
else works in the widget. Enable it on **the project this deployment points
at**, which is not necessarily the one last opened in the dashboard — open
`/api/health` on the deployment to see which URL is actually in use.

### 2. Run the migrations

In the Supabase SQL editor, run in order:

| File                                           | Needed for                                                  |
| ---------------------------------------------- | ----------------------------------------------------------- |
| `supabase/migrations/0001_init.sql`            | everything: admins, enquiries, bookings, chat               |
| `supabase/migrations/0002_email.sql`           | optional — only to receive mail through the inbound webhook |
| `supabase/migrations/0003_site_settings.sql`   | the contact details the Settings tab edits                  |
| `supabase/migrations/0004_site_address.sql`    | superseded by 0005; run it anyway, in order                 |
| `supabase/migrations/0005_offices.sql`         | the firm's offices, one address and phone each              |
| `supabase/migrations/0006_schema_report.sql`   | lets `/api/health` and `verify.sql` name anything missing   |
| `supabase/migrations/0007_contact_details.sql` | only needed if 0003–0005 ran under the template's details   |

All seven are guarded, atomic and re-runnable: applying them twice is a no-op,
not an error, and an edit made from the dashboard survives a re-run.

The transaction around each one matters more than it looks. A policy is made
re-runnable by `drop policy if exists` followed by `create policy`, and that
leaves a window: a run that stops between the two, because the editor timed out
or a later statement failed, destroys a working policy and does not put it back.
Re-running a migration to repair the schema could then be the thing that breaks
it, and the symptom is the chat refusing every message with
`new row violates row-level security policy`. Inside a transaction the run
either fully applies or changes nothing, so a failed run is safe to just run
again once the cause is fixed.

Then check your work with `supabase/verify.sql`, which asserts every table,
column, policy, trigger and publication membership exists and raises one
exception listing anything missing.

It is worth re-running whenever something stops working for no obvious reason.
A missing policy is invisible from the outside: the tables are all there, the
server reads them happily with the service role, and the only symptom is a
visitor being refused with `new row violates row-level security policy`, which
reads like a bug in the widget. A missing _grant_ is worse, because it produces
`permission denied for table chat_messages`, which looks the same to a visitor
and to anyone reading the widget, and a check that only looked at policies said
everything was fine. Both are reported under `schema`.

### When the chat refuses to send

Three different faults make the widget say the same thing, and the service role
cannot see any of them, because it bypasses RLS. So ask the deployment to be a
visitor:

```
/api/health?probe=chat
```

It signs in anonymously with the browser's own key, opens a conversation, sends
a message, reads it back, and deletes what it wrote. Each step is reported, and
a failing one is named for what it actually is:

| What comes back                 | What to do                                                        |
| ------------------------------- | ----------------------------------------------------------------- |
| `sign in anonymously` fails     | Anonymous sign-ins are off. Authentication → Sign In / Providers. |
| a step reports `missing GRANT`  | Re-run `0001_init.sql`.                                           |
| a step reports `missing POLICY` | Re-run `0001_init.sql`; `schema` names which one.                 |
| a step reports an auth problem  | The visitor's token was rejected; not a schema fault.             |

It writes two rows and deletes them again, so it is opt-in rather than part of
the ordinary health check.

### 3. Put yourself on the admin list

Sign in once at `/auth` (or create the user under **Authentication → Users**),
then edit the single `admin_email` variable at the top of
`supabase/grant-admin.sql` and run it. It looks the address up in `auth.users`
and raises a clear exception if that login does not exist yet.

### 4. Set the environment variables

In Vercel → **Settings → Environment Variables** (Production _and_ Preview).

| Variable                    | Visibility          | Required | What it does                                                                                                                           |
| --------------------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `SUPABASE_URL`              | reaches the browser | yes      | Project URL. Also accepts `VITE_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`.                                                           |
| `SUPABASE_ANON_KEY`         | reaches the browser | yes      | Anon / publishable key. Also accepts `VITE_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or the `…PUBLISHABLE_KEY` spellings.   |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only**     | yes      | Writes `enquiries`, `bookings` and email rows. Never exposed to the browser. Also accepts `SUPABASE_SECRET_KEY` or `SERVICE_ROLE_KEY`. |
| `RESEND_API_KEY`            | **server only**     | no       | Sends notifications and email replies. Unset means mail is skipped and logged; nothing else breaks.                                    |
| `RESEND_WEBHOOK_SECRET`     | **server only**     | no       | `whsec_…` Svix signing secret for `/api/inbound-email`. Required only to receive mail.                                                 |
| `MAIL_DOMAIN`               | server only         | no       | One domain drives every address below.                                                                                                 |
| `MAIL_FROM`                 | server only         | no       | Defaults to `Magma Legal Practitioners <no-reply@$MAIL_DOMAIN>`.                                                                       |
| `MAIL_REPLY_TO`             | server only         | no       | Defaults to `hello@$MAIL_DOMAIN`.                                                                                                      |
| `MAIL_NOTIFY_TO`            | server only         | no       | Where visitor notifications land. Defaults to `MAIL_REPLY_TO`.                                                                         |

"Reaches the browser" means the value is delivered to the client at runtime by
the root route's loader — that is expected and safe for the anon key, which RLS
governs. Everything marked **server only** stays in `*.server.ts` modules,
which the bundler keeps out of the client build.

Confirm with `/api/health`: it lists every accepted spelling of anything
missing, prints which Supabase project is in use, and says whether the webhook
secret decodes to a usable key.

### 5. Deploy

`vercel.json` pins the install and build commands, so Vercel runs
`npm ci && npm run build` and picks up the Nitro Build Output API in
`.vercel/output`.

**Vercel deploys the repository's default branch.** Pushing to `main` when the
default branch is something else deploys nothing — check
Settings → Git → Production Branch.

## Brand assets

Everything the site draws is derived from two masters, which are the artwork as
it was supplied:

```
src/assets/brand/magma-on-black.png   the light lockup on black
src/assets/brand/magma-on-white.png   the dark lockup on white
```

Neither can go straight onto a page. The header is transparent over the hero, so
a black square behind the mark would show; the footer is near-black, so a white
one would. `scripts/brand-assets.py` keys the ground out of each master by
un-premultiplying against it — which keeps every anti-aliased edge's partial
coverage, and the crimson gradient in the pans — and writes:

```
src/assets/brand/lockup-light.webp    full lockup, light ink, for dark grounds
src/assets/brand/lockup-dark.webp     full lockup, dark ink, for pale grounds
src/assets/brand/mark-light.webp      scales only, light ink   (header, watermark)
src/assets/brand/mark-dark.webp       scales only, dark ink    (header, scrolled)
public/favicon.ico                    16/32/48, mark on ink
public/apple-touch-icon.png           180×180, mark on ink
public/link-card.png                  1200×630 og:image
```

Each artwork is only correct on the ground it was keyed from, which is how
`src/components/site/Logo.tsx` uses it: `tone="light"` on ink, `tone="dark"` on
paper. Lossless WebP, because a lossy edge shows as a grey halo against the
ground the artwork is supposed to disappear into.

To change the logo, replace a master and re-run the script. It needs Pillow,
which is deliberately not a project dependency — the output is committed:

```bash
pip install pillow && python3 scripts/brand-assets.py
```

`SPLIT_Y` in that file is the row where the lockup stops being the mark and
starts being the wordmark. A master with different proportions needs it moved.

## Placeholder content

Five things are invented and must be replaced before the site is public. None of
them needs a redeploy except the last two.

| What                                  | Where                                   |
| ------------------------------------- | --------------------------------------- |
| Email, website, office hours          | /admin → Settings, or `src/lib/site.ts` |
| Three office addresses and phones     | /admin → Settings, or `src/lib/site.ts` |
| Eight practitioner profiles           | `PEOPLE` in `src/routes/people.tsx`     |
| "14 years / 600+ matters / 22 people" | `FIGURES` in `src/routes/index.tsx`     |
| Firm history, 2012–2024               | `TIMELINE` in `src/routes/about.tsx`    |

The practice areas in `src/lib/practice-areas.ts` are real areas of practice
described generically; read them before publishing, because a firm that does not
do energy work should not list it. The footer's disclaimer and the notice above
the enquiry form are drafted for a jurisdiction that uses "solicitor"; the
firm's own wording is the one that matters.

## Editable contact details

The footer and contact page read `site_settings`, editable from the **Settings**
tab of `/admin` — no redeploy. `src/lib/site.ts` holds the fallbacks used when
the row or the table is missing, so the block never renders blank.

## Receiving email (optional)

1. Apply `supabase/migrations/0002_email.sql`.
2. In Resend, add an inbound route for your domain and point it at
   `https://<your-deployment>/api/inbound-email`.
3. Copy the endpoint's `whsec_…` signing secret into `RESEND_WEBHOOK_SECRET`.

The route verifies the Svix HMAC-SHA256 signature over the raw body before
parsing anything, ignores every event type other than `email.received`, and
dedupes on the Resend email id because inbound webhooks retry.

## Checking the mail settings

`/api/health` on the deployment reports which variables the running server can
read, which spelling supplied each one, and what `MAIL_FROM`, `MAIL_REPLY_TO`
and `MAIL_NOTIFY_TO` currently resolve to. It never prints a value.

For the parts a health check cannot see, whether the API key works, whether the
domain is verified and whether mail actually arrives, run:

```bash
node scripts/check-resend.mjs                 # read-only checks
node scripts/check-resend.mjs you@gmail.com   # and send one real email
```

It reads the same variable names the app reads, in the same order. The version
worth trusting takes them from the deployment rather than your shell:

```bash
vercel env pull .env.local
node --env-file=.env.local scripts/check-resend.mjs you@gmail.com
```

It resolves the addresses, catches the API key and the signing secret being
swapped (they sit on the same settings screen and neither is obviously the
other), asks Resend whether the domain is verified, warns when `MAIL_NOTIFY_TO`
is on `MAIL_DOMAIN` and could loop, and then sends. Nothing is written and no
secret is printed.

The code underneath is covered offline, with no key and no network:

```bash
node --experimental-strip-types --no-warnings scripts/resend.test.mts
node --experimental-strip-types --no-warnings scripts/inbound-email.test.mts
node --experimental-strip-types --no-warnings scripts/chat-errors.test.mts
```

Forty assertions over the real `sendEmail` and `verifyResendWebhook`: the
payload Resend receives, address resolution and its fallbacks, a rejected send
surfacing Resend's own message, and the inbound signature check accepting a
correctly signed delivery while rejecting a tampered body, a wrong secret, an
hour-old replay and missing headers. Requests to `api.resend.com` are answered
by a local stand-in.

> **Do not point a forwarding address on `MAIL_DOMAIN` back at your own inbound
> route.** Mail loops through the webhook until the sending quota is gone.

The route refuses to file mail it recognises as this deployment's own
notification, so a loop shows up as a warning in the log rather than as the
inbox filling with copies of itself. That is a guard, not a fix: point
`MAIL_NOTIFY_TO` at a mailbox outside `MAIL_DOMAIN`.

### When mail does not reach the dashboard

Mail that never appears has four possible stopping points, and the dashboard
cannot tell them apart. Work down the list; `/api/health` answers the last two.

1. **Resend never received it.** Receiving mail needs the domain's **MX records**
   pointing at Resend, which is separate from the TXT records that let you
   _send_. A domain verified for sending still delivers its incoming mail
   wherever its MX says, and that delivery succeeds, which is why nothing
   bounces. If Resend's webhook log shows no attempt at all for the time you
   sent, this is it.
2. **No inbound route, or the wrong URL.** The route must point at
   `https://<your-deployment>/api/inbound-email`.
3. **The signature is being rejected.** Resend's log shows `401`, and the
   response body names the cause: most often `RESEND_WEBHOOK_SECRET` holding an
   API key rather than the `whsec_` signing secret from the inbound endpoint.
4. **The write failed.** Resend's log shows `500` and the body names the
   relation, usually because `0002_email.sql` has not been applied.

There is a fifth, which looks exactly like the others from the dashboard: the
message **was** filed, but staff cannot read it. The webhook writes with the
service role, which bypasses RLS, so a missing `email_threads_admin_select` or
`email_messages_admin_select` policy leaves rows in the table that the dashboard
cannot see. `/api/health` counts with the service role too, so a non-zero count
beside an empty dashboard is this and nothing else; the `schema` section names
the policy, and re-running `0002_email.sql` restores it.

`/api/health` reports the rest under `email`: whether the tables exist, how many
messages have ever been filed, and when the last one arrived. A count of zero
with the tables present means nothing has ever reached the endpoint, which
narrows it to 1, 2 or 3.

To settle it in one call, post a correctly signed delivery straight at the
endpoint, bypassing Resend:

```bash
vercel env pull .env.local
node --env-file=.env.local scripts/test-inbound.mjs https://your-deployment.example.com
```

A `200` that then shows up in **/admin → Email** means the endpoint, the secret,
the database and the dashboard are all fine, and the only thing left is that
Resend is not calling the URL. Receiving mail and forwarding it to a webhook are
two separate settings there, and the first can work while the second is missing.
A `200` that does _not_ show up is the admin SELECT policy above. A `401` or
`500` names itself in the response.

There is one more way to get zeros with everything else green: Resend calling
the endpoint with an event this route does not file. The route saves
`email.received` and acknowledges everything else with a `200`, because delivery
receipts and bounces share the endpoint and must not be retried. So an inbound
event under a different name would show up in Resend's log as delivery after
delivery succeeding while nothing is ever saved. The route now recognises a
payload that carries a sender and a message body, and says so in the response
rather than dropping it quietly, so **read the response body of a successful
delivery in Resend's log** before concluding it worked. It will say
`{"ignored":true,...}` with a warning naming the event if that is what is
happening.

The handler itself is covered by `scripts/inbound-email.test.mts`, which drives
a correctly signed delivery through it with a stand-in for Supabase, so a
delivery that is arriving and signed correctly will be filed.

### A message that arrives with no body

Plenty of mail is HTML-only, so a message can file correctly and still read as
empty. `pickBody()` looks for the text under any of the names a provider might
use, nested or not, and falls back to a plain-text rendering of the HTML; the
dashboard does the same for rows already stored. Some providers hand over the whole RFC 822 message
instead of parsed fields, so `parseMime()` walks multipart boundaries far enough
to find the text/plain or text/html part, decoding base64 and quoted-printable
on the way.

Resend's inbound webhook does neither: it delivers the envelope only. The
observed payload carries `from`, `to`, `cc`, `bcc`, `subject`, `message_id`,
`created_at`, `attachments`, `received_for` and an `email_id`, and no body of
any kind. So the body is fetched from the API by that id, and only when the
payload really has nothing, so a provider that does send it costs no extra
request. The retrieval path is tried rather than hard-coded, and every attempt
is reported, because a wrong guess would fail the same silent way the missing
body did.

If a delivery genuinely has no body anywhere, the message files with a
description of the payload's shape in place of the text, listing the fields that
did arrive. That is deliberate: the shape is the one thing needed to fix it, and
putting it where the message would have been means whoever notices the blank
message can read why without server log access.

`scripts/email-body.test.mts` and `scripts/mime.test.mts` cover all of it.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build → .vercel/output
npm run typecheck  # tsc --noEmit
```

Put the same variables in a local `.env`. `/api/health` works in dev too.

## Layout

```
src/
  server.ts                  SSR entry + the /api/* route table
  start.ts                   global server-fn auth middleware + CSRF
  styles.css                 the palette, the type pairing and every utility
  assets/brand/              two masters + the four keyed artworks (see above)
  lib/
    site.ts                  the firm's identity, offices and contact fallbacks
    practice-areas.ts        the eight areas; the home page reads the first six
    public-config.ts         loadPublicConfig / setPublicConfig / isSupabaseConfigured
    supabase.ts              lazy Proxy around the browser client
    database.types.ts        row types, kept in step with the SQL
    api/
      _shared.server.ts      env, adminClient, sendEmail, requireAdmin, webhook verify
      forms.ts               submitForm  (enquiry | booking | chat)
      email.ts               sendEmailReply (admin only)
      inbound-email.server.ts  POST /api/inbound-email
      health.server.ts         GET  /api/health
  hooks/                     useVisitorChat, useAdminAuth, useFormSubmit, useRealtimeRows
  components/chat/           the floating visitor widget
  components/admin/          the five dashboard tabs
  components/site/           Header, Footer, Logo, PageHero and the reveals
  routes/                    file-based routes; /admin and /auth are noindex
supabase/
  migrations/0001_init.sql   admins, enquiries, bookings, chat, RLS, realtime
  migrations/0002_email.sql  email threads and messages (optional)
  grant-admin.sql            put a person on the staff list
  verify.sql                 assert the schema is what the app expects
scripts/
  brand-assets.py            regenerate every logo asset from the two masters
  check-resend.mjs           read-only mail checks, and one real send
  *.test.mts                 157 offline assertions over the mail and chat code
```

## If a deploy does not show your changes

Vercel keeps serving the **last successful** deployment when a build fails, so a
broken build looks exactly like "nothing was deployed". Check the deployment log
in Vercel first, then:

- **`npm ci` fails with "package.json and package-lock.json are not in sync".**
  This one is nasty, because it can pass locally and still fail on Vercel.
  Vercel's image runs **npm 11**; Node 22 bundles **npm 10**. npm 10 writes a
  lockfile carrying only the current platform's optional binaries
  (`@tailwindcss/oxide-*`, rolldown bindings), while npm 11 demands every
  platform variant and refuses to install without them.

  Always regenerate the lockfile with npm 11 — `rm -rf node_modules
package-lock.json && npx npm@11 install` — and verify with
  `npx npm@11 ci && npm run build`. A lockfile written by npm 11 is a superset
  that npm 10 also accepts; the reverse is not true. `.github/workflows/ci.yml`
  pins npm 11 and runs a strict `npm ci` so this fails in CI rather than in a
  deploy. `vercel.json` additionally falls back to `npm install`, so drift can
  never take the live site down again.

- **The site loads but `/api/health` 404s.** The build did not produce
  `.vercel/output` — check the build command in Vercel matches `vercel.json`.
- **Everything renders but chat and the dashboard are off.** That is
  configuration, not deployment: `/api/health` names the missing variables.

## What this build dropped from the template

The site came from an architecture-studio template, so the weight it carried was
mostly photography and unused UI:

- 130-odd project and testimonial photographs, plus the project record, the
  before/after slider, the project cover fallbacks and the two `/projects`
  routes.
- The whole `src/components/ui/` shadcn set (48 files). Nothing outside that
  directory imported any of it, which took **41 dependencies** with it — every
  Radix package, recharts, embla, vaul, cmdk, react-hook-form, date-fns,
  tailwind-merge and the rest. The lockfile went from 251 KB to 164 KB.
- The floating testimonial card, the hero shutter, the ken-burns and photo-scrim
  utilities, `docs/image-prompts*.md` (125 KB of generation prompts) and the
  duplicate `link-card.jpg`.

What stayed is the whole backend: Supabase auth and RLS, the anonymous-visitor
chat, `submitForm`, the Resend send and inbound webhook, `/api/health` and the
five-tab dashboard. The 157 offline assertions in `scripts/` still pass.

## Notes for future edits

- `package.json` sets `"sideEffects": false`, so a bare `import "./x"` for its
  side effect alone is tree-shaken away. Export a function and call it — see
  `installErrorCapture()` in `src/server.ts`.
- The global function middleware in `src/start.ts` runs for _every_ server
  function, including `loadPublicConfig`, which is what delivers the config.
  It is guarded with `if (!isSupabaseConfigured()) return next();` — keep it.
- Defining `src/start.ts` opts out of Start's automatic CSRF middleware, so it
  is re-added explicitly there.
- Avoid committing a lockfile produced by a hosted builder: it can pin a private
  registry the Vercel build cannot authenticate to.
