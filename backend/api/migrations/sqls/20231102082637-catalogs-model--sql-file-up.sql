CREATE TYPE catalogs_status AS ENUM ('active', 'blocked');

CREATE TABLE
    "catalogs" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "img" VARCHAR(200) DEFAULT '{}' NOT NULL,
        "parentId" INTEGER NOT NULL DEFAULT 0,
        "priority" INTEGER NOT NULL DEFAULT 0,
        "status" catalogs_status DEFAULT 'active' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );