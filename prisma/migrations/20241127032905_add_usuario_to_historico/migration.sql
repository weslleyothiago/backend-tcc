/*
  Warnings:

  - Added the required column `fkUsuarioId` to the `Historico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Historico` ADD COLUMN `fkUsuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkUsuarioId_fkey` FOREIGN KEY (`fkUsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
