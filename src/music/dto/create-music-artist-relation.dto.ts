import { IsNumber } from "class-validator";

export class createMusicArtistRelation {
    @IsNumber()
    artistId: number;

    @IsNumber()
    musicId: number;
}