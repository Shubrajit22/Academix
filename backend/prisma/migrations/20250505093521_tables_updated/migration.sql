/*
  Warnings:

  - Added the required column `contentId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "contentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "classId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
