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
                "Matematikte Başarı Doğru Yöntemle Mümkün!"
            </h1>
            <p className="hero-subtitle">
              25 yıllık deneyimle matematik öğrenmeyi kolaylaştırıyorum.
              Her seviyeden öğrenciye özel, anlaşılır ve kalıcı öğrenme deneyimi sunuyorum.

            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label"> Yıl Deneyim</span>
              </div>
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label"> Öğrenci</span>
              </div> 
            </div>
          </div>
            <div className="hero-text">
            <h1 className="hero-title-2">
              Başarı Arttırıcı Stratejiler
            </h1>
            <ul className="hero-subtitle-2">
              <li>25 yılda 200'den fazla öğrenciyle birebir ders.</li>
              <li>Kişiye özel çalışma planı ve haftalık geri bildirim.</li>
              <li>LGS / TYT-AYT / Okula Destek</li>
              <li>Online tanışma dersi.</li>
            </ul>
            

            <div className="hero-stats">
            <div className="stat">
                <span className="hero-subtitle">&nbsp;</span>
                <span className="stat-label">&nbsp;</span>
              </div>
              <div className="stat">
                <span className="stat-number">&nbsp;</span>
                <span className="stat-label">&nbsp;</span>
              </div> 
              </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📚</div>
              <h3>Özel Dersler</h3>
              <p>Birebir veya grup dersleri</p>
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