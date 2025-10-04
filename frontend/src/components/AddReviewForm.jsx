import React, { useState } from 'react';
import axios from 'axios';

const AddReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `http://localhost:8008/api/books/${bookId}/reviews`,
        { rating, reviewText },
        { withCredentials: true }
      );
      onReviewAdded(res.data); 
      setReviewText(''); 
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-2 border-orange-200 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-orange-50 to-red-50 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <h4 className="text-2xl md:text-3xl font-bold text-gray-900">Add Your Review</h4>
      </div>
      
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-6 font-semibold shadow-sm">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Your Rating
        </label>
        <div className="bg-white rounded-2xl p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-300">
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
                      : 'text-gray-300'
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
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gradient-to-r from-amber-50 to-orange-50 text-gray-900 font-semibold transition duration-200"
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
        <label htmlFor="reviewText" className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Your Review
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          placeholder="Share your thoughts about this book..."
          className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 resize-none transition duration-200 shadow-sm hover:shadow-md"
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