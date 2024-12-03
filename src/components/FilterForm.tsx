import React from 'react';

interface FilterFormProps {
  onSubmit: (filters: {
    genre: string;
    year: string;
    rating: string;
    episodes: string;
  }) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
  const [filters, setFilters] = React.useState({
    genre: '',
    year: '',
    rating: '',
    episodes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(filters);
  };

  const inputClassName = "w-full bg-[#16213E] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-[#E94560] focus:ring-1 focus:ring-[#E94560] transition-colors duration-200";
  const labelClassName = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className={labelClassName}>
            Genre
          </label>
          <select
            className={inputClassName}
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          >
            <option value="">Any Genre</option>
            <option value="1">Action</option>
            <option value="2">Adventure</option>
            <option value="4">Comedy</option>
            <option value="8">Drama</option>
            <option value="10">Fantasy</option>
          </select>
        </div>

        <div>
          <label className={labelClassName}>
            Year
          </label>
          <input
            type="number"
            min="1960"
            max="2024"
            className={inputClassName}
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            placeholder="e.g., 2023"
          />
        </div>

        <div>
          <label className={labelClassName}>
            Rating
          </label>
          <select
            className={inputClassName}
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          >
            <option value="">Any Rating</option>
            <option value="g">G - All Ages</option>
            <option value="pg">PG - Children</option>
            <option value="pg13">PG-13 - Teens 13+</option>
            <option value="r17">R - 17+</option>
          </select>
        </div>

        <div>
          <label className={labelClassName}>
            Episodes
          </label>
          <input
            type="number"
            min="1"
            className={inputClassName}
            value={filters.episodes}
            onChange={(e) => setFilters({ ...filters, episodes: e.target.value })}
            placeholder="Max episodes"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-8 py-3 bg-[#E94560] text-white rounded-lg hover:bg-[#E94560]/90 focus:outline-none focus:ring-2 focus:ring-[#E94560] focus:ring-offset-2 focus:ring-offset-[#1A1A2E] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          Find Anime
        </button>
      </div>
    </form>
  );
};