ALTER TABLE "orderItems" DROP COLUMN "unitPrice";

ALTER TABLE "orderItems"
ADD
    COLUMN "unitPrice" VARCHAR(20) NOT NULL DEFAULT '0';