/*
  Warnings:

  - Made the column `phone` on table `Contractor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contractor" ALTER COLUMN "legalRepresentative" SET DEFAULT '',
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "iButtonQuantity" SET DEFAULT '0',
ALTER COLUMN "iButtonQuantity" SET DATA TYPE TEXT,
ALTER COLUMN "rfidCardQuantity" SET DEFAULT '0',
ALTER COLUMN "rfidCardQuantity" SET DATA TYPE TEXT,
ALTER COLUMN "cameraQuantity" SET DEFAULT '0',
ALTER COLUMN "cameraQuantity" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "axles" SET DATA TYPE TEXT;
