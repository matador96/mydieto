CREATE TYPE orders_status AS ENUM (
    'onEvaluation',
    'onConfirmation',
    'waitDelivery',
    'finished',
    'canceled'
);

CREATE TABLE
    "orders" (
        "id" SERIAL PRIMARY KEY,
        "sellerId" INTEGER REFERENCES "sellers" ("id"),
        "addressId" INTEGER REFERENCES "addresses" ("id"),
        "price" INTEGER NOT NULL DEFAULT 0,
        "status" orders_status DEFAULT 'onEvaluation' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );

CREATE TYPE orderItems_status AS ENUM ('active', 'blocked');

CREATE TABLE
    "orderItems" (
        "id" SERIAL PRIMARY KEY,
        "articleId" INTEGER REFERENCES "articles" ("id"),
        "orderId" INTEGER REFERENCES "orders" ("id"),
        "capacity" INTEGER NOT NULL DEFAULT 0,
        "status" orderItems_status DEFAULT 'active' NOT NULL,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ
    );