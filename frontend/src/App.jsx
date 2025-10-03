import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './hooks/useAuth'; 
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';

function App() {
  const { user, logout } = useAuth(); 

  return (
    <BrowserRouter>
      <header>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <Link to="/">Home</Link>
          {user ? (
            <>
               <Link to="/add-book">Add New Book</Link>
              <span>Welcome, {user.name}!</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/books/:bookId" element={<BookDetailsPage />} />
           <Route path="/add-book" element={<AddBookPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;