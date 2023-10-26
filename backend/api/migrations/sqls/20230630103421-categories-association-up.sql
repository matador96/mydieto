CREATE TABLE
    "entityCategories" (
        "id" SERIAL PRIMARY KEY,
        "entityName" VARCHAR(100) NOT NULL,
        "entityId" INTEGER NOT NULL,
        "materialCategoryId" INTEGER NOT NULL
    );

ALTER TABLE "sellers" DROP COLUMN "materialCategoryIds";

ALTER TABLE "drivers" DROP COLUMN "materialCategoryIds";