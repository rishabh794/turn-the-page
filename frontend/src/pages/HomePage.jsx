import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`http://localhost:8008/api/books?page=${page}&limit=5`);
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]); 
  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
        </div>
      ) : (
        <p>Browse our collection of books below.</p>
      )}

      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <>
          <div style={{ marginTop: '1rem' }}>
            {books.map((book) => (
              <div key={book._id} style={{ border: '1px solid black', padding: '1rem', marginBottom: '1rem' }}>
                 <h2>
      <Link to={`/books/${book._id}`}>{book.title}</Link>
    </h2>
                <p>by {book.author}</p>
                <p>{book.description}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <button onClick={handlePrevPage} disabled={page <= 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;