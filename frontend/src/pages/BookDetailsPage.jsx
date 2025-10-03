import React, { useState, useEffect } from 'react';
import { useParams , useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import AddReviewForm from '../components/AddReviewForm';
import { useAuth } from '../hooks/useAuth';

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
   const [reviews, setReviews] = useState([]);
  const { bookId } = useParams(); 
  const { user } = useAuth();
  const navigate = useNavigate();

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const [bookRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:8008/api/books/${bookId}`),
          axios.get(`http://localhost:8008/api/books/${bookId}/reviews`),
        ]);
        setBook(bookRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        setError('Failed to fetch book details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]); 

    const handleReviewAdded = (newReview) => {
    const reviewWithUser = { ...newReview, userId: { name: user.name } };
    setReviews([reviewWithUser, ...reviews]);
  };

    const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:8008/api/books/${bookId}`, {
          withCredentials: true,
        });
        navigate('/'); 
      } catch (err) {
        setError('Failed to delete the book.');
        console.error(err);
      }
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:8008/api/reviews/${reviewId}`, { withCredentials: true });
        setReviews(reviews.filter((review) => review._id !== reviewId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete the review.');
      }
    }
  };
  
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
      setReviews(reviews.map((r) => (r._id === reviewId ? res.data : r)));
      setEditingReviewId(null); 
    } catch (err) {
      console.error("Failed to update review", err);
      alert("Failed to update review.");
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const isBookOwner = user && user._id === book.addedBy;

  return (
    <div>
      <h1>{book.title}</h1>
      {isBookOwner && (
        <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
          <Link to={`/books/${bookId}/edit`}>
            <button>Edit Book</button>
          </Link>
          <button onClick={handleDelete} style={{ background: 'red', color: 'white' }}>
            Delete Book
          </button>
        </div>
      )}
      <h2>by {book.author}</h2>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published:</strong> {book.year}</p>
      <hr />
      <p>{book.description}</p>
      <hr style={{ margin: '2rem 0' }} />

      {user && <AddReviewForm bookId={bookId} onReviewAdded={handleReviewAdded} />}

     <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => {
            const isReviewOwner = user && user._id === review.userId?._id;
            const isEditing = editingReviewId === review._id;

            return (
              <div key={review._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                {isEditing ? (
                  <div>
                    <select value={editRating} onChange={(e) => setEditRating(Number(e.target.value))}>
                      <option value={5}>5</option><option value={4}>4</option><option value={3}>3</option><option value={2}>2</option><option value={1}>1</option>
                    </select>
                    <textarea value={editText} onChange={(e) => setEditText(e.target.value)} style={{ width: '100%', minHeight: '80px' }}/>
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
                        <button onClick={() => handleReviewDelete(review._id)} style={{ background: 'darkred', color: 'white' }}>Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default BookDetailsPage;