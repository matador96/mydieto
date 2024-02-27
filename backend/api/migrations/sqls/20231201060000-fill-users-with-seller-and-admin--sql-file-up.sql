INSERT INTO "users" ("id", "email", "password")
VALUES
    (101, 'seller', '$2b$10$kkekQZbHydpwZDHU/uzkH.d4gWHcxNPDoQEEbevo3YKrGSG/LRiwO'),
    (911, 'admin', '$2b$10$MU1SV04870BhZ8gR2T74wenmuXidvkOBY32DD6X2/kr85G8vYFL02');

INSERT INTO "sellers" ("userId", "firstName", "lastName")
VALUES
    (101, 'Продавец', 'Продавцов', '1011011011');

INSERT INTO "admins" ("userId")
VALUES
    (911);