import React, { useState, useEffect } from 'react';
import { useParams , useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import AddReviewForm from '../components/AddReviewForm';
import { useAuth } from '../hooks/useAuth';
import BookInfo from '../components/BookInfo';
import RatingChart from '../components/RatingChart';
import ReviewsList from '../components/ReviewsList';

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
    setReviews([newReview, ...reviews]);
  };

  const handleBookDelete = async () => {
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
  
  const handleReviewUpdated = (updatedReview) => {
    setReviews(reviews.map((r) => (r._id === updatedReview._id ? updatedReview : r)));
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const isBookOwner = user && user._id === book.addedBy;

 return (
    <div>
      <BookInfo book={book} isOwner={isBookOwner} onDelete={handleBookDelete} />
      <hr style={{ margin: '2rem 0' }} />
      <RatingChart reviews={reviews} />
      {user && <AddReviewForm bookId={bookId} onReviewAdded={handleReviewAdded} />}
      <ReviewsList
        reviews={reviews}
        onReviewDeleted={handleReviewDelete}
        onReviewUpdated={handleReviewUpdated}
      />
    </div>
  );
};

export default BookDetailsPage;