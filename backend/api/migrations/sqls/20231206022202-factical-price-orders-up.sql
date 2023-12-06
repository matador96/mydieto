/* Replace with your SQL commands */

ALTER TABLE "orders"
ADD
    COLUMN "facticalPrice" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "orderItems" RENAME COLUMN "capacity" TO "quantity";