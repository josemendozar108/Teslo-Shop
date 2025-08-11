/*
  Warnings:

  - You are about to drop the column `userId` on the `OrderAddress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_userId_fkey";

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "userId";
