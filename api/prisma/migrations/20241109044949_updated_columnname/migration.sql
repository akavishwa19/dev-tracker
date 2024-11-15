/*
  Warnings:

  - You are about to drop the column `todoId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `Settings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_todoId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "todoId",
ADD COLUMN     "taskId" TEXT;

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "displayName";

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
