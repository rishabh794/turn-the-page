import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { genreOptions } from '../constants/genres';

const BookFilters = ({ searchTerm, genre, sort, setSearchTerm, setGenre, setSort, setPage, onReset }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`rounded-2xl p-6 shadow-sm border ${
      isDark
        ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600'
        : 'bg-gradient-to-br from-white to-slate-50 border-slate-100'
    }`}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-xl">🔍</span>
          </div>
          <div>
            <h3 className={`text-lg font-bold ${
              isDark ? 'text-gray-100' : 'text-slate-900'
            }`}>Find Your Next Read</h3>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-slate-500'
            }`}>Filter by title, author, genre, or rating</p>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className={`px-4 py-2 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span>↻</span>
          <span>Reset All</span>
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className={`block text-sm font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-slate-700'
          }`}>
            Search Books
          </label>
          <div className="relative">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${
              isDark ? 'text-gray-500' : 'text-slate-400'
            }`}>
              🔎
            </div>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 outline-none font-medium ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isDark
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-slate-700'
          }`}>
            Genre
          </label>
          <div className="relative">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none ${
              isDark ? 'text-gray-500' : 'text-slate-400'
            }`}>
              📚
            </div>
            <select
              value={genre}
              onChange={(e) => { 
                setGenre(e.target.value); 
                setPage(1); 
              }}
              className={`w-full pl-12 pr-10 py-3.5 border-2 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 outline-none font-medium appearance-none cursor-pointer ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="">All Genres</option>
              {genreOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? 'text-gray-500' : 'text-slate-400'
            }`}>
              ▼
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={`block text-sm font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-slate-700'
          }`}>
            Sort By
          </label>
          <div className="relative">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none ${
              isDark ? 'text-gray-500' : 'text-slate-400'
            }`}>
              ⚡
            </div>
            <select
              value={sort}
              onChange={(e) => { 
                setSort(e.target.value); 
                setPage(1); 
              }}
              className={`w-full pl-12 pr-10 py-3.5 border-2 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 outline-none font-medium appearance-none cursor-pointer ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="-createdAt">Newest First</option>
              <option value="year">Oldest Published</option>
              <option value="-year">Newest Published</option>
              <option value="-averageRating">Highest Rated</option>
              <option value="averageRating">Lowest Rated</option>
            </select>
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? 'text-gray-500' : 'text-slate-400'
            }`}>
              ▼
            </div>
          </div>
        </div>
      </div>

      {(searchTerm || genre || sort !== '-createdAt') && (
        <div className={`mt-6 pt-6 border-t ${
          isDark ? 'border-gray-600' : 'border-slate-200'
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-sm font-semibold ${
              isDark ? 'text-gray-400' : 'text-slate-600'
            }`}>Active Filters:</span>
            
            {searchTerm && (
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                isDark
                  ? 'bg-pink-900/50 text-pink-300'
                  : 'bg-pink-100 text-pink-700'
              }`}>
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className={`transition-colors ${
                    isDark ? 'hover:text-pink-100' : 'hover:text-pink-900'
                  }`}
                >
                  ✕
                </button>
              </span>
            )}
            
            {genre && (
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                isDark
                  ? 'bg-blue-900/50 text-blue-300'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                Genre: {genre}
                <button
                  onClick={() => { setGenre(''); setPage(1); }}
                  className={`transition-colors ${
                    isDark ? 'hover:text-blue-100' : 'hover:text-blue-900'
                  }`}
                >
                  ✕
                </button>
              </span>
            )}
            
            {sort !== '-createdAt' && (
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                isDark
                  ? 'bg-purple-900/50 text-purple-300'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                Sorted: {sort === 'year' ? 'Oldest Published' : 
                        sort === '-year' ? 'Newest Published' : 
                        sort === '-averageRating' ? 'Highest Rated' : 
                        'Lowest Rated'}
                <button
                  onClick={() => { setSort('-createdAt'); setPage(1); }}
                  className={`transition-colors ${
                    isDark ? 'hover:text-purple-100' : 'hover:text-purple-900'
                  }`}
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