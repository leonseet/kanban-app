/*
  Warnings:

  - Added the required column `rank` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Subtask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "rank" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "rank" TEXT NOT NULL;
