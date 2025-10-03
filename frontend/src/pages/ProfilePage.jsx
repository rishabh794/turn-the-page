import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return; 

    const fetchProfileData = async () => {
      try {
        const [booksRes, reviewsRes] = await Promise.all([
          axios.get('http://localhost:8008/api/users/my-books', { withCredentials: true }),
          axios.get('http://localhost:8008/api/users/my-reviews', { withCredentials: true }),
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

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>{user?.name}'s Profile</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>My Added Books ({myBooks.length})</h2>
        {myBooks.length > 0 ? (
          myBooks.map(book => (
            <div key={book._id} style={{ border: '1px solid #ccc', padding: '0.5rem 1rem', marginBottom: '0.5rem' }}>
              <Link to={`/books/${book._id}`}><strong>{book.title}</strong></Link> by {book.author}
            </div>
          ))
        ) : (
          <p>You haven't added any books yet.</p>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>My Reviews ({myReviews.length})</h2>
        {myReviews.length > 0 ? (
          myReviews.map(review => (
            <div key={review._id} style={{ border: '1px solid #ccc', padding: '0.5rem 1rem', marginBottom: '0.5rem' }}>
              <p><strong>{review.rating}/5</strong> for <Link to={`/books/${review.bookId._id}`}>{review.bookId.title}</Link></p>
              <p>"{review.reviewText}"</p>
            </div>
          ))
        ) : (
          <p>You haven't written any reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;