-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "planValue" TEXT NOT NULL,
    "dataPlan" TEXT NOT NULL,
    "endPlan" TEXT NOT NULL,
    "carenciaPlan" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "MonthlyPayment" TEXT NOT NULL,
    "vencimento" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_contractId_key" ON "Plan"("contractId");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
