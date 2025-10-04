import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import apiClient from '../api/axios';


const AddReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await apiClient.post(
        `api/books/${bookId}/reviews`,{ rating, reviewText });
      onReviewAdded(res.data); 
      setReviewText(''); 
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`mt-8 border-2 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600'
        : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <h4 className={`text-2xl md:text-3xl font-bold ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>Add Your Review</h4>
      </div>
      
      {error && (
        <div className={`border-2 px-4 py-3 rounded-2xl mb-6 font-semibold shadow-sm ${
          isDark
            ? 'bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-700 text-red-400'
            : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300 text-red-700'
        }`}>
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="rating" className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Your Rating
        </label>
        <div className={`rounded-2xl p-4 border-2 shadow-sm hover:shadow-md transition-shadow duration-300 ${
          isDark
            ? 'bg-gray-700 border-gray-600'
            : 'bg-white border-orange-200'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none transition-transform duration-200 hover:scale-110"
              >
                <svg
                  className={`w-10 h-10 ${
                    star <= (hoveredStar || rating)
                      ? 'text-orange-500'
                      : (isDark ? 'text-gray-600' : 'text-gray-300')
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {rating}/5
            </span>
          </div>
          <select 
            id="rating" 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-semibold transition duration-200 ${
              isDark
                ? 'bg-gray-600 border-gray-500 text-gray-100'
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 text-gray-900'
            }`}
          >
            <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent</option>
            <option value={4}>⭐⭐⭐⭐ 4 - Good</option>
            <option value={3}>⭐⭐⭐ 3 - Average</option>
            <option value={2}>⭐⭐ 2 - Fair</option>
            <option value={1}>⭐ 1 - Poor</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="reviewText" className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Your Review
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          placeholder="Share your thoughts about this book..."
          className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none transition duration-200 shadow-sm hover:shadow-md ${
            isDark
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
              : 'bg-white border-orange-200 text-gray-900 placeholder-gray-500'
          }`}
          rows="6"
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-lg"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;