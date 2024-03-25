CREATE TYPE users_status AS ENUM ('active', 'blocked');

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR(100) NOT NULL,
    "status" users_status DEFAULT 'active' NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "admins" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "clients" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "instructors" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "about" TEXT,
    "marker" TEXT DEFAULT '',
    "posts" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);

CREATE TYPE courses_status AS ENUM ('active', 'blocked', 'archived');

CREATE TABLE "courses" (
    "id" SERIAL PRIMARY KEY,
    "instructorId" INTEGER NOT NULL REFERENCES "instructors" ("id"),
    "title" VARCHAR(100) NOT NULL,
    "content" TEXT DEFAULT '',
    "marker" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',
    "duration" INTEGER NOT NULL DEFAULT 0,
    "price" VARCHAR(50) DEFAULT '0',
    "views" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "status" courses_status DEFAULT 'active' NOT NULL,
    "updatedAt" TIMESTAMPTZ
);

CREATE TYPE articles_status AS ENUM ('active', 'blocked', 'archived');

CREATE TABLE "articles" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
    "content" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "status" articles_status DEFAULT 'active' NOT NULL,
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "faqs" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT '0',
    "status" VARCHAR(100) DEFAULT 'published' NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);