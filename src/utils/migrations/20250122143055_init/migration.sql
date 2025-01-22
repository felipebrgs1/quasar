-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "consultant" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "stateRegistration" TEXT,
    "municipalRegistration" TEXT,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "legalRepresentative" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "mobile" TEXT NOT NULL,
    "whatsapp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "yearManufacture" INTEGER NOT NULL,
    "yearModel" INTEGER NOT NULL,
    "crvNumber" TEXT,
    "securityCode" TEXT,
    "cat" TEXT,
    "model" TEXT NOT NULL,
    "species" TEXT,
    "previousPlate" TEXT,
    "chassis" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "observations" TEXT,
    "category" TEXT,
    "capacity" TEXT,
    "power" TEXT,
    "engine" TEXT,
    "cmt" TEXT,
    "axles" INTEGER,
    "body" TEXT,
    "owner" TEXT NOT NULL,
    "ownerCpfCnpj" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "operator" TEXT,
    "lineNumber" TEXT,
    "hasIButton" BOOLEAN NOT NULL DEFAULT false,
    "iButtonQuantity" INTEGER NOT NULL DEFAULT 0,
    "hasRfidReader" BOOLEAN NOT NULL DEFAULT false,
    "rfidCardQuantity" INTEGER NOT NULL DEFAULT 0,
    "hasCamera" BOOLEAN NOT NULL DEFAULT false,
    "cameraQuantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_cnpj_key" ON "Contractor"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_renavam_key" ON "Vehicle"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_chassis_key" ON "Vehicle"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
