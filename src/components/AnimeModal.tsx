import React from 'react';
import { X, Star, Calendar, Tv } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeModalProps {
  anime: Anime;
  isOpen: boolean;
  onClose: () => void;
}

export const AnimeModal: React.FC<AnimeModalProps> = ({ anime, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#16213E] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{anime.title}</h2>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-white font-medium">{anime.score.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Tv className="w-5 h-5 mr-1 text-[#E94560]" />
                <span>{anime.episodes} episodes</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-1 text-[#E94560]" />
                <span>{anime.year || 'N/A'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre.name}
                  className="px-3 py-1 text-sm font-medium bg-[#0F3460] text-white rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="text-gray-300">
              <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
              <p className="leading-relaxed">{anime.synopsis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};