import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import apiClient from '../api/axios';


const ReviewsList = ({ reviews, onReviewDeleted, onReviewUpdated }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleEditClick = (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditText(review.reviewText);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setHoveredStar(0);
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      const res = await apiClient.put(
        `api/reviews/${reviewId}`,
        { rating: editRating, reviewText: editText }
      );
      onReviewUpdated(res.data);
      setEditingReviewId(null);
      setHoveredStar(0);
    } catch {
      alert("Failed to update review.");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 ${i < rating ? 'text-orange-500' : (isDark ? 'text-gray-600' : 'text-gray-300')}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`mt-8 border-t-2 pt-8 ${
      isDark ? 'border-gray-700' : 'border-orange-100'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <h3 className={`text-2xl md:text-3xl font-bold ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>Reviews</h3>
      </div>
      
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => {
            const isReviewOwner = user && user._id === review.userId?._id;
            const isEditing = editingReviewId === review._id;
            return (
              <div key={review._id} className={`border-2 rounded-2xl p-5 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-600'
                  : 'bg-gradient-to-br from-amber-50 to-orange-50 border-orange-200'
              }`}>
                {isEditing ? (
                  <div className="space-y-5">
                    <div>
                      <label className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>Rating</label>
                      <div className={`rounded-xl p-4 border-2 shadow-sm mb-3 ${
                        isDark
                          ? 'bg-gray-800 border-gray-600'
                          : 'bg-white border-orange-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setEditRating(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              className="focus:outline-none transition-transform duration-200 hover:scale-110"
                            >
                              <svg
                                className={`w-8 h-8 ${
                                  star <= (hoveredStar || editRating)
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
                          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {editRating}/5
                          </span>
                        </div>
                      </div>
                      <select 
                        value={editRating} 
                        onChange={(e) => setEditRating(Number(e.target.value))}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-semibold transition duration-200 ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-orange-200 text-gray-900'
                        }`}
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ 5</option>
                        <option value={4}>⭐⭐⭐⭐ 4</option>
                        <option value={3}>⭐⭐⭐ 3</option>
                        <option value={2}>⭐⭐ 2</option>
                        <option value={1}>⭐ 1</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>Review Text</label>
                      <textarea 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none shadow-sm ${
                          isDark
                            ? 'bg-gray-700 border-gray-600 text-gray-100'
                            : 'bg-white border-orange-200 text-gray-900'
                        }`}
                        rows="4"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => handleUpdateReview(review._id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{review.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className={`text-sm font-semibold ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>{review.userId?.name || 'Anonymous'}</span>
                      </div>
                    </div>
                    <div className={`rounded-xl p-4 border shadow-sm mb-4 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600'
                        : 'bg-white border-orange-200'
                    }`}>
                      <p className={`leading-relaxed break-words whitespace-pre-wrap ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>{review.reviewText}</p>
                    </div>
                    {isReviewOwner && (
                      <div className={`flex flex-col sm:flex-row gap-2 pt-3 border-t-2 ${
                        isDark ? 'border-gray-600' : 'border-orange-100'
                      }`}>
                        <button 
                          onClick={() => handleEditClick(review)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-sm"
                        >
                          Edit Review
                        </button>
                        <button 
                          onClick={() => onReviewDeleted(review._id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-sm"
                        >
                          Delete Review
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`text-center py-12 rounded-2xl border-2 shadow-sm ${
          isDark
            ? 'bg-gradient-to-br from-gray-700/50 to-gray-600/50 border-gray-600'
            : 'bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-orange-200'
        }`}>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className={`text-lg font-semibold ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>No reviews yet</p>
          <p className={`text-sm mt-2 ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}>Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;