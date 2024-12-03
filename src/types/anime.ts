export interface AnimeResponse {
  data: Anime[];
}

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  score: number;
  episodes: number;
  year: number;
  rating: string;
  genres: {
    name: string;
  }[];
}