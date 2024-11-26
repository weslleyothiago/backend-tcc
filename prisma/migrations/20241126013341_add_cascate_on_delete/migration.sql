-- DropForeignKey
ALTER TABLE `Historico` DROP FOREIGN KEY `Historico_fkMusicaId_fkey`;

-- DropForeignKey
ALTER TABLE `Musica` DROP FOREIGN KEY `Musica_fkGeneroMusicalId_fkey`;

-- DropForeignKey
ALTER TABLE `Perfil` DROP FOREIGN KEY `Perfil_fkUsuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Sessao` DROP FOREIGN KEY `Sessao_fkUsuarioId_fkey`;

-- AddForeignKey
ALTER TABLE `Musica` ADD CONSTRAINT `Musica_fkGeneroMusicalId_fkey` FOREIGN KEY (`fkGeneroMusicalId`) REFERENCES `Genero`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_fkUsuarioId_fkey` FOREIGN KEY (`fkUsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkMusicaId_fkey` FOREIGN KEY (`fkMusicaId`) REFERENCES `Musica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessao` ADD CONSTRAINT `Sessao_fkUsuarioId_fkey` FOREIGN KEY (`fkUsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
