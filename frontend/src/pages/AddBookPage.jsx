import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { genreOptions } from '../constants/genres';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8008/api/books', formData, {
        withCredentials: true,
      });
      navigate(`/books/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book.');
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
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
        <button type="submit">Add Book</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddBookPage;