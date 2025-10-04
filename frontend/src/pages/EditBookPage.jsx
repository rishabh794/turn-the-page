import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
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
  const { isDark } = useTheme();

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

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-50'
      }`}>
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent shadow-lg"></div>
          <p className={`mt-6 text-xl font-semibold ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-50'
    }`}>
      <div className="max-w-3xl mx-auto">
        <div className={`rounded-2xl shadow-lg p-8 mb-8 border-2 ${
          isDark
            ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600'
            : 'bg-gradient-to-br from-white to-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Edit Book</h1>
          </div>
          <p className={`font-medium ml-16 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>Update the book information below</p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 md:p-8 border-2 ${
          isDark
            ? 'bg-gray-800 border-gray-600'
            : 'bg-white border-orange-200'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className={`text-sm font-bold mb-3 uppercase tracking-wide flex items-center gap-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Book Title
              </label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none font-medium ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-650 placeholder-gray-500'
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 text-gray-900 hover:bg-white placeholder-gray-500'
                }`}
                placeholder="Enter book title"
              />
            </div>

            <div>
              <label htmlFor="author" className={`text-sm font-bold mb-3 uppercase tracking-wide flex items-center gap-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Author
              </label>
              <input 
                type="text" 
                id="author" 
                name="author" 
                value={formData.author} 
                onChange={handleChange} 
                required 
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none font-medium ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-650 placeholder-gray-500'
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 text-gray-900 hover:bg-white placeholder-gray-500'
                }`}
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label htmlFor="description" className={`text-sm font-bold mb-3 uppercase tracking-wide flex items-center gap-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Description
              </label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
                rows="5"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none resize-none font-medium ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-650 placeholder-gray-500'
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 text-gray-900 hover:bg-white placeholder-gray-500'
                }`}
                placeholder="Enter book description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="genre" className={`text-sm font-bold mb-3 uppercase tracking-wide flex items-center gap-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  Genre
                </label>
                <select 
                  id="genre" 
                  name="genre" 
                  value={formData.genre} 
                  onChange={handleChange} 
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none cursor-pointer font-semibold ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-650'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 text-gray-900 hover:bg-white'
                  }`}
                >
                  <option value="" disabled>Select a Genre</option>
                  {genreOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="year" className={`text-sm font-bold mb-3 uppercase tracking-wide flex items-center gap-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Published Year
                </label>
                <input 
                  type="number" 
                  id="year" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  required 
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none font-medium ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-650 placeholder-gray-500'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 text-gray-900 hover:bg-white placeholder-gray-500'
                  }`}
                  placeholder="e.g., 2024"
                />
              </div>
            </div>

            {error && (
              <div className={`border-2 p-4 rounded-2xl shadow-sm ${
                isDark
                  ? 'bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-700'
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className={`font-bold ${
                    isDark ? 'text-red-400' : 'text-red-700'
                  }`}>{error}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
              >
                Update Book
              </button>
              <button 
                type="button"
                onClick={() => navigate(`/books/${bookId}`)}
                className="px-6 py-4 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;