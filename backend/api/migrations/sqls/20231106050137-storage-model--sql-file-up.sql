CREATE TABLE
    "storage" (
        "id" SERIAL PRIMARY KEY,
        "catalogId" INTEGER NOT NULL REFERENCES "catalogs" ("id"),
        "sellerId" INTEGER NOT NULL REFERENCES "sellers" ("id"),
        "quantity" INTEGER NOT NULL DEFAULT 0 CHECK ("quantity" >= 0),
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ,
        UNIQUE ("catalogId", "sellerId")
    );