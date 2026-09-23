-- 0008_contact_phone.sql — one telephone number, and no addresses.
--
-- The site no longer prints a street address anywhere, so the `offices` array
-- from 0005 and the single `address` from 0004 are both unread from here on.
-- Neither column is dropped: a deployment mid-rollout can still be serving the
-- previous bundle, which selects `*` and expects them, and a column is cheap.
--
-- Guarded, atomic and re-runnable like the rest.

begin;

alter table public.site_settings
  add column if not exists phone text not null default '+234 (0) 801 234 5678';

-- A row that predates the column, or one blanked by hand.
update public.site_settings
   set phone = '+234 (0) 801 234 5678'
 where coalesce(phone, '') = '';

commit;
