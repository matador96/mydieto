CREATE TYPE acceptances_status AS ENUM (
    'active',
    'pending',
    'blocked'
);

CREATE TABLE
    "acceptances" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(100) NOT NULL,
        "firstName" VARCHAR(20) NOT NULL,
        "lastName" VARCHAR(20) NOT NULL,
        "mobileNumber" VARCHAR(100) NOT NULL UNIQUE,
        "address" VARCHAR(255) NOT NULL,
        "districtId" INTEGER NOT NULL,
        "status" acceptances_status DEFAULT 'pending' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );