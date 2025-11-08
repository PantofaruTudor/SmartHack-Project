import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Parolele nu se potrivesc');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      window.location.href = '/dashboard';
      
    } catch (err) {
      console.error('Register error:', err);
      
      if (err.code === 'ERR_NETWORK' || err.message.includes('ERR_CONNECTION_REFUSED')) {
        setError('Nu se poate conecta la server. Verifică dacă serverul backend rulează pe portul 5000.');
      } else if (err.response) {
        // Server responded with error status
        setError(err.response.data?.message || 'Eroare la înregistrare');
      } else {
        // Network error or other issue
        setError('Eroare de conexiune la server. Verifică că serverul backend rulează.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Înregistrare</h2>
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Alege un username"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minim 6 caractere"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirmă Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Introdu parola din nou"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Se încarcă...' : 'Înregistrează-te'}
          </button>
        </form>

        <p className="register-link">
          Ai deja cont? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
