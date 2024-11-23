/*
  Warnings:

  - Added the required column `capa` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Playlist` ADD COLUMN `capa` VARCHAR(255) NOT NULL;
