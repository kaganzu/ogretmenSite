import React from 'react';
import './Cv.css';
import profileImg from '../assets/images.jpg';

const AboutMe = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src={profileImg} alt="Ahmet İdilman" />
            </div>
            <div className="about-text">
              <h1>Ahmet İdilman</h1>
              <h2>Matematik Öğretmeni</h2>
              <p className="about-intro">
                Ankara Üniversitesi'nden mezun olduktan sonra akademik yolculuğuma Çukurova Üniversitesi'nde tezli yüksek lisans programı
                 ile devam ettim. Kariyerim boyunca özel öğretim kurumlarında ve devlet okullarında matematik öğretmeni olarak görev aldım.
                  Her seviyedeki öğrenciye, onların bireysel ihtiyaçlarını merkeze alan bir eğitim anlayışıyla derslerimi sürdürmekteyim. 
                  Alanımdaki güncelliği korumak adına, sürekli değişen eğitim müfredatını ve yeni nesil soru yaklaşımlarını takip etmeyi 
                  en temel mesleki ilke olarak benimsemekteyim.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-details">
        <div className="container">
          <div className="details-grid">
            <div className="detail-card">
              <h3>📚 Eğitim</h3>
              <ul>
                <li>Matematik Öğretmenliği - Boğaziçi Üniversitesi</li>
                <li>Matematik Yüksek Lisansı - İTÜ</li>
                <li>Pedagojik Formasyon Sertifikası</li>
              </ul>
            </div>

            <div className="detail-card">
              <h3>🏆 Başarılar</h3>
              <ul>
                <li>Aydın Matematik Olimpiyatları - 4 öğrenci hazırladım</li>
                <li>Birincilik elde ettik</li>
                <li>500+ öğrenci mezun ettim</li>
                <li>%95 başarı oranı</li>
              </ul>
            </div>

            <div className="detail-card">
              <h3>🎯 Uzmanlık Alanları</h3>
              <ul>
                <li>Lise Matematik (9-12. Sınıf)</li>
                <li>Üniversite Hazırlık (TYT/AYT)</li>
                <li>Matematik Olimpiyatları</li>
                <li>Özel Ders ve Grup Dersleri</li>
              </ul>
            </div>

            <div className="detail-card">
              <h3>📖 Öğretim Yöntemlerim</h3>
              <ul>
                <li>Görsel ve interaktif öğretim</li>
                <li>Günlük hayattan örnekler</li>
                <li>Adım adım problem çözme</li>
                <li>Kişiselleştirilmiş öğrenme planları</li>
              </ul>
            </div>
          </div>

          <div className="about-story">
            <h3>Hikayem</h3>
            <p>
              Matematik öğretmenliği kariyerime 20 yıl önce başladım. İlk günden itibaren 
              amacım, öğrencilerimin matematiği korkulacak bir ders olarak değil, 
              hayatın temel taşlarından biri olarak görmelerini sağlamaktı.
            </p>
            <p>
              Geçtiğimiz yılda Aydın Matematik Olimpiyatlarına 4 öğrenci hazırladım ve 
              birincilik elde ettik. Bu başarı, sadece formül ezberletmek yerine 
              matematiği anlamaya odaklanan öğretim yöntemimin doğruluğunu kanıtladı.
            </p>
            <p>
              Özel dersler, konu anlatım videoları ve PDF notlarla öğrencilerimin 
              yanında olmaya devam ediyorum. Bu siteyi de daha çok öğrenciye ulaşmak 
              için kurdum. Umarım sizin için de faydalı olur.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
