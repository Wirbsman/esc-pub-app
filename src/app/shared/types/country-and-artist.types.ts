export type CountryAndArtist = {
    name: string;
    flag: string;
    artistName: string;
    artistSong: string;
    order?: number;
};

export type CountryAndArtistWithId = CountryAndArtist & { id: string };
