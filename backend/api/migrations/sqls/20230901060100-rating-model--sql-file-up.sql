CREATE TYPE ratings_status AS ENUM ( 'active', 'archive' );

CREATE TABLE
    "ratings" (
        "id" SERIAL PRIMARY KEY,
        "fromEntityId" INTEGER DEFAULT NULL,
        "fromEntityType" VARCHAR(50) DEFAULT NULL,
        "toEntityId" INTEGER DEFAULT NULL,
        "toEntityType" VARCHAR(50) DEFAULT NULL,
        "actionForEntityId" INTEGER DEFAULT NULL,
        "actionForEntityType" VARCHAR(50) DEFAULT NULL,
        "value" INTEGER DEFAULT NULL,
        "status" ratings_status DEFAULT 'active' NOT NULL,
        "categoryOfRating" INTEGER DEFAULT 1 NOT NULL,
        "comment" TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ,
        UNIQUE (
            "fromEntityId",
            "fromEntityType",
            "toEntityId",
            "toEntityType",
            "actionForEntityId",
            "actionForEntityType"
        )
    );