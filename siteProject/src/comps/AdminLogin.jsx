import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebase/authService';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Hata mesajını temizle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authService.login(credentials.email, credentials.password);
      
      if (result.success) {
        // Başarılı giriş
        navigate('/admin');
      } else {
        setError('E-posta veya şifre hatalı!');
      }
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>🔐 Admin Girişi</h1>
            <p>Yönetici paneline erişim</p>
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="E-posta adresinizi girin"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Şifrenizi girin"
                required
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Giriş Yapılıyor...' : '🔐 Giriş Yap'}
            </button>
          </form>

          <div className="login-footer">
            <p>⚠️ Bu sayfa sadece yetkili kullanıcılar içindir</p>
            <a href="/" className="back-link">← Ana Sayfaya Dön</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 