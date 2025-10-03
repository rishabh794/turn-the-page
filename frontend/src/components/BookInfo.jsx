import React from 'react';
import { Link } from 'react-router-dom';

const BookInfo = ({ book, isOwner, onDelete }) => {
  if (!book) return null;

  return (
    <div>
      <h1>{book.title}</h1>
      {isOwner && (
        <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
          <Link to={`/books/${book._id}/edit`}>
            <button>Edit Book</button>
          </Link>
          <button onClick={onDelete} style={{ background: 'red', color: 'white' }}>
            Delete Book
          </button>
        </div>
      )}
      <h2>by {book.author}</h2>
      {book.reviewCount > 0 ? (
        <p><strong>Average Rating:</strong> {book.averageRating} / 5 (based on {book.reviewCount} reviews)</p>
      ) : (
        <p>No ratings yet.</p>
      )}
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published:</strong> {book.year}</p>
      <hr />
      <p>{book.description}</p>
    </div>
  );
};

export default BookInfo;