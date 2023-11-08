CREATE TYPE addresses_status AS ENUM ('active', 'blocked');

CREATE TABLE
    "addresses" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "sellerId" INTEGER NOT NULL REFERENCES "sellers" ("id"),
        "districtId" VARCHAR(100),
        "districtName" VARCHAR(100),
        "cityId" VARCHAR(100),
        "cityName" VARCHAR(100),
        "geoLat" VARCHAR(20) DEFAULT '0.00',
        "geoLon" VARCHAR(20) DEFAULT '0.00',
        "address" VARCHAR(100) NOT NULL,
        "status" addresses_status DEFAULT 'active' NOT NULL,
        "comment" TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );