/* Replace with your SQL commands */

CREATE TABLE
    "notifications" (
        "id" SERIAL PRIMARY KEY,
        "entityName" VARCHAR(100) NOT NULL,
        "entityId" INTEGER NOT NULL,
        "title" VARCHAR(200) NOT NULL,
        "description" VARCHAR(300) NOT NULL,
        "type" VARCHAR(20) NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );