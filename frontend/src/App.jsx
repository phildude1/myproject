import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components and Pages
import ProductList from './components/ProductList';
import PaystackButton from './components/PaystackButton';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

// Private Route Component
function PrivateRoute({ children }) {
  const isAuthenticated = checkAuthStatus(); // Your auth check logic
  
  return isAuthenticated 
    ? children 
    : <Navigate to="/login" replace />;
}

// Auth Status Check Function (you'll need to implement this)
function checkAuthStatus() {
  const token = localStorage.getItem('token');
  // Add your token validation logic here
  return !!token; // Simple example, replace with proper validation
}

function App() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handlePaymentSuccess = (reference) => {
    console.log('Payment successful:', reference);
    // Optionally verify the payment on your backend
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          } 
        />
        
        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Paystack Payment Component (you might want to move this to a specific page) */}
      <div>
        <h1>Web App Dashboard</h1>
        <PaystackButton 
          email={email}
          amount={amount}
          onSuccess={handlePaymentSuccess}
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
        />
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount"
        />
      </div>
    </Router>
  );
}

export default App;