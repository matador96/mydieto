ALTER TABLE "drivers" DROP COLUMN "email";

ALTER TABLE "drivers" ADD "email" VARCHAR(100) NULL;

ALTER TABLE "sellers" DROP COLUMN "email";

ALTER TABLE "sellers" ADD "email" VARCHAR(100) NULL;