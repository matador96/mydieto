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
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );