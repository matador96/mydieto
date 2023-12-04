ALTER TABLE "orders"
ADD COLUMN "statusId" INTEGER REFERENCES "orderStatuses" ("id") NOT NULL,
DROP COLUMN "status";