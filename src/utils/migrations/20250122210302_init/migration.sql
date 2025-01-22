/*
  Warnings:

  - A unique constraint covering the columns `[contract]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contract` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "contract" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contract_contract_key" ON "Contract"("contract");
