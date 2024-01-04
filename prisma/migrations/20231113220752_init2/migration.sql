/*
  Warnings:

  - Added the required column `imagePublicId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `imagePublicId` VARCHAR(100) NOT NULL;
