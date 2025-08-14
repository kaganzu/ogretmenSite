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

      

      {/* Testimonials Section */}
      
    </div>
  );
};

export default Home; 