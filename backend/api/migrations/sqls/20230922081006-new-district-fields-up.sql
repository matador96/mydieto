/* Replace with your SQL commands */

ALTER TABLE "leads" DROP COLUMN "addressId";

DROP TABLE IF EXISTS "sellerAddresses";

CREATE TABLE
    "addresses" (
        "id" SERIAL PRIMARY KEY,
        "entityName" VARCHAR(100) NOT NULL,
        "entityId" INTEGER NOT NULL,
        "geoLat" VARCHAR(20) DEFAULT '0.00',
        "geoLon" VARCHAR(20) DEFAULT '0.00',
        "districtId" VARCHAR(100),
        "districtName" VARCHAR(100),
        "address" VARCHAR(100) NOT NULL,
        "cityId" VARCHAR(100),
        "cityName" VARCHAR(100),
        "comment" TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );

ALTER TABLE "acceptances" DROP COLUMN "districtId";

ALTER TABLE "acceptances" DROP COLUMN "address";

ALTER TABLE "acceptances" DROP COLUMN "geoLat";

ALTER TABLE "acceptances" DROP COLUMN "geoLon";

ALTER TABLE "acceptances"
ADD
    COLUMN "addressId" INTEGER REFERENCES "addresses"(id);

ALTER TABLE "leads"
ADD
    COLUMN "addressId" INTEGER REFERENCES "addresses"(id);