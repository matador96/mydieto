/* Replace with your SQL commands */

ALTER TABLE "auctions" DROP COLUMN IF EXISTS "commission";

ALTER TABLE "auctions" DROP COLUMN IF EXISTS "comission";

ALTER TABLE "auctions"
ADD
    COLUMN "commission" INTEGER DEFAULT NULL;