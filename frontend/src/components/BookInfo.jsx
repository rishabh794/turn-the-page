import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const BookInfo = ({ book, isOwner, onDelete }) => {
  const { isDark } = useTheme();
  
  if (!book) return null;

  return (
    <div className="max-w-full overflow-hidden p-8">
      <h1 className={`text-4xl md:text-5xl font-bold mb-2 break-words ${
        isDark ? 'text-gray-100' : 'text-gray-900'
      }`}>{book.title}</h1>
      <h2 className={`text-lg md:text-xl mb-8 break-words ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>by {book.author}</h2>

      {isOwner && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link to={`/books/${book._id}/edit`} className="flex-1">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              Edit Book
            </button>
          </Link>
          <button 
            onClick={onDelete} 
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Delete Book
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`rounded-2xl p-6 border-2 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600'
            : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
        }`}>
          {book.reviewCount > 0 ? (
            <div>
              <p className={`text-sm font-semibold mb-2 uppercase tracking-wide ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Average Rating</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{book.averageRating}</span>
                <span className={`text-xl md:text-2xl ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>/ 5</span>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < Math.round(book.averageRating) ? 'text-orange-500' : (isDark ? 'text-gray-600' : 'text-gray-300')}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`text-sm mt-3 break-words ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Based on <span className="font-bold text-orange-600">{book.reviewCount}</span> reviews</p>
            </div>
          ) : (
            <div>
              <p className={`text-sm font-semibold mb-2 uppercase tracking-wide ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Rating</p>
              <p className={`text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>No ratings yet</p>
              <p className={`text-sm mt-2 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>Be the first to review!</p>
            </div>
          )}
        </div>

        <div className="space-y-3 overflow-hidden">
          <div className={`flex items-center gap-3 rounded-2xl p-4 border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600'
              : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200'
          }`}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <div className="flex-1 overflow-hidden">
              <span className={`text-xs font-semibold uppercase tracking-wide block ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Genre</span>
              <span className={`font-bold text-lg truncate block ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>{book.genre}</span>
            </div>
          </div>
          <div className={`flex items-center gap-3 rounded-2xl p-4 border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600'
              : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200'
          }`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 overflow-hidden">
              <span className={`text-xs font-semibold uppercase tracking-wide block ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Published</span>
              <span className={`font-bold text-lg ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>{book.year}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t-2 pt-6 mt-6 overflow-hidden ${
        isDark ? 'border-gray-700' : 'border-orange-100'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <h3 className={`text-2xl md:text-3xl font-bold ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}>Description</h3>
        </div>
        <div className={`rounded-2xl p-6 border ${
          isDark
            ? 'bg-gradient-to-br from-gray-800/50 to-gray-700/50 border-gray-600'
            : 'bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-orange-100'
        }`}>
          <p className={`leading-relaxed text-base md:text-lg break-words whitespace-pre-wrap ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;