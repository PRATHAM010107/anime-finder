import { useState, useCallback } from 'react';
import { Anime } from '../types/anime';
import { fetchAnimeRecommendations } from '../services/animeService';
import { FilterValues } from '../types/filters';
import { APIError } from '../utils/api';

export const useAnimeList = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [shownIndices, setShownIndices] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnime = useCallback(async (filters: FilterValues) => {
    setLoading(true);
    setError(null);
    setShownIndices(new Set());
    
    try {
      const year = filters.year ? parseInt(filters.year) : undefined;
      const episodes = filters.episodes ? parseInt(filters.episodes) : undefined;
      
      if (year && (year < 1960 || year > new Date().getFullYear())) {
        throw new Error('Please enter a valid year between 1960 and present.');
      }
      
      if (episodes && episodes < 1) {
        throw new Error('Number of episodes must be greater than 0.');
      }

      const results = await fetchAnimeRecommendations(
        filters.genre,
        year,
        filters.rating,
        episodes
      );
      
      if (results.length === 0) {
        setError('No anime found matching your criteria. Try adjusting your filters.');
      } else {
        setAnimeList(results);
        setCurrentIndex(0);
        setShownIndices(new Set([0, 1, 2].filter(i => i < results.length)));
      }
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to fetch anime recommendations. Please try again later.';
      
      setError(errorMessage);
      setAnimeList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const showMore = useCallback(() => {
    if (animeList.length === 0) return;

    const remainingAnime = animeList.filter((_, index) => !shownIndices.has(index));
    if (remainingAnime.length === 0) {
      // If all anime have been shown, reset to start
      setShownIndices(new Set([0, 1, 2].filter(i => i < animeList.length)));
      setCurrentIndex(0);
      return;
    }

    // Get next 3 unseen anime
    const nextIndices = new Set<number>();
    let count = 0;
    let index = (currentIndex + 3) % animeList.length;
    
    while (count < 3 && nextIndices.size < remainingAnime.length) {
      if (!shownIndices.has(index)) {
        nextIndices.add(index);
        count++;
      }
      index = (index + 1) % animeList.length;
    }

    setCurrentIndex(Array.from(nextIndices)[0] || 0);
    setShownIndices(new Set([...Array.from(shownIndices), ...Array.from(nextIndices)]));
  }, [animeList, currentIndex, shownIndices]);

  const getCurrentAnime = useCallback(() => {
    return animeList.slice(currentIndex, currentIndex + 3).filter(Boolean);
  }, [animeList, currentIndex]);

  return {
    animeList,
    currentAnime: getCurrentAnime(),
    loading,
    error,
    fetchAnime,
    showMore,
    hasMore: animeList.length > 3 && shownIndices.size < animeList.length,
  };
};