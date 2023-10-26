CREATE TABLE
    "faqs" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(100) NOT NULL,
        "description" VARCHAR(200) NOT NULL,
        "service" VARCHAR(200) NOT NULL,
        "status" VARCHAR(100) DEFAULT 'published' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );