CREATE TYPE managers_status AS ENUM ('active', 'blocked');

CREATE TABLE
    "managers" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
        "status" managers_status DEFAULT 'active' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
);