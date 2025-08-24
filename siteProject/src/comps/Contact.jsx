import React, { useState } from 'react';
import emailjs from 'emailjs-com';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // EmailJS gönderimi
    emailjs.send(
      "service_a32hs6a",   // EmailJS'den aldığın Service ID
      "template_t8i8sob",  // EmailJS'den aldığın Template ID
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      },
      "m8W4J7W0LT1qCzXNK"    // EmailJS Public Key
    )
    .then(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus(''), 3000);
    })
    .catch(() => {
      setIsSubmitting(false);
      setSubmitStatus('error');
    });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>İletişim</h1>
          <p>Detaylı bilgi almak için iletişime geçebilirsiniz.</p>
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
              <a href="tel:+905056249525" className="contact-link">
                +90 505 624 95 25
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>Mesaj göndererek bilgi alabilirsiniz</p>
              <a href="https://wa.me/905056249525" target="_blank" rel="noopener noreferrer" className="contact-link">
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
              <a href="https://www.linkedin.com/in/ahmet-idilman-379306185/" target="_blank" rel="noopener noreferrer" className="contact-link">
                LinkedIn'e Git
              </a>
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
