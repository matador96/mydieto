/* Replace with your SQL commands */

CREATE TABLE
    "routes" (
        "id" SERIAL PRIMARY KEY,
        "driverId" INTEGER DEFAULT NULL,
        "status" VARCHAR(10) DEFAULT 'active' NOT NULL
    );

ALTER TABLE "routes" ADD COLUMN "createdAt" TIMESTAMPTZ;

ALTER TABLE "routes" ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "routes" ADD COLUMN "updatedAt" TIMESTAMPTZ;

ALTER TABLE "routes" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "leads" ADD "routeId" INTEGER NULL;

ALTER TABLE "leads" ADD "addressId" INTEGER NULL;

ALTER TABLE "leads" DROP COLUMN "sellerId";

ALTER TABLE "routes" ADD "suggestedBuyPrice" INTEGER DEFAULT 0;

ALTER TABLE "routes" ADD "commission" INTEGER DEFAULT 0;