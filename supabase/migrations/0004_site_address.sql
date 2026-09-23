-- 0004_site_address.sql — a single address column, now unused.
--
-- The site prints no street address anywhere. This column is kept only so the
-- numbered chain stays intact for a project that already ran it, and it is
-- created empty. Guarded and re-runnable like the rest.
--
-- Wrapped in a transaction on purpose, like every migration here: a run either
-- fully applies or changes nothing at all, so a failed run is safe to repeat.

begin;

alter table public.site_settings
  add column if not exists address text not null default '';

commit;
