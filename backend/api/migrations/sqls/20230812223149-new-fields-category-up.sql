/* Replace with your SQL commands */

ALTER TABLE
    "materialCategories"
ADD
    COLUMN "priority" INTEGER NOT NULL DEFAULT '0';

ALTER TABLE
    "materialCategories"
ADD
    COLUMN "status" VARCHAR(10) NOT NULL DEFAULT 'active';