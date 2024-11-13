-- CreateTable
CREATE TABLE `Artista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Artista_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `generoMusical` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Genero_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Musica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `duracao` VARCHAR(20) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `fkGeneroMusicalId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Musica_link_key`(`link`),
    UNIQUE INDEX `Musica_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('Administrador', 'Cliente') NOT NULL DEFAULT 'Cliente',
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `fotoPerfil` VARCHAR(255) NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `fkUsuarioId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Perfil_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Playlist_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerfisPlaylists` (
    `perfilId` INTEGER NOT NULL,
    `playlistId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`perfilId`, `playlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fkMusicaId` INTEGER NOT NULL,
    `dataHora` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fkUsuarioId` INTEGER NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataFinal` DATETIME(3) NULL,
    `codigoSessao` VARCHAR(255) NOT NULL,
    `status` ENUM('Iniciada', 'Finalizada') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicaArtista` (
    `musicaId` INTEGER NOT NULL,
    `artistaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`musicaId`, `artistaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaylistMusica` (
    `playlistId` INTEGER NOT NULL,
    `musicaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`playlistId`, `musicaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Musica` ADD CONSTRAINT `Musica_fkGeneroMusicalId_fkey` FOREIGN KEY (`fkGeneroMusicalId`) REFERENCES `Genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_fkUsuarioId_fkey` FOREIGN KEY (`fkUsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerfisPlaylists` ADD CONSTRAINT `PerfisPlaylists_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerfisPlaylists` ADD CONSTRAINT `PerfisPlaylists_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkMusicaId_fkey` FOREIGN KEY (`fkMusicaId`) REFERENCES `Musica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessao` ADD CONSTRAINT `Sessao_fkUsuarioId_fkey` FOREIGN KEY (`fkUsuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicaArtista` ADD CONSTRAINT `MusicaArtista_musicaId_fkey` FOREIGN KEY (`musicaId`) REFERENCES `Musica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicaArtista` ADD CONSTRAINT `MusicaArtista_artistaId_fkey` FOREIGN KEY (`artistaId`) REFERENCES `Artista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistMusica` ADD CONSTRAINT `PlaylistMusica_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistMusica` ADD CONSTRAINT `PlaylistMusica_musicaId_fkey` FOREIGN KEY (`musicaId`) REFERENCES `Musica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
