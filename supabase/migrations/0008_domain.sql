-- 0008_domain.sql — move the contact row to the firm's real domain.
--
-- A project that ran 0003 before the domain was settled holds
-- contact@magmalegal.com and www.magmalegal.com. Only those exact seeded
-- strings are rewritten, so anything edited from /admin → Settings survives.
-- Guarded, atomic and re-runnable like the rest.

begin;

update public.site_settings
   set email = 'contact@magmalegalchambers.com'
 where email = 'contact@magmalegal.com';

update public.site_settings
   set website = 'www.magmalegalchambers.com'
 where website = 'www.magmalegal.com';

alter table public.site_settings alter column email set default 'contact@magmalegalchambers.com';
alter table public.site_settings alter column website set default 'www.magmalegalchambers.com';

commit;
