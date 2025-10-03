import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { genreOptions } from '../constants/genres';

const EditBookPage = () => {
  const [formData, setFormData]  = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { bookId } = useParams(); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8008/api/books/${bookId}`);
        setFormData({
            title: res.data.title,
            author: res.data.author,
            description: res.data.description,
            genre: res.data.genre,
            year: res.data.year,
        });
      } catch (err) {
        console.log(err);
        setError('Failed to fetch book data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:8008/api/books/${bookId}`, formData, {
        withCredentials: true,
      });
      navigate(`/books/${bookId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <select id="genre" name="genre" value={formData.genre} onChange={handleChange} required>
            <option value="" disabled>Select a Genre</option>
            {genreOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">Published Year</label>
          <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required />
        </div>
        <button type="submit">Update Book</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditBookPage;