import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { bookId } = useParams(); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8008/api/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        setError('Failed to fetch book details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]); 

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published:</strong> {book.year}</p>
      <hr />
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetailsPage;