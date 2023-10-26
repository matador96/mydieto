/* Replace with your SQL commands */

CREATE TABLE
    "sellerAddresses" (
        "id" SERIAL PRIMARY KEY,
        "sellerId" INTEGER,
        "districtId" INTEGER,
        "address" VARCHAR(200),
        "comment" TEXT
    );

ALTER TABLE "sellerAddresses" ADD COLUMN "createdAt" TIMESTAMPTZ;

ALTER TABLE "sellerAddresses"
ALTER COLUMN "createdAt"
SET DEFAULT NOW();

ALTER TABLE "sellerAddresses" ADD COLUMN "updatedAt" TIMESTAMPTZ;

ALTER TABLE "sellerAddresses"
ALTER COLUMN "updatedAt"
SET DEFAULT NOW();

ALTER TABLE "sellers" DROP COLUMN "address";

ALTER TABLE "leads" DROP COLUMN "district";