import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Link } from 'react-router-dom';
import apiClient from '../api/axios';

const ProfilePage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [myBooks, setMyBooks] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return; 

    const fetchProfileData = async () => {
      try {
        const [booksRes, reviewsRes] = await Promise.all([
          apiClient.get('api/users/my-books', { withCredentials: true }),
          apiClient.get('api/users/my-reviews', { withCredentials: true }),
        ]);
        setMyBooks(booksRes.data);
        setMyReviews(reviewsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]); 

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-50'
      }`}>
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent shadow-lg"></div>
          <p className={`mt-6 text-xl font-semibold ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-50'
      }`}>
        <div className={`border-2 p-6 rounded-2xl shadow-lg max-w-md ${
          isDark
            ? 'bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-700'
            : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className={`font-bold ${
              isDark ? 'text-red-400' : 'text-red-700'
            }`}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-50'
    }`}>
      <div className="max-w-5xl mx-auto">
        <div className={`rounded-2xl shadow-lg p-8 mb-8 border-2 ${
          isDark
            ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600'
            : 'bg-gradient-to-br from-white to-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{user?.name}'s Profile</h1>
              <p className={`font-medium mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Manage your books and reviews</p>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 md:p-8 mb-8 border-2 ${
          isDark
            ? 'bg-gray-800 border-gray-600'
            : 'bg-white border-orange-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              <h2 className={`text-2xl md:text-3xl font-bold ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>My Added Books</h2>
            </div>
            <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md">
              {myBooks.length} {myBooks.length === 1 ? 'Book' : 'Books'}
            </span>
          </div>
          
          {myBooks.length > 0 ? (
            <div className="space-y-4">
              {myBooks.map(book => (
                <div 
                  key={book._id} 
                  className={`group border-2 rounded-2xl p-5 md:p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-500'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200'
                  }`}
                >
                  <Link to={`/books/${book._id}`} className="block">
                    <h3 className={`text-xl font-bold group-hover:text-orange-600 transition-colors mb-1 ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {book.title}
                    </h3>
                    <p className={`font-medium ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>by {book.author}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-2xl border-2 ${
              isDark
                ? 'bg-gradient-to-br from-gray-700/50 to-gray-600/50 border-gray-600'
                : 'bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-orange-200'
            }`}>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className={`text-lg font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>You haven't added any books yet.</p>
              <p className={`text-sm mt-2 ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>Start sharing your favorite books with the community!</p>
            </div>
          )}
        </div>

        <div className={`rounded-2xl shadow-lg p-6 md:p-8 border-2 ${
          isDark
            ? 'bg-gray-800 border-gray-600'
            : 'bg-white border-orange-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              <h2 className={`text-2xl md:text-3xl font-bold ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>My Reviews</h2>
            </div>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md">
              {myReviews.length} {myReviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
          
          {myReviews.length > 0 ? (
            <div className="space-y-4">
              {myReviews.map(review => (
                <div 
                  key={review._id} 
                  className={`border-2 rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-500'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold shadow-md">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-white' : 'text-orange-200'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2">{review.rating}/5</span>
                      </div>
                      <span className={`font-medium ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>for</span>
                      {review.bookId ? (
                      <Link 
                        to={`/books/${review.bookId._id}`} 
                        className="text-orange-600 hover:text-red-600 font-bold hover:underline transition-colors"
                      >
                        {review.bookId.title}
                      </Link>
                    ) : (
                      <span className={`font-bold italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        [Deleted Book]
                      </span>
                    )}
                    </div>
                  </div>
                  <div className={`rounded-xl p-4 border shadow-sm ${
                    isDark
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-white border-orange-200'
                  }`}>
                    <p className={`leading-relaxed break-words ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>{review.reviewText}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-2xl border-2 ${
              isDark
                ? 'bg-gradient-to-br from-gray-700/50 to-gray-600/50 border-gray-600'
                : 'bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-orange-200'
            }`}>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <p className={`text-lg font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>You haven't written any reviews yet.</p>
              <p className={`text-sm mt-2 ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>Share your thoughts about the books you've read!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;