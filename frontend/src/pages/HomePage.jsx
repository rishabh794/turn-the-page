import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBooks } from '../hooks/useBooks'; 
import BookFilters from '../components/BookFilters';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const { user } = useAuth();
  const {
    books,
    loading,
    error,
    page,
    totalPages,
    searchTerm,
    genre,
    sort,
    setSearchTerm,
    setGenre,
    setSort,
    setPage,
    handleNextPage,
    handlePrevPage,
    handleReset,
  } = useBooks(); 

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <div><p>Welcome, {user.name}!</p></div>
      ) : (
        <p>Browse our collection of books below.</p>
      )}

      <BookFilters
        searchTerm={searchTerm}
        genre={genre}
        sort={sort}
        setSearchTerm={setSearchTerm}
        setGenre={setGenre}
        setSort={setSort}
        setPage={setPage}
        onReset={handleReset}
      />

      <BookList books={books} loading={loading} error={error} />
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </div>
  );
};

export default HomePage;