import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import BlogListPage from './pages/Blog';
import BlogDetailPage from './pages/BlogDetailPage';
import RegisterPage from './pages/Register';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'bg-gray-900 h-screen w-full' : 'bg-white h-screen w-full'}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<BlogListPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;



