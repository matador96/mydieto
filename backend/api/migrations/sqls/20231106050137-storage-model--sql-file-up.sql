CREATE TABLE
    "storage" (
        "id" SERIAL PRIMARY KEY,
        "articleId" INTEGER NOT NULL REFERENCES "articles" ("id"),
        "sellerId" INTEGER NOT NULL REFERENCES "sellers" ("id"),
        "quantity" INTEGER NOT NULL DEFAULT 0 CHECK ("quantity" >= 0),
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ,
        UNIQUE ("articleId", "sellerId")
    );