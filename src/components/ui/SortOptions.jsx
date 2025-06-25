import React from 'react';

const SortOptions = ({ sortOption, onSortChange }) => {
  return (
    <div className="relative inline-block text-left">
      <label htmlFor="sort-select" className="block text-sm font-medium text-gray-300 mb-1">Sort By:</label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white cursor-pointer"
      >
        <option value="popularity.desc" className="bg-gray-700 text-white">Popularity Descending</option>
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
        <option value="vote_average.asc">Rating Ascending</option>
        <option value="primary_release_date.desc">Release Date Descending</option>
        <option value="primary_release_date.asc">Release Date Ascending</option>
        <option value="title.asc">Title (A-Z)</option>
        <option value="title.desc">Title (Z-A)</option>
      </select>
    </div>
  );
};

export default SortOptions;