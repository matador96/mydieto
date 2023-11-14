CREATE TABLE
    "images" (
        "id" SERIAL PRIMARY KEY,
        "url" VARCHAR(2048) NOT NULL,
        "catalogId" INTEGER NOT NULL REFERENCES "catalogs" ("id")
    );