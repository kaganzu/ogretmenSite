import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Güvenli admin bilgileri (gerçek uygulamada backend'de saklanmalı)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'matematik2024!' // Güçlü şifre
  };

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

    // Simulate API call delay
    setTimeout(() => {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        
        // Başarılı giriş - session storage'a kaydet
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminLoginTime', new Date().toISOString());
        
        navigate('/admin');
      } else {
        setError('Kullanıcı adı veya şifre hatalı!');
      }
      setIsLoading(false);
    }, 1000);
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
              <label htmlFor="username">Kullanıcı Adı</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Kullanıcı adınızı girin"
                required
                autoComplete="username"
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