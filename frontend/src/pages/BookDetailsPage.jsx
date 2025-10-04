import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mb-6 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="text-gray-800 text-xl font-semibold">Loading book details...</p>
          <p className="text-gray-600 mt-2">Preparing your reading experience</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border-l-4 border-red-500">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Book not found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Browse Books</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  const isBookOwner = user && user._id === book.addedBy;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-200 opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-8">

        {/* Book Info Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
          <BookInfo book={book} isOwner={isBookOwner} onDelete={handleBookDelete} />
        </div>

        {/* Ratings Chart Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Rating Distribution</h2>
              <p className="text-gray-600">See how readers rate this book</p>
            </div>
          </div>
          <RatingChart reviews={reviews} />
        </div>

        {/* Add Review Section */}
        {user ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Share Your Thoughts</h2>
                <p className="text-gray-600">Help others discover great books</p>
              </div>
            </div>
            <AddReviewForm bookId={bookId} onReviewAdded={handleReviewAdded} />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-lg p-8 mb-8 border-2 border-orange-200 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Want to share your review?</h3>
            <p className="text-gray-600 mb-6">Sign in to leave a review and help others discover great books</p>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Sign In</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Reviews List Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Reader Reviews
                  <span className="text-gray-500 font-normal ml-2">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </h2>
                <p className="text-gray-600">What readers are saying about this book</p>
              </div>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600">Be the first to share your thoughts about this book!</p>
            </div>
          ) : (
            <ReviewsList
              reviews={reviews}
              onReviewDeleted={handleReviewDelete}
              onReviewUpdated={handleReviewUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;