import { Character } from "./character";

interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string; // e.g. S01E02
    charactersUrl: Character[]; // or character URLs
    url: string;
    created: string;
  }