CREATE TYPE leads_status AS ENUM (
    'active',
    'inwork',
    'finished',
    'inauction',
    'wininauction',
    'blocked'
);

ALTER TABLE "leads"
    ALTER COLUMN "status" DROP DEFAULT,
    ALTER COLUMN "status"
        SET DATA TYPE leads_status
        USING "status"::text::leads_status,
    ALTER COLUMN "status" SET DEFAULT 'active';