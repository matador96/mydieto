ALTER TABLE "leads"
    ADD "finishDate" TIMESTAMP DEFAULT NULL,
    ADD "userId" INTEGER REFERENCES "users"(id);