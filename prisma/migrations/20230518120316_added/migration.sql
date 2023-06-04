/*
  Warnings:

  - You are about to drop the column `userCredId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the `UserCredential` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `boardId` on table `Column` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `rank` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userCredId_fkey";

-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_boardId_fkey";

-- DropIndex
DROP INDEX "userCredId";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "userCredId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Column" ALTER COLUMN "boardId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "rank" TEXT NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- DropTable
DROP TABLE "UserCredential";

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
