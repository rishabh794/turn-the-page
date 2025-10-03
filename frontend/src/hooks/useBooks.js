import { useState, useEffect } from "react";
import axios from "axios";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("-createdAt");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 750);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          page,
          limit: 5,
          search: debouncedSearchTerm,
          genre,
          sort,
        });
        const res = await axios.get(
          `http://localhost:8008/api/books?${params.toString()}`
        );
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      } catch {
        setError("Failed to fetch books.");
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
    setSearchTerm("");
    setGenre("");
    setSort("-createdAt");
    setPage(1);
  };

  // Return everything the component will need
  return {
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
  };
};
