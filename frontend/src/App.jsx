import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './hooks/useAuth'; 
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { user, logout } = useAuth(); 

  return (
    <>
      <header>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <Link to="/">Home</Link>
          {user ? (
            <>
               <Link to="/add-book">Add New Book</Link>
               <Link to="/profile">Profile</Link>
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
          <Route path="/books/:bookId/edit" element={<EditBookPage />} />
           <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
    
  );
}

export default App;