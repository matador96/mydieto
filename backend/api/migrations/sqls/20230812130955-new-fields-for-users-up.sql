/* Replace with your SQL commands */

ALTER TABLE "users"
ADD
    COLUMN "firstName" VARCHAR(50) NOT NULL DEFAULT '';

ALTER TABLE "users"
ADD
    COLUMN "lastName" VARCHAR(50) NOT NULL DEFAULT '';

ALTER TABLE "users"
ADD
    COLUMN "post" VARCHAR(50) NOT NULL DEFAULT '';

UPDATE "users" SET "roleId" = '0' WHERE "login" = 'test';