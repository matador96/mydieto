/* Replace with your SQL commands */

ALTER TABLE "images"
    DROP COLUMN "fileName";

ALTER TABLE "images"
    ALTER COLUMN "id" type varchar(200);

ALTER TABLE "images"
    ALTER COLUMN "id" drop default;