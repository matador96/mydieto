ALTER TABLE "drivers" ADD CONSTRAINT drivers_mobileNumber_uq UNIQUE ("mobileNumber");
ALTER TABLE "sellers" ADD CONSTRAINT sellers_mobileNumber_uq UNIQUE ("mobileNumber");