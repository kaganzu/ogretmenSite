import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>İletişim</h1>
          <p>Matematik öğrenmek için benimle iletişime geçin</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          {/* Contact Cards */}
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Telefon</h3>
              <p>Hızlı iletişim için arayabilirsiniz</p>
              <a href="tel:+905324613123" className="contact-link">
                +90 532 461 31 23
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>Mesaj göndererek bilgi alabilirsiniz</p>
              <a href="https://wa.me/905324613123" target="_blank" rel="noopener noreferrer" className="contact-link">
                WhatsApp'ta Aç
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>E-posta</h3>
              <p>Detaylı bilgi için e-posta gönderin</p>
              <a href="mailto:idilman@hotmail.com" className="contact-link">
                idilman@hotmail.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">🔗</div>
              <h3>LinkedIn</h3>
              <p>Profesyonel profilimi inceleyin</p>
              <a href="https://tr.linkedin.com/in/ahmet-idilman-379306185/tr" target="_blank" rel="noopener noreferrer" className="contact-link">
                LinkedIn'e Git
              </a>
            </div>
          </div>

          {/* Info Cards */}
          <div className="contact-info">
            <div className="info-card">
              <h3>📚 Ders Programı</h3>
              <div className="schedule">
                <div className="schedule-item">
                  <strong>Pazartesi - Cuma:</strong>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="schedule-item">
                  <strong>Cumartesi:</strong>
                  <span>09:00 - 15:00</span>
                </div>
                <div className="schedule-item">
                  <strong>Pazar:</strong>
                  <span>Kapalı</span>
                </div>
              </div>
              <div className="schedule-note">
                <p>⏰ Acil durumlar için WhatsApp'tan mesaj atabilirsiniz</p>
              </div>
            </div>

            <div className="info-card">
              <h3>📍 Konum & Hizmetler</h3>
              <div className="location-info">
                <p><strong>Aydın, Türkiye</strong></p>
                <p>📍 Yüz yüze dersler için randevu alın</p>
                <p>💻 Online dersler de mevcuttur</p>
                <p>🚗 Belirli mesafelerde ev dersleri</p>
              </div>
              <div className="service-types">
                <h4>Hizmet Türleri:</h4>
                <ul>
                  <li>Birebir özel dersler</li>
                  <li>Küçük grup dersleri (2-4 kişi)</li>
                  <li>Online video dersler</li>
                  <li>Olimpiyat hazırlık programları</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>📝 Hızlı Mesaj Gönderin</h3>
            <p className="form-description">
              Aşağıdaki formu doldurarak bana ulaşabilirsiniz. En kısa sürede size dönüş yapacağım.
            </p>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.
              </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Ad Soyad *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-posta adresiniz"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Telefon numaranız"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Konu *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Hangi konuda yardım istiyorsunuz?</option>
                    <option value="lise">Lise Matematik</option>
                    <option value="universite">Üniversite Hazırlık (TYT/AYT)</option>
                    <option value="olimpiyat">Matematik Olimpiyatları</option>
                    <option value="ozel">Özel Ders</option>
                    <option value="online">Online Ders</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mesajınız *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mesajınızı buraya yazın..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
