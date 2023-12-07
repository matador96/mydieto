CREATE TABLE
    "orderStatuses" (
        "id" SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES "orders" ("id"),
        "status" VARCHAR(100) DEFAULT 'onEvaluation' NOT NULL,
        "comment" TEXT NOT NULL DEFAULT '',
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );