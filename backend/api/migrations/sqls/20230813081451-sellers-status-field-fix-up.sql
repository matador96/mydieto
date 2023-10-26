/* Replace with your SQL commands */

ALTER TABLE "sellers" DROP COLUMN "status";

ALTER TABLE "sellers"
ADD
    COLUMN "status" VARCHAR(10) NOT NULL DEFAULT 'active';