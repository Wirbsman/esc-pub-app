export type CountryAndArtist = {
    name: string;
    flag: string;
    artistName: string;
    artistSong: string;
};

export type CountryAndArtistWithId = CountryAndArtist & { id: string };
