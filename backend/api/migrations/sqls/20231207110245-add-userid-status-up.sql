/* Replace with your SQL commands */

ALTER TABLE "orderStatuses"
ADD
    COLUMN "userId" INTEGER REFERENCES "users" ("id");