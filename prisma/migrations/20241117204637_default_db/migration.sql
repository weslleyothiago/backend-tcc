/*
  Warnings:

  - Made the column `fkUsuarioId` on table `Perfil` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Perfil` DROP FOREIGN KEY `Perfil_fkUsuarioId_fkey`;

-- AlterTable
ALTER TABLE `Perfil` MODIFY `fkUsuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_fkUsuarioId_fkey` FOREIGN KEY (`fkUsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
