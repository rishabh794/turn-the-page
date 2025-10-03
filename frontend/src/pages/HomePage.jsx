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

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('-createdAt'); 

  const genreOptions = [
  "Fiction",
  "Novel",
  "Historical Fiction",
  "Non-Fiction",
  "Poetry",
  "Thriller",
  "Short Stories",
  "Memoir",
  "Autobiography",
  "Mythological Fiction"
];

   useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); 
    }, 750); 

    return () => {
      clearTimeout(timerId); 
    };
  }, [searchTerm]);

   useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({
          page,
          limit: 5,
          search: debouncedSearchTerm,
          genre,
          sort,
        });
        const res = await axios.get(`http://localhost:8008/api/books?${params.toString()}`);
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
  }, [page, debouncedSearchTerm, genre, sort]);

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleReset = () => {
    setSearchTerm('');
    setGenre('');
    setSort('-createdAt');
    setPage(1);
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

      <div className="filters" style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <select value={genre} onChange={(e) => { setGenre(e.target.value); setPage(1); }} style={{ marginRight: '1rem' }}>
          <option value="">All Genres</option>
          {genreOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} style={{ marginRight: '1rem' }}>
          <option value="-createdAt">Newest First</option>
          <option value="year">Oldest Published</option>
          <option value="-year">Newest Published</option>
          <option value="-averageRating">Highest Rated</option>
          <option value="averageRating">Lowest Rated</option>
        </select>
        <button onClick={handleReset}>Reset</button>
      </div>

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