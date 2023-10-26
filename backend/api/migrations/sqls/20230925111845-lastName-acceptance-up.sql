/* Replace with your SQL commands */

ALTER TABLE "acceptances" ALTER COLUMN "lastName" SET DEFAULT '';

DELETE FROM "addresses" WHERE "entityName" = 'acceptance';

ALTER TABLE "acceptances" DROP COLUMN "addressId";