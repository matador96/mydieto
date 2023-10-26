/* Replace with your SQL commands */

/* Replace with your SQL commands */

CREATE TABLE
    "drivers" (
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) NOT NULL,
        "carBrand" VARCHAR(100) NOT NULL,
        "carCapacity" INTEGER NOT NULL,
        "carNumber" VARCHAR(100) NOT NULL,
        "carSTS" VARCHAR(100) NOT NULL,
        "mobileNumber" VARCHAR(100) NOT NULL,
        "id" SERIAL PRIMARY KEY,
        "materialCategoryId" INTEGER NOT NULL DEFAULT '0'
    );

COMMENT ON COLUMN "drivers"."firstName" IS '';

COMMENT ON COLUMN "drivers"."lastName" IS '';

COMMENT ON COLUMN "drivers"."email" IS '';

COMMENT ON COLUMN "drivers"."carBrand" IS '';

COMMENT ON COLUMN "drivers"."carCapacity" IS '';

COMMENT ON COLUMN "drivers"."carNumber" IS '';

COMMENT ON COLUMN "drivers"."carSTS" IS '';

COMMENT ON COLUMN "drivers"."mobileNumber" IS '';

COMMENT ON COLUMN "drivers"."id" IS '';

COMMENT ON COLUMN "drivers"."materialCategoryId" IS '';

CREATE TABLE
    "materialCategories" (
        "parentId" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "id" SERIAL PRIMARY KEY
    );

COMMENT ON COLUMN "materialCategories"."parentId" IS '';

COMMENT ON COLUMN "materialCategories"."name" IS '';

COMMENT ON COLUMN "materialCategories"."id" IS '';

CREATE TABLE
    "sellers" (
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) NOT NULL,
        "mobileNumber" VARCHAR(100) NOT NULL,
        "id" SERIAL PRIMARY KEY,
        "address" TEXT NOT NULL DEFAULT '[]',
        "materialCategoryId" INTEGER NOT NULL DEFAULT '0'
    );

COMMENT ON COLUMN "sellers"."firstName" IS '';

COMMENT ON COLUMN "sellers"."lastName" IS '';

COMMENT ON COLUMN "sellers"."email" IS '';

COMMENT ON COLUMN "sellers"."mobileNumber" IS '';

COMMENT ON COLUMN "sellers"."id" IS '';

COMMENT ON COLUMN "sellers"."address" IS '';

COMMENT ON COLUMN "sellers"."materialCategoryId" IS '';

CREATE TABLE
    "users" (
        "login" VARCHAR(100) NOT NULL,
        "password" VARCHAR(100) NOT NULL,
        "roleId" INTEGER NOT NULL,
        "id" SERIAL PRIMARY KEY
    );

COMMENT ON COLUMN "users"."login" IS '';

COMMENT ON COLUMN "users"."password" IS '';

COMMENT ON COLUMN "users"."roleId" IS '';

COMMENT ON COLUMN "users"."id" IS '';

ALTER TABLE "drivers" DROP COLUMN "materialCategoryId";

ALTER TABLE "drivers"
ADD
    "materialCategoryIds" TEXT NOT NULL DEFAULT '[]';

ALTER TABLE "sellers" DROP COLUMN "materialCategoryId";

ALTER TABLE "sellers"
ADD
    "materialCategoryIds" TEXT NOT NULL DEFAULT '[]';

CREATE TYPE "status" AS ENUM (
    'active',
    'pending',
    'blocked',
    'finished',
    'inwork',
    'freezed'
);

/* Replace with your SQL commands */

ALTER TABLE "drivers"
ADD
    "status" status DEFAULT 'active' NOT NULL;

ALTER TABLE "sellers"
ADD
    "status" status DEFAULT 'active' NOT NULL;

ALTER TABLE "users"
ADD
    "status" status DEFAULT 'active' NOT NULL;

CREATE TABLE
    "leads" (
        "id" SERIAL PRIMARY KEY,
        "materialCategoryId" INTEGER NOT NULL DEFAULT '0',
        "capacity" INTEGER NOT NULL DEFAULT '0',
        "exportDate" TIMESTAMP NOT NULL,
        "images" TEXT NOT NULL DEFAULT '[]',
        "comment" VARCHAR(100)
    );

ALTER SEQUENCE "leads_id_seq" OWNED BY "leads"."id";

COMMENT ON COLUMN "leads"."id" IS '';

COMMENT ON COLUMN "leads"."materialCategoryId" IS '';

COMMENT ON COLUMN "leads"."capacity" IS '';

COMMENT ON COLUMN "leads"."exportDate" IS '';

COMMENT ON COLUMN "leads"."images" IS '';

COMMENT ON COLUMN "leads"."comment" IS '';

CREATE TABLE
    "images" (
        "id" SERIAL PRIMARY KEY,
        "url" VARCHAR(2048) NOT NULL,
        "status" status DEFAULT 'active' NOT NULL
    );

COMMENT ON COLUMN "images"."id" IS '';

COMMENT ON COLUMN "images"."url" IS '';

COMMENT ON COLUMN "images"."status" IS '';

ALTER TABLE "leads" ADD "district" TEXT DEFAULT NULL;

ALTER TABLE "leads" ADD "sellerId" INTEGER DEFAULT NULL;

ALTER TABLE "images" ADD "fileName" VARCHAR(100) NOT NULL;

ALTER TABLE "leads"
ADD
    "status" status DEFAULT 'active' NOT NULL;

ALTER TABLE "leads" ADD "address" TEXT DEFAULT NULL;

ALTER TABLE "leads" ALTER COLUMN "exportDate" TYPE TIMESTAMPTZ;

ALTER TABLE "leads" ADD COLUMN "createdAt" TIMESTAMPTZ;

ALTER TABLE "leads" ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "leads" ADD COLUMN "updatedAt" TIMESTAMPTZ;

ALTER TABLE "leads" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "drivers" ADD COLUMN "createdAt" TIMESTAMPTZ;

ALTER TABLE "drivers" ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "drivers" ADD COLUMN "updatedAt" TIMESTAMPTZ;

ALTER TABLE "drivers" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "sellers" ADD COLUMN "createdAt" TIMESTAMPTZ;

ALTER TABLE "sellers" ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "sellers" ADD COLUMN "updatedAt" TIMESTAMPTZ;

ALTER TABLE "sellers" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "users" ADD COLUMN "createdAt" TIMESTAMPTZ;

ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT NOW();

ALTER TABLE "users" ADD COLUMN "updatedAt" TIMESTAMPTZ;

ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

ALTER TABLE "materialCategories" ADD COLUMN "createdAt" TIMESTAMPTZ;

ALTER TABLE
    "materialCategories"
ALTER COLUMN "createdAt"
SET DEFAULT now();

ALTER TABLE "materialCategories" ADD COLUMN "updatedAt" TIMESTAMPTZ;

ALTER TABLE
    "materialCategories"
ALTER COLUMN "updatedAt"
SET DEFAULT now();

INSERT INTO
    "public"."users" ("login", "password", "roleId")
VALUES (
        'test',
        '$2b$10$.4.m3hrhkSfIr18LNNGJNO4HlS/DsaJBKDPO3tqNG4pNMUqz.LOwe',
        '0'
    );

INSERT INTO
    "public"."materialCategories" ("name", "parentId", "id")
VALUES ('Все', 0, 0);