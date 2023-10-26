ALTER TABLE "entityCategories"
    DROP COLUMN "materialCategoryId";

ALTER TABLE "entityCategories"
    ADD COLUMN "materialCategoryId" INTEGER REFERENCES "materialCategories"(id);


ALTER TABLE "images"
    DROP COLUMN "leadId";

ALTER TABLE "images"
    ADD COLUMN "leadId" INTEGER REFERENCES "leads"(id);


ALTER TABLE "leads"
    DROP COLUMN "materialCategoryId";

ALTER TABLE "leads"
    ADD COLUMN "materialCategoryId" INTEGER REFERENCES "materialCategories"(id);

ALTER TABLE "leads"
    DROP COLUMN "addressId";

ALTER TABLE "leads"
    ADD COLUMN "addressId" INTEGER REFERENCES "sellerAddresses"(id);


ALTER TABLE "routes"
    DROP COLUMN "driverId";

ALTER TABLE "routes"
    ADD COLUMN "driverId" INTEGER REFERENCES "drivers"(id);


ALTER TABLE "sellerAddresses"
    DROP COLUMN "sellerId";

ALTER TABLE "sellerAddresses"
    ADD COLUMN "sellerId" INTEGER REFERENCES "sellers"(id);


