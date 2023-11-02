CREATE TABLE
    "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(100) NOT NULL UNIQUE,
        "password" VARCHAR(100) NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );


CREATE TYPE admins_status AS ENUM ('active', 'blocked');

CREATE TABLE
    "admins" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
        "status" admins_status DEFAULT 'active' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );

CREATE TYPE sellers_status AS ENUM ('active', 'blocked');

CREATE TABLE
    "sellers" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        "mobileNumber" VARCHAR(100) NOT NULL UNIQUE,
        "status" sellers_status DEFAULT 'active' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );