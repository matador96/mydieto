ALTER TABLE "auctionPrices"
    ADD CONSTRAINT "price_uq" UNIQUE ("auctionId", "acceptanceId");