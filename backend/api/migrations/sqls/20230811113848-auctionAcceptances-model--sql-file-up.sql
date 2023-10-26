CREATE TYPE auction_acceptances_status AS ENUM ('active', 'finished');

CREATE TABLE
    "auctionPrices" (
        "id" SERIAL PRIMARY KEY,
        "auctionId" INTEGER NOT NULL REFERENCES "auctions" ("id"),
        "acceptanceId" INTEGER NOT NULL REFERENCES "acceptances" ("id"),
        "price" INTEGER DEFAULT NULL,
        "status" auction_acceptances_status DEFAULT 'active' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );