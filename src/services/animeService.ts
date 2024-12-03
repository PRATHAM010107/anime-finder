import axios from 'axios';
import { AnimeResponse } from '../types/anime';
import { handleAPIError } from '../utils/api';

const BASE_URL = 'https://api.jikan.moe/v4';

// Add delay to respect API rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAnimeRecommendations = async (
  genre?: string,
  year?: number,
  rating?: string,
  episodes?: number
): Promise<AnimeResponse['data']> => {
  try {
    // Add delay before request to respect rate limiting
    await delay(1000);

    const params: Record<string, any> = {
      limit: 21,
      sfw: true,
      order_by: 'score',
      sort: 'desc',
    };

    // Only add parameters if they have valid values
    if (genre && genre !== '') {
      params.genres = genre;
    }
    
    if (year && !isNaN(year)) {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      params.start_date = startDate;
      params.end_date = endDate;
    }
    
    if (rating && rating !== '') {
      params.rating = rating;
    }
    
    if (episodes && !isNaN(episodes)) {
      params.max_episodes = episodes;
    }

    const response = await axios.get<AnimeResponse>(`${BASE_URL}/anime`, {
      params,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.data?.data) {
      throw new Error('Invalid API response format');
    }

    return response.data.data.filter(anime => 
      anime?.synopsis && 
      anime?.images?.jpg?.image_url && 
      typeof anime?.score === 'number' &&
      anime.score > 0
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error('Invalid search parameters. Please check your filters and try again.');
    }
    return handleAPIError(error);
  }
};