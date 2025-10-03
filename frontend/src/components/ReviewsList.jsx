import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const ReviewsList = ({ reviews, onReviewDeleted, onReviewUpdated }) => {
  const { user } = useAuth();
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState('');

  const handleEditClick = (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditText(review.reviewText);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      const res = await axios.put(
        `http://localhost:8008/api/reviews/${reviewId}`,
        { rating: editRating, reviewText: editText },
        { withCredentials: true }
      );
      onReviewUpdated(res.data);
      setEditingReviewId(null);
    } catch {
      alert("Failed to update review.");
    }
  };

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const isReviewOwner = user && user._id === review.userId?._id;
          const isEditing = editingReviewId === review._id;
          return (
            <div key={review._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              {isEditing ? (
                <div>
                  <select value={editRating} onChange={(e) => setEditRating(Number(e.target.value))}>
                    <option value={5}>5</option><option value={4}>4</option><option value={3}>3</option><option value={2}>2</option><option value={1}>1</option>
                  </select>
                  <textarea value={editText} onChange={(e) => setEditText(e.target.value)} style={{ width: '100%', minHeight: '80px' }} />
                  <button onClick={() => handleUpdateReview(review._id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p><strong>Rating: {review.rating} / 5</strong></p>
                  <p>{review.reviewText}</p>
                  <p><small>by: {review.userId?.name || 'Anonymous'}</small></p>
                  {isReviewOwner && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEditClick(review)}>Edit</button>
                      <button onClick={() => onReviewDeleted(review._id)} style={{ background: 'darkred', color: 'white' }}>Delete</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default ReviewsList;