-- DropForeignKey
ALTER TABLE `MusicaArtista` DROP FOREIGN KEY `MusicaArtista_artistaId_fkey`;

-- DropForeignKey
ALTER TABLE `MusicaArtista` DROP FOREIGN KEY `MusicaArtista_musicaId_fkey`;

-- DropForeignKey
ALTER TABLE `PerfisPlaylists` DROP FOREIGN KEY `PerfisPlaylists_perfilId_fkey`;

-- DropForeignKey
ALTER TABLE `PerfisPlaylists` DROP FOREIGN KEY `PerfisPlaylists_playlistId_fkey`;

-- DropForeignKey
ALTER TABLE `PlaylistMusica` DROP FOREIGN KEY `PlaylistMusica_musicaId_fkey`;

-- DropForeignKey
ALTER TABLE `PlaylistMusica` DROP FOREIGN KEY `PlaylistMusica_playlistId_fkey`;

-- AddForeignKey
ALTER TABLE `PerfisPlaylists` ADD CONSTRAINT `PerfisPlaylists_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerfisPlaylists` ADD CONSTRAINT `PerfisPlaylists_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicaArtista` ADD CONSTRAINT `MusicaArtista_musicaId_fkey` FOREIGN KEY (`musicaId`) REFERENCES `Musica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicaArtista` ADD CONSTRAINT `MusicaArtista_artistaId_fkey` FOREIGN KEY (`artistaId`) REFERENCES `Artista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistMusica` ADD CONSTRAINT `PlaylistMusica_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistMusica` ADD CONSTRAINT `PlaylistMusica_musicaId_fkey` FOREIGN KEY (`musicaId`) REFERENCES `Musica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
