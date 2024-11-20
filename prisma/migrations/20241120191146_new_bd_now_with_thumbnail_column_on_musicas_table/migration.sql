/*
  Warnings:

  - Added the required column `thumbnail` to the `Musica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Musica` ADD COLUMN `thumbnail` VARCHAR(255) NOT NULL;
