import React from 'react';
import { genreOptions } from '../constants/genres';

const BookFilters = ({ searchTerm, genre, sort, setSearchTerm, setGenre, setSort, setPage, onReset }) => {
  return (
    <div className="filters" style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <select value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1); }} style={{ marginRight: '1rem' }}>
        <option value="">All Genres</option>
        {genreOptions.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} style={{ marginRight: '1rem' }}>
        <option value="-createdAt">Newest First</option>
        <option value="year">Oldest Published</option>
        <option value="-year">Newest Published</option>
        <option value="-averageRating">Highest Rated</option>
        <option value="averageRating">Lowest Rated</option>
      </select>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default BookFilters;