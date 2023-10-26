/* Replace with your SQL commands */

DROP TABLE IF EXISTS "auctionAcceptances";

DROP TABLE IF EXISTS "auctionPrices";

DROP TABLE IF EXISTS "auctions";

DROP TYPE IF EXISTS auctions_status;

DROP TABLE IF EXISTS "acceptances";

DROP TYPE IF EXISTS acceptances_status;

DROP TYPE IF EXISTS auction_acceptances_status;

CREATE TYPE auctions_status AS ENUM (
    'active',
    'pending',
    'finished',
    'archive'
);

CREATE TABLE
    "auctions" (
        "id" SERIAL PRIMARY KEY,
        "leadId" INTEGER DEFAULT NULL,
        "startPrice" INTEGER DEFAULT NULL,
        "commission" INTEGER DEFAULT NULL,
        "winnerId" INTEGER DEFAULT NULL,
        "status" auctions_status DEFAULT 'active' NOT NULL,
        "startTime" TIMESTAMPTZ,
        "endTime" TIMESTAMPTZ,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );

CREATE TYPE acceptances_status AS ENUM ('active', 'pending', 'blocked');

CREATE TABLE
    "acceptances" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(100) NOT NULL,
        "firstName" VARCHAR(20) NOT NULL,
        "lastName" VARCHAR(20) NOT NULL,
        "mobileNumber" VARCHAR(100) NOT NULL UNIQUE,
        "address" VARCHAR(255) NOT NULL,
        "districtId" INTEGER NOT NULL,
        "status" acceptances_status DEFAULT 'pending' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );

CREATE TYPE auction_acceptances_status AS ENUM ('active', 'finished');

CREATE TABLE
    "auctionPrices" (
        "id" SERIAL PRIMARY KEY,
        "auctionId" INTEGER NOT NULL REFERENCES "auctions" ("id"),
        "acceptanceId" INTEGER NOT NULL REFERENCES "acceptances" ("id"),
        "price" INTEGER DEFAULT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );