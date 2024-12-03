import React, { useState } from 'react';
import { Star, Calendar, Tv, Info } from 'lucide-react';
import { Anime } from '../types/anime';
import { AnimeModal } from './AnimeModal';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#16213E] rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group">
        <div className="relative">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 right-0 m-3 bg-black/75 px-2 py-1 rounded-md backdrop-blur-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-white text-sm font-medium">{anime.score.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-white line-clamp-2 hover:line-clamp-none">
            {anime.title}
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-300">
            <div className="flex items-center">
              <Tv className="w-4 h-4 mr-2 text-[#E94560]" />
              <span>{anime.episodes} episodes</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-[#E94560]" />
              <span>{anime.year || 'N/A'}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {anime.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.name}
                className="px-3 py-1 text-xs font-medium bg-[#0F3460] text-white rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {anime.synopsis}
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#E94560] text-white rounded-lg hover:bg-[#E94560]/90 transition-colors duration-200"
          >
            <Info className="w-4 h-4" />
            More Info
          </button>
        </div>
      </div>

      <AnimeModal
        anime={anime}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};