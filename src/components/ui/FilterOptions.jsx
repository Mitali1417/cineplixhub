import { useState, useEffect } from 'react';
import { fetchFromTMDB } from '../../utils/api';

const FilterOptions = ({ selectedGenre, onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        setLoading(true);
        const data = await fetchFromTMDB('/genre/movie/list');
        setGenres(data.genres);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  if (loading) return <div>Loading genres...</div>;
  if (error) return <div>Error loading genres: {error.message}</div>;

  return (
    <div className="relative inline-block text-left">
      <label htmlFor="genre-select" className="block text-sm font-medium text-gray-300 mb-1">Filter by Genre:</label>
      <select
        id="genre-select"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white cursor-pointer"
      >
        <option value="" className="bg-gray-700 text-white">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOptions;