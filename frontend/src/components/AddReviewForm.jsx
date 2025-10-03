import React, { useState } from 'react';
import axios from 'axios';

const AddReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');

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
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem', border: '1px solid black', padding: '1rem' }}>
      <h4>Add Your Review</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="rating">Rating</label>
        <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Fair</option>
          <option value={1}>1 - Poor</option>
        </select>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="reviewText">Review</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          style={{ width: '100%', minHeight: '100px' }}
        />
      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>Submit Review</button>
    </form>
  );
};

export default AddReviewForm;