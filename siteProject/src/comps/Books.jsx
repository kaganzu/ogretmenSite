import React, { useState, useEffect } from 'react';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Örnek veri - gerçek uygulamada API'den gelecek
  const sampleBooks = [
    {
      id: 1,
      title: "Lise Matematik Konu Anlatımı",
      category: "lise",
      type: "pdf",
      description: "9-12. sınıf matematik konularının detaylı anlatımı",
      fileSize: "2.5 MB",
      uploadDate: "2024-01-15",
      downloads: 1250,
      thumbnail: "📚",
      status: "active"
    },
    {
      id: 2,
      title: "Üniversite Hazırlık Soru Bankası",
      category: "universite",
      type: "pdf",
      description: "TYT/AYT matematik soru çözümleri ve teknikleri",
      fileSize: "4.2 MB",
      uploadDate: "2024-01-10",
      downloads: 2100,
      thumbnail: "📖",
      status: "active"
    },
    {
      id: 3,
      title: "Olimpiyat Matematik Notları",
      category: "olimpiyat",
      type: "pdf",
      description: "Matematik olimpiyatlarına hazırlık notları",
      fileSize: "3.1 MB",
      uploadDate: "2024-01-05",
      downloads: 890,
      thumbnail: "🏆",
      status: "active"
    },
    {
      id: 4,
      title: "Geometri Formülleri",
      category: "lise",
      type: "pdf",
      description: "Tüm geometri formülleri ve çözüm teknikleri",
      fileSize: "1.8 MB",
      uploadDate: "2024-01-20",
      downloads: 1560,
      thumbnail: "📐",
      status: "active"
    },
    {
      id: 5,
      title: "Analiz ve Türev",
      category: "universite",
      type: "pdf",
      description: "Analiz konuları ve türev uygulamaları",
      fileSize: "2.9 MB",
      uploadDate: "2024-01-12",
      downloads: 980,
      thumbnail: "📊",
      status: "active"
    }
  ];

  useEffect(() => {
    // localStorage'dan kitapları yükle
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      // İlk kez çalıştırılıyorsa örnek kitapları kaydet
      localStorage.setItem('books', JSON.stringify(sampleBooks));
      setBooks(sampleBooks);
    }
  }, []);

  // localStorage'daki değişiklikleri dinle
  useEffect(() => {
    const handleStorageChange = () => {
      const savedBooks = localStorage.getItem('books');
      if (savedBooks) {
        setBooks(JSON.parse(savedBooks));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sadece aktif kitapları filtrele
  const activeBooks = books.filter(book => book.status === 'active');

  const filteredBooks = activeBooks.filter(book => {
    const matchesFilter = filter === 'all' || book.category === filter;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (book) => {
    // İndirme sayısını artır
    const updatedBooks = books.map(b => 
      b.id === book.id ? { ...b, downloads: b.downloads + 1 } : b
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    
    // Gerçek dosya indirme
    if (book.fileData) {
      // Base64 dosya verisini kullan
      const link = document.createElement('a');
      link.href = book.fileData;
      link.download = `${book.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Başarı mesajı
      alert(`${book.title} başarıyla indirildi!`);
    } else {
      // Eski kitaplar için fallback
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO8DQoxIDAgb2JqDQo8PA0KL1R5cGUgL0NhdGFsb2cNCi9QYWdlcyAyIDAgUg0KPj4NCmVuZG9iag0KMiAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDENCi9LaWRzIFsgMyAwIFIgXQ0KPj4NCmVuZG9iag0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL01lZGlhQm94IFsgMCAwIDU5NSA4NDIgXQ0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA0IDAgUg0KPj4NCi9FeHRHU3RhdGUgPDwNCi9HUzEgNSAwIFINCj4+DQo+Pg0KL0NvbnRlbnRzIDYgMCBSDQovUGFyZW50IDIgMCBSDQo+Pg0KZW5kb2JqDQo0IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL0Jhc2VGb250IC9IZWx2ZXRpY2ENCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nDQo+Pg0KZW5kb2JqDQo1IDAgb2JqDQo8PA0KL1R5cGUgL0V4dEdTdGF0ZQ0KL0JNIC9Ob3JtYWwNCi9DQSAxDQo+Pg0KZW5kb2JqDQo2IDAgb2JqDQo8PA0KL0xlbmd0aCAxNQ0KPj4NCnN0cmVhbQ0KQlQNCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8gV29ybGQpIFRqCkVUCmVuZHN0cmVhbQ0KZW5kb2JqDQp4cmVmDQowIDcNCjAwMDAwMDAwMDAgNjU1MzUgZiANCjAwMDAwMDAwMTAgMDAwMDAgbg0KMDAwMDAwMDA3OSAwMDAwMCBuDQowMDAwMDAwMTczIDAwMDAwIG4NCjAwMDAwMDAzMDEgMDAwMDAgbg0KMDAwMDAwMDM4MCAwMDAwMCBuDQowMDAwMDAwNDIwIDAwMDAwIG4NCnRyYWlsZXINCjw8DQovU2l6ZSA3DQovUm9vdCAxIDAgUg0KL0luZm8gOCAwIFINCj4+DQpzdGFydHhyZWYNCjQ5Mg0KJSVFT0Y=`;
      link.download = `${book.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`${book.title} indiriliyor... (Demo dosya)`);
    }
  };

  const getCategoryName = (category) => {
    const categories = {
      'lise': 'Lise Matematik',
      'universite': 'Üniversite Hazırlık',
      'olimpiyat': 'Olimpiyat'
    };
    return categories[category] || category;
  };

  return (
    <div className="books-page">
      <section className="books-hero">
        <div className="container">
          <h1>📚 Matematik Kitapları ve Notlar</h1>
          <p>Öğrencilerim için hazırladığım PDF notlar ve kitaplar</p>
        </div>
      </section>

      <section className="books-content">
        <div className="container">
          {/* Search and Filter */}
          <div className="books-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Kitap veya not ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Tümü
              </button>
              <button
                className={`filter-btn ${filter === 'lise' ? 'active' : ''}`}
                onClick={() => setFilter('lise')}
              >
                Lise
              </button>
              <button
                className={`filter-btn ${filter === 'universite' ? 'active' : ''}`}
                onClick={() => setFilter('universite')}
              >
                Üniversite
              </button>
              <button
                className={`filter-btn ${filter === 'olimpiyat' ? 'active' : ''}`}
                onClick={() => setFilter('olimpiyat')}
              >
                Olimpiyat
              </button>
            </div>
          </div>

          {/* Books Grid */}
          <div className="books-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map(book => (
                <div key={book.id} className="book-card">
                  <div className="book-thumbnail">
                    <span className="book-icon">{book.thumbnail}</span>
                    <div className="book-type-badge">PDF</div>
                  </div>
                  
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="book-description">{book.description}</p>
                    
                    <div className="book-meta">
                      <span className="book-category">{getCategoryName(book.category)}</span>
                      <span className="book-size">{book.fileSize}</span>
                    </div>
                    
                    <div className="book-stats">
                      <span className="downloads">📥 {book.downloads} indirme</span>
                      <span className="upload-date">📅 {new Date(book.uploadDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                  
                  <div className="book-actions">
                    <button 
                      className="download-btn"
                      onClick={() => handleDownload(book)}
                    >
                      📥 İndir
                    </button>
                    <button className="preview-btn">
                      👁️ Önizle
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>😕 Aradığınız kriterlere uygun kitap bulunamadı.</p>
                <button onClick={() => {setFilter('all'); setSearchTerm('');}}>
                  Tümünü Göster
                </button>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="books-stats">
            <div className="stat-card">
              <h3>📚 Toplam Kitap</h3>
              <span className="stat-number">{activeBooks.length}</span>
            </div>
            <div className="stat-card">
              <h3>📥 Toplam İndirme</h3>
              <span className="stat-number">{activeBooks.reduce((sum, book) => sum + book.downloads, 0).toLocaleString()}</span>
            </div>
            <div className="stat-card">
              <h3>📅 Son Güncelleme</h3>
              <span className="stat-number">{new Date().toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books; 