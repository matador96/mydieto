INSERT INTO "users" ("id", "email", "password")
VALUES
    (101, 'seller', '$2b$10$.4.m3hrhkSfIr18LNNGJNO4HlS/DsaJBKDPO3tqNG4pNMUqz.LOwe'),
    (911, 'admin', '$2b$10$.4.m3hrhkSfIr18LNNGJNO4HlS/DsaJBKDPO3tqNG4pNMUqz.LOwe');

INSERT INTO "sellers" ("userId", "firstName", "lastName", "mobile")
VALUES
    (101, 'Продавец', 'Продавцов', '1011011011');

INSERT INTO "admins" ("userId")
VALUES
    (911);