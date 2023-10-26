/* Replace with your SQL commands */

ALTER TABLE "faqs"
ADD
    COLUMN "priority" INTEGER NOT NULL DEFAULT '0';

UPDATE "materialCategories" SET "name" = 'Все' WHERE "id" = '0';