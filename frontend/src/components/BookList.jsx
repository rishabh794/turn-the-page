import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, loading, error }) => {
  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ marginTop: '1rem' }}>
      {books.map((book) => (
        <div key={book._id} style={{ border: '1px solid black', padding: '1rem', marginBottom: '1rem' }}>
          <h2><Link to={`/books/${book._id}`}>{book.title}</Link></h2>
          <p>by {book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;