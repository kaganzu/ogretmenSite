import React from 'react';
import './Home.css';
import profileImg from '../assets/images.jpg';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Matematik Öğretmeni
              <span className="highlight"> Ahmet İdilman</span>
            </h1>
            <p className="hero-subtitle">
              20 yıllık deneyimle matematik öğrenmeyi kolaylaştırıyorum
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Yıl Deneyim</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Öğrenci</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src={profileImg} alt="Ahmet İdilman" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Hizmetlerim</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📚</div>
              <h3>Özel Dersler</h3>
              <p>Birebir eya küçük gruplar halinde matematik özel dersleri</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎥</div>
              <h3>Canlı Dersler</h3>
              <p>Konu anlatım dersleri ve çözüm teknikleri</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📝</div>
              <h3>PDF Notlar</h3>
              <p>Detaylı konu özetleri ve soru çözümleri</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏆</div>
              <h3>Sınava Hazırlık</h3>
              <p>Sınavlara özel hazırlık dersleri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      
    </div>
  );
};

export default Home; 