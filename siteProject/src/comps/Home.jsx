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
                <span className="stat-number">20+</span>
                <span className="stat-label">Yıl Deneyim</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Öğrenci</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Başarı Oranı</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="/about" className="btn btn-primary">Hakkımda</a>
              <a href="/contact" className="btn btn-secondary">İletişim</a>
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
              <p>Birebir veya küçük gruplar halinde matematik özel dersleri</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎥</div>
              <h3>Video Dersler</h3>
              <p>Konu anlatım videoları ve çözüm teknikleri</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📝</div>
              <h3>PDF Notlar</h3>
              <p>Detaylı konu özetleri ve soru çözümleri</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏆</div>
              <h3>Olimpiyat Hazırlık</h3>
              <p>Matematik olimpiyatlarına özel hazırlık programları</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Öğrenci Yorumları</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Ahmet Hoca sayesinde matematiği sevmeye başladım. Artık formülleri ezberlemek yerine anlıyorum."</p>
              <div className="testimonial-author">
                <strong>Ayşe K.</strong>
                <span>12. Sınıf Öğrencisi</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Olimpiyat sınavında birinci oldum. Ahmet Hoca'nın özel programı gerçekten çok etkiliydi."</p>
              <div className="testimonial-author">
                <strong>Mehmet A.</strong>
                <span>Olimpiyat Birincisi</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Üniversite sınavında matematikten 40 soruda 38 doğru yaptım. Teşekkürler Ahmet Hoca!"</p>
              <div className="testimonial-author">
                <strong>Zeynep B.</strong>
                <span>Üniversite Öğrencisi</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 