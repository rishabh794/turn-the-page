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
  
  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const isOwner = user && user._id === book.addedBy;

  return (
    <div>
      <h1>{book.title}</h1>
      {isOwner && (
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
          {reviews.map((review) => (
            <div key={review._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <p><strong>Rating: {review.rating} / 5</strong></p>
              <p>{review.reviewText}</p>
              <p><small>by: {review.userId?.name || 'Anonymous'}</small></p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default BookDetailsPage;