export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string; // Retrieves in format S01 E02
    characters: string[]; // Array of characters URLs
    url: string;
    created: string; 
  }
  
  // For The api response
  export interface EpisodeResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Episode[];
  }
  