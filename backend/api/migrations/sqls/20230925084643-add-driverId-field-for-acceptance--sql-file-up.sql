ALTER TABLE "acceptances"
    ADD COLUMN "driverId" INTEGER REFERENCES "drivers"(id) DEFAULT NULL;