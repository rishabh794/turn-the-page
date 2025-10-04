import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const coverCache = new Map();

const BookList = ({ books, loading, error }) => {
  const [bookCovers, setBookCovers] = useState({});
  const fetchingRef = useRef(new Set());
  const { isDark } = useTheme();

  const fetchBookCover = async (book) => {
    try {
      const searchQuery = encodeURIComponent(`${book.title} ${book.author}`);
      
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchQuery}&limit=1`
      );
      const data = await response.json();
      
      if (data.docs && data.docs.length > 0) {
        const bookData = data.docs[0];
        
        if (bookData.cover_i) {
          return `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`;
        }
        
        if (bookData.isbn && bookData.isbn[0]) {
          return `https://covers.openlibrary.org/b/isbn/${bookData.isbn[0]}-L.jpg`;
        }
      }
      
      const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
      const googleResponse = await fetch(
       `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=1&key=${apiKey}` 
      );
       const googleData = await googleResponse.json();
      
       if (googleData.items && googleData.items.length > 0) {
         const thumbnail = googleData.items[0].volumeInfo?.imageLinks?.thumbnail;
         if (thumbnail) {
            return thumbnail.replace('http://', 'https://').replace('zoom=1', 'zoom=2');
         }
       }
      
      return null;
    } catch (err) {
      console.error('Error fetching book cover:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllCovers = async () => {
      const covers = {};
      const fetchPromises = [];
      
      for (const book of books) {
        if (book.coverImage) {
          continue;
        }

        if (coverCache.has(book._id)) {
          covers[book._id] = coverCache.get(book._id);
          continue;
        }

        if (fetchingRef.current.has(book._id)) {
          continue;
        }

        fetchingRef.current.add(book._id);
        
        const fetchPromise = fetchBookCover(book).then(coverUrl => {
          fetchingRef.current.delete(book._id);
          
          if (coverUrl) {
            coverCache.set(book._id, coverUrl);
            covers[book._id] = coverUrl;
          } else {
            coverCache.set(book._id, null);
          }
        });
        
        fetchPromises.push(fetchPromise);
      }
      
      if (fetchPromises.length > 0) {
        await Promise.all(fetchPromises);
        
        if (Object.keys(covers).length > 0) {
          setBookCovers(prev => ({ ...prev, ...covers }));
        }
      } else if (Object.keys(covers).length > 0) {
        setBookCovers(prev => ({ ...prev, ...covers }));
      }
    };

    if (books.length > 0) {
      fetchAllCovers();
    }
  }, [books]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative w-16 h-16 mb-4">
          <div className={`absolute top-0 left-0 w-full h-full border-4 rounded-full ${
            isDark ? 'border-pink-900' : 'border-pink-200'
          }`}></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-pink-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className={`text-lg font-medium ${
          isDark ? 'text-gray-300' : 'text-slate-600'
        }`}>Loading amazing books...</p>
        <p className={`text-sm mt-2 ${
          isDark ? 'text-gray-500' : 'text-slate-400'
        }`}>Discovering your next great read</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border-l-4 border-red-500 rounded-lg p-6 my-8 ${
        isDark ? 'bg-red-900/30' : 'bg-red-50'
      }`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <h3 className={`font-semibold text-lg mb-1 ${
              isDark ? 'text-red-400' : 'text-red-800'
            }`}>Oops! Something went wrong</h3>
            <p className={isDark ? 'text-red-300' : 'text-red-600'}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className={`text-2xl font-bold mb-2 ${
          isDark ? 'text-gray-100' : 'text-slate-900'
        }`}>No books found</h3>
        <p className={isDark ? 'text-gray-400' : 'text-slate-600'}>Try adjusting your filters to discover more books</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {books.map((book) => {
        const coverUrl = book.coverImage || coverCache.get(book._id) || bookCovers[book._id];
        const isLoading = !book.coverImage && !coverCache.has(book._id) && !bookCovers[book._id];
        
        return (
          <Link 
            key={book._id} 
            to={`/books/${book._id}`}
            className="group"
          >
            <div className={`rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border transform hover:-translate-y-1 ${
              isDark
                ? 'bg-gray-800 border-gray-700 hover:border-pink-500'
                : 'bg-white border-slate-100 hover:border-pink-200'
            }`}>
 
              <div className={`relative h-64 overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-br from-gray-700 to-gray-600'
                  : 'bg-gradient-to-br from-slate-100 to-slate-200'
              }`}>
                {coverUrl ? (
                  <img 
                    src={coverUrl} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.querySelector('.fallback-cover').style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="fallback-cover w-full h-full flex items-center justify-center absolute inset-0"
                  style={{ display: coverUrl ? 'none' : 'flex' }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-2">📖</div>
                    <p className={`font-medium text-sm px-4 ${
                      isDark ? 'text-gray-500' : 'text-slate-400'
                    }`}>
                      {isLoading ? 'Loading cover...' : 'No Cover Available'}
                    </p>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {book.averageRating && (
                  <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 ${
                    isDark ? 'bg-gray-800/95' : 'bg-white/95'
                  }`}>
                    <span className="text-yellow-500">⭐</span>
                    <span className={`font-bold text-sm ${
                      isDark ? 'text-gray-100' : 'text-slate-900'
                    }`}>{book.averageRating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200 ${
                  isDark ? 'text-gray-100' : 'text-slate-900'
                }`}>
                  {book.title}
                </h3>
                
                <p className={`font-medium mb-4 flex items-center gap-2 ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  <span className="line-clamp-1">by {book.author}</span>
                </p>

                <div className={`flex items-center justify-between pt-4 border-t ${
                  isDark ? 'border-gray-700' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-2 text-sm">
                    {book.genre && (
                      <span className={`px-3 py-1 rounded-full font-medium ${
                        isDark
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {book.genre}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-pink-500 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </div>

                {book.reviewCount !== undefined && (
                  <div className={`mt-3 text-xs flex items-center gap-1 ${
                    isDark ? 'text-gray-500' : 'text-slate-500'
                  }`}>
                    <span>{book.reviewCount} {book.reviewCount === 1 ? 'review' : 'reviews'}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BookList;