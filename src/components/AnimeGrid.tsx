import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Anime } from '../types/anime';
import { AnimeCard } from './AnimeCard';

interface AnimeGridProps {
  anime: Anime[];
  onShowMore: () => void;
  hasMore?: boolean;
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({ 
  anime, 
  onShowMore,
  hasMore = true
}) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {anime.map((item) => (
        <AnimeCard key={item.mal_id} anime={item} />
      ))}
    </div>
    {hasMore && (
      <div className="flex justify-center">
        <button
          onClick={onShowMore}
          className="group flex items-center gap-3 px-8 py-4 bg-[#0F3460] text-white rounded-lg hover:bg-[#0F3460]/90 focus:outline-none focus:ring-2 focus:ring-[#0F3460] focus:ring-offset-2 focus:ring-offset-[#1A1A2E] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
          Show More Recommendations
        </button>
      </div>
    )}
  </div>
);