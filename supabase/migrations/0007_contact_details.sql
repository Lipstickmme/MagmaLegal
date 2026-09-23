-- 0007_contact_details.sql — bring an older row up to the firm's details.
--
-- Only does anything on a project that ran the original template's 0003–0005
-- before this repository was rebranded. On a project migrated from scratch
-- every statement below matches nothing.
--
-- Each value is touched only while it still holds a seeded string, exactly as
-- 0005 does with the hours, so anything edited from /admin → Settings survives
-- a re-run. Guarded, atomic and re-runnable like the rest.

begin;

update public.site_settings
   set email = 'contact@magmalegal.com'
 where email = 'frontdesk@meastroarchitecture.com';

update public.site_settings
   set website = 'www.magmalegal.com'
 where website = 'www.meastroarchitecture.com';

update public.site_settings
   set hours = 'Monday to Friday, 8:30 a.m. to 6 p.m.'
 where hours in ('Monday – Friday, 09:00 – 18:00', 'Monday to Friday, 09:00 to 18:00');

-- Seeded addresses are cleared rather than replaced: the site prints none.
update public.site_settings
   set offices = '[]'::jsonb
 where jsonb_array_length(offices) > 0
   and offices -> 0 ->> 'address' = '54-A Sager Dr, Rochester, NY 14607, United States';

update public.site_settings
   set address = ''
 where address = '54-A Sager Dr, Rochester, NY 14607, United States';

alter table public.site_settings alter column email set default 'contact@magmalegal.com';
alter table public.site_settings alter column website set default 'www.magmalegal.com';
alter table public.site_settings alter column hours set default 'Monday to Friday, 8:30 a.m. to 6 p.m.';
alter table public.site_settings alter column address set default '';
alter table public.site_settings alter column offices set default '[]'::jsonb;

commit;
