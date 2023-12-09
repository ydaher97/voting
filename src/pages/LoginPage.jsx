
import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { useMessage } from '../providers/MessageContext';
import './loginpage.css'
import Spinner from '../components/Spinner'; 


const LoginPage = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { errorMessage, successMessage, showError, showSuccess } = useMessage();


  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      showError('Please enter both email and password.'); 
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      if (success) {
        showSuccess('Login successful!');
      } else {
        showError('Invalid email or password.'); 
      }
    } catch (error) {
      showError('Login failed. Please try again.');
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className="form-container">
      <h2>Login Page</h2>
      {errorMessage && <div className="error-banner">{errorMessage}</div>}
      {successMessage && <div className="success-banner">{successMessage}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
        {loading ? <Spinner /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
