import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;