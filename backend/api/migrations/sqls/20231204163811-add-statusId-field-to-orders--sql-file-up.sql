ALTER TABLE "orders"
ADD COLUMN "statusId" INTEGER REFERENCES "orderStatuses" ("id"),
DROP COLUMN "status";