ALTER TABLE "categories" ADD FOREIGN KEY ("parent_id") REFERENCES "categories" ("id") DEFAULT NULL;

ALTER TABLE IF EXISTS public.categories
    ADD COLUMN stock character varying;

ALTER TABLE IF EXISTS public.categories
    ADD COLUMN status character varying;

ALTER TABLE IF EXISTS public.categories
    ADD COLUMN description text;

ALTER TABLE IF EXISTS public.categories
    ADD COLUMN created_at date;

ALTER TABLE IF EXISTS public.categories
    ADD COLUMN updated_at date;

ALTER TABLE IF EXISTS public.categories
    ALTER COLUMN cat_name SET NOT NULL;

ALTER TABLE IF EXISTS public.categories
    ALTER COLUMN stock SET NOT NULL;

ALTER TABLE IF EXISTS public.categories
    ALTER COLUMN status SET NOT NULL;

ALTER TABLE IF EXISTS public.categories
    ALTER COLUMN created_at SET NOT NULL;


ALTER TABLE IF EXISTS public.users DROP COLUMN IF EXISTS salt;

ALTER TABLE IF EXISTS public.users DROP COLUMN IF EXISTS created_at;

ALTER TABLE IF EXISTS public.users
    RENAME full_name TO first_name;

ALTER TABLE IF EXISTS public.users
    ADD COLUMN last_name character varying;

ALTER TABLE IF EXISTS public.users
    ADD COLUMN phone_number character varying;

ALTER TABLE IF EXISTS public.users
    ADD COLUMN created_at date NOT NULL;

ALTER TABLE IF EXISTS public.users
    ADD COLUMN updated_at date;    

ALTER TYPE user_role ADD VALUE 'Bulk Customers' AFTER 'ADMIN';
ALTER TYPE user_role ADD VALUE 'Corporate Customers' AFTER 'Bulk Customers';
ALTER TYPE user_role ADD VALUE 'Retail Customers' AFTER 'Corporate Customers';
