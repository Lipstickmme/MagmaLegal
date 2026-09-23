-- 0005_offices.sql — an offices list, now unused.
--
-- The site prints no addresses and no telephone numbers, so nothing reads this
-- column. It stays because /api/health's schema report (0006) names it as part
-- of the expected shape, and a missing column there reads as a broken install.
-- It is created as an empty list. Guarded and re-runnable like the rest.
--
-- Wrapped in a transaction on purpose, like every migration here: a run either
-- fully applies or changes nothing at all, so a failed run is safe to repeat.

begin;

alter table public.site_settings
  add column if not exists offices jsonb not null default '[]'::jsonb;

-- Must be a JSON array, which is what the schema report and any future reader
-- expect; a constraint is cheaper than discovering it later.
alter table public.site_settings drop constraint if exists site_settings_offices_is_array;
alter table public.site_settings
  add constraint site_settings_offices_is_array
  check (jsonb_typeof(offices) = 'array');

-- An earlier revision of 0003 seeded the hours in a different format. Only a
-- row still carrying one of those exact strings is touched, so an edit made
-- from the dashboard survives.
update public.site_settings
   set hours = 'Monday to Friday, 8:30 a.m. to 6 p.m.'
 where hours in ('Monday – Friday, 09:00 – 18:00', 'Monday to Friday, 09:00 to 18:00');

alter table public.site_settings
  alter column hours set default 'Monday to Friday, 8:30 a.m. to 6 p.m.';

commit;
