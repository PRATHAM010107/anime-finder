import React from 'react';
import { useAnimeList } from './hooks/useAnimeList';
import { AnimeGrid } from './components/AnimeGrid';
import { FilterForm } from './components/FilterForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const { currentAnime, loading, error, fetchAnime, showMore, hasMore } = useAnimeList();

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#E94560] to-[#0F3460] bg-clip-text text-transparent">
            Anime Finder
          </h1>
          <p className="text-gray-400 text-lg">
            Discover your next favorite anime based on your preferences
          </p>
        </header>

        <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-12 shadow-xl">
          <FilterForm onSubmit={fetchAnime} />
        </div>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <LoadingSpinner />
        ) : currentAnime.length > 0 ? (
          <AnimeGrid 
            anime={currentAnime} 
            onShowMore={showMore} 
            hasMore={hasMore}
          />
        ) : (
          <div className="text-center text-gray-400 mt-12">
            Use the filters above to find anime recommendations!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;