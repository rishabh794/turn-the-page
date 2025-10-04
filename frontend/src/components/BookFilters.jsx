import React from 'react';
import { genreOptions } from '../constants/genres';

const BookFilters = ({ searchTerm, genre, sort, setSearchTerm, setGenre, setSort, setPage, onReset }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-sm border border-slate-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-xl">🔍</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Find Your Next Read</h3>
            <p className="text-sm text-slate-500">Filter by title, author, genre, or rating</p>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
        >
          <span>↻</span>
          <span>Reset All</span>
        </button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Search Books
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              🔎
            </div>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 outline-none font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Genre
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
              📚
            </div>
            <select
              value={genre}
              onChange={(e) => { 
                setGenre(e.target.value); 
                setPage(1); 
              }}
              className="w-full pl-12 pr-10 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 outline-none font-medium appearance-none cursor-pointer"
            >
              <option value="">All Genres</option>
              {genreOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              ▼
            </div>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
              ⚡
            </div>
            <select
              value={sort}
              onChange={(e) => { 
                setSort(e.target.value); 
                setPage(1); 
              }}
              className="w-full pl-12 pr-10 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 outline-none font-medium appearance-none cursor-pointer"
            >
              <option value="-createdAt">Newest First</option>
              <option value="year">Oldest Published</option>
              <option value="-year">Newest Published</option>
              <option value="-averageRating">Highest Rated</option>
              <option value="averageRating">Lowest Rated</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || genre || sort !== '-createdAt') && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">Active Filters:</span>
            
            {searchTerm && (
              <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-medium flex items-center gap-2">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:text-pink-900 transition-colors"
                >
                  ✕
                </button>
              </span>
            )}
            
            {genre && (
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2">
                Genre: {genre}
                <button
                  onClick={() => { setGenre(''); setPage(1); }}
                  className="hover:text-blue-900 transition-colors"
                >
                  ✕
                </button>
              </span>
            )}
            
            {sort !== '-createdAt' && (
              <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2">
                Sorted: {sort === 'year' ? 'Oldest Published' : 
                        sort === '-year' ? 'Newest Published' : 
                        sort === '-averageRating' ? 'Highest Rated' : 
                        'Lowest Rated'}
                <button
                  onClick={() => { setSort('-createdAt'); setPage(1); }}
                  className="hover:text-purple-900 transition-colors"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookFilters;