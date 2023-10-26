ALTER TABLE "faqs"
ALTER COLUMN
    "description" TYPE TEXT,
ALTER COLUMN
    "description" DROP DEFAULT;

ALTER TABLE "leads"
ALTER COLUMN
    "comment" TYPE TEXT,
ALTER COLUMN
    "comment" DROP DEFAULT;