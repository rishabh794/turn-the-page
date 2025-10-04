import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './hooks/useAuth'; 
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { useTheme } from './hooks/useTheme';

function App() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-6">
          <nav className={`rounded-full shadow-2xl px-6 py-4 border-2 transition-all duration-300 ${
  isScrolled 
    ? 'bg-gradient-to-r from-orange-100/70 to-red-100/70 dark:bg-gray-800/70 backdrop-blur-xl border-orange-300/50 dark:border-gray-700/50'
    : 'bg-gradient-to-r from-orange-100/90 to-red-100/90 dark:bg-gray-800/90 backdrop-blur-lg border-orange-300/70 dark:border-gray-700/70'
}`}>
            <div className="flex items-center justify-between">
              <Link to="/" className="hover:scale-110 transition-transform duration-200">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-br from-orange-500 to-red-600'
                    : 'bg-gradient-to-br from-orange-400 to-red-500'
                }`}>
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
              </Link>

              <div className="flex items-center gap-8">
                <Link 
                  to="/" 
                  className={`font-bold transition-all duration-200 hover:scale-105 text-sm uppercase tracking-wide ${
                    isDark
                      ? 'text-orange-400 hover:text-red-400'
                      : 'text-orange-800 hover:text-red-600'
                  }`}
                >
                  Home
                </Link>
                {user && (
                  <>
                    <Link 
                      to="/add-book" 
                      className={`font-bold transition-all duration-200 hover:scale-105 text-sm uppercase tracking-wide ${
                        isDark
                          ? 'text-orange-400 hover:text-red-400'
                          : 'text-orange-800 hover:text-red-600'
                      }`}
                    >
                      Add Book
                    </Link>
                    <Link 
                      to="/profile" 
                      className={`font-bold transition-all duration-200 hover:scale-105 text-sm uppercase tracking-wide ${
                        isDark
                          ? 'text-orange-400 hover:text-red-400'
                          : 'text-orange-800 hover:text-red-600'
                      }`}
                    >
                      Profile
                    </Link>
                  </>
                )}
              </div>

              {/* Right Side - Theme Toggle & User Actions */}
              <div className="flex items-center gap-3">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-orange-200 hover:bg-orange-300'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                {user ? (
                  <>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-md border lg:flex ${
                      isDark
                        ? 'bg-gray-700/60 backdrop-blur-sm text-orange-400 border-gray-600'
                        : 'bg-white/60 backdrop-blur-sm text-orange-900 border-orange-200'
                    }`}>
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {user.name}
                    </div>
                    <button 
                      onClick={logout}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-full font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className={`font-bold transition-all duration-200 px-4 text-sm uppercase tracking-wide ${
                        isDark
                          ? 'text-orange-400 hover:text-red-400'
                          : 'text-orange-800 hover:text-red-600'
                      }`}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}

      <main className={location.pathname !== '/login' && location.pathname !== '/signup' ? 'pt-28' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/books/:bookId" element={<BookDetailsPage />} />
          <Route path="/add-book" element={
            <ProtectedRoute>
              <AddBookPage />
            </ProtectedRoute>
          } />
          <Route path="/books/:bookId/edit" element={
            <ProtectedRoute>
              <EditBookPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;