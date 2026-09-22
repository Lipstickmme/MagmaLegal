-- 0007_contact_details.sql — put the firm's own contact details in the row.
--
-- Only needed on a project that applied 0003–0005 while this repository still
-- carried the template's details. On a project migrated from scratch the seeds
-- are already correct and every statement below matches nothing.
--
-- Written to touch a value only while it is still the template's, exactly as
-- 0005 does with the hours, so anything edited from /admin → Settings survives
-- a re-run. Guarded, atomic and re-runnable like the rest.

begin;

update public.site_settings
   set email = 'chambers@magmalegal.com'
 where email = 'frontdesk@meastroarchitecture.com';

update public.site_settings
   set website = 'www.magmalegal.com'
 where website = 'www.meastroarchitecture.com';

update public.site_settings
   set hours = 'Monday to Friday, 08:30 to 18:00'
 where hours in ('Monday – Friday, 09:00 – 18:00', 'Monday to Friday, 09:00 to 18:00');

-- The offices are replaced as a set: a half-rewritten list would print one of
-- the firm's addresses beside two of the template's.
update public.site_settings
   set offices = '[
     {
       "label": "Lagos",
       "address": "Magma Chambers, 14 Idejo Street, Victoria Island, Lagos",
       "phone": "+234 800 000 0001"
     },
     {
       "label": "Abuja",
       "address": "2nd Floor, Trident House, Central Business District, Abuja",
       "phone": "+234 800 000 0002"
     },
     {
       "label": "Port Harcourt",
       "address": "Suite 7, Waterline Court, GRA Phase 2, Port Harcourt",
       "phone": "+234 800 000 0003"
     }
   ]'::jsonb
 where offices -> 0 ->> 'address' = '54-A Sager Dr, Rochester, NY 14607, United States';

-- The superseded single-address column from 0004, for the same reason.
update public.site_settings
   set address = 'Magma Chambers, 14 Idejo Street, Victoria Island, Lagos'
 where address = '54-A Sager Dr, Rochester, NY 14607, United States';

alter table public.site_settings alter column email set default 'chambers@magmalegal.com';
alter table public.site_settings alter column website set default 'www.magmalegal.com';
alter table public.site_settings alter column hours set default 'Monday to Friday, 08:30 to 18:00';
alter table public.site_settings
  alter column address set default 'Magma Chambers, 14 Idejo Street, Victoria Island, Lagos';

commit;
