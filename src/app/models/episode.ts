export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string; // Format like "S01E01"
    characters: string[]; // Array of character URLs
    url: string;
    created: string; // ISO format
  }
  
  // For paginated API responses
  export interface EpisodeResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Episode[];
  }
  