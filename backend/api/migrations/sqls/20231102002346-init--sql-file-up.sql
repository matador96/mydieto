CREATE TYPE users_status AS ENUM ('active', 'blocked');

CREATE TABLE
    "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(100) NOT NULL UNIQUE,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        "password" VARCHAR(100) NOT NULL,
        "role" VARCHAR(100) NOT NULL,
        "status" users_status DEFAULT 'active' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );

CREATE TYPE articles_status AS ENUM ('active', 'blocked', 'archived');

CREATE TABLE
    "articles" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(100) NOT NULL,
        "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
        "content" TEXT DEFAULT '',
        "views" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "status" articles_status DEFAULT 'active' NOT NULL,
        "updatedAt" TIMESTAMPTZ
    );