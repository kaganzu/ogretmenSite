import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebase/authService';
import { booksService } from '../firebase/booksService';
import './Admin.css';

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    category: 'lise',
    description: '',
    file: null
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  // Güvenlik kontrolü
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      if (!user) {
        navigate('/admin-login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);


  useEffect(() => {
    // Firebase'den kitapları yükle
    const loadBooks = async () => {
      const result = await booksService.getAllBooks();
      if (result.success) {
        setBooks(result.books);
      } else {
        console.error('Kitaplar yüklenirken hata:', result.error);
      }
    };
    
    loadBooks();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin-login');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setNewBook(prev => ({
        ...prev,
        file: file
      }));
    } else {
      alert('Lütfen sadece PDF dosyası yükleyin!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newBook.title || !newBook.description || !newBook.file) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    setIsUploading(true);
    setUploadStatus('');

    try {
      console.log('Yükleme başlıyor:', newBook); // Debug için eklendi
      
      // Dosyayı Cloudinary'ye yükle
      const fileName = `${Date.now()}_${newBook.file.name}`;
      console.log('Cloudinary yüklemesi başlıyor...'); // Debug için eklendi
      const uploadResult = await booksService.uploadFile(newBook.file, fileName);
      console.log('Cloudinary sonucu:', uploadResult); // Debug için eklendi
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }

      // Kitap verilerini Firestore'a kaydet
      const bookData = {
        title: newBook.title,
        category: newBook.category,
        description: newBook.description,
        fileSize: `${(newBook.file.size / 1024 / 1024).toFixed(1)} MB`,
        thumbnail: getThumbnailForCategory(newBook.category),
        fileURL: uploadResult.downloadURL,
        fileName: fileName
      };
      
      console.log('Firestore\'a kaydedilecek veri:', bookData); // Debug için eklendi

      const addResult = await booksService.addBook(bookData);
      
      if (addResult.success) {
        // Kitapları yeniden yükle
        const loadResult = await booksService.getAllBooks();
        if (loadResult.success) {
          setBooks(loadResult.books);
        }
        
        setNewBook({
          title: '',
          category: 'lise',
          description: '',
          file: null
        });
        
        setUploadStatus('success');
      } else {
        throw new Error(addResult.error);
      }
    } catch (error) {
      console.error('Kitap yüklenirken hata:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
      // Reset status after 3 seconds
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  const getThumbnailForCategory = (category) => {
    const thumbnails = {
      'lise': '📚',
      'universite': '📖',
      'olimpiyat': '🏆'
    };
    return thumbnails[category] || '📄';
  };

  const handleDelete = async (id) => {
  if (window.confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
    const result = await booksService.deleteBook(id);
    if (result.success) {
      // Firestore’dan silindi, state’i de güncelle
      setBooks(books.filter(book => book.id !== id));
    } else {
      alert("Silme başarısız: " + result.error);
      console.error("Delete error:", result.error);
    }
  }
};

  const handleStatusToggle = (id) => {
    const updatedBooks = books.map(book => 
      book.id === id 
        ? { ...book, status: book.status === 'active' ? 'inactive' : 'active' }
        : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div className="container">
          <div className="admin-header">
            <div>
              <h1>🔧 Admin Paneli</h1>
              <p>Kitaplar ve notlar yönetimi</p>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Çıkış Yap
            </button>
          </div>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          <div className="admin-grid">
            {/* Upload Form */}
            <div className="upload-section">
              <h2>📤 Yeni Kitap/Not Yükle</h2>
              
              {uploadStatus === 'success' && (
                <div className="success-message">
                  ✅ Kitap başarıyla yüklendi!
                </div>
              )}

              <form className="upload-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Kitap/Not Başlığı *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Örn: Lise Matematik Konu Anlatımı"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Kategori *</label>
                  <select
                    id="category"
                    name="category"
                    value={newBook.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="lise">Lise Matematik</option>
                    <option value="universite">Üniversite Hazırlık</option>
                    <option value="olimpiyat">Olimpiyat</option>
                    <option value="9">9. Sınıf</option>
                    <option value="10">10. Sınıf</option>
                    <option value="11">11. Sınıf</option>
                    <option value="12">12. Sınıf</option>
                    <option value="lgs">LGS</option>
                    <option value="tyt-ayt">TYT-AYT</option>
                    <option value="ales">ALES</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Açıklama *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    placeholder="Kitap/not hakkında kısa açıklama..."
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="file">PDF Dosyası *</label>
                  <input
                    type="file"
                    id="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <small>Maksimum dosya boyutu: 10MB</small>
                </div>

                <button 
                  type="submit" 
                  className={`upload-btn ${isUploading ? 'loading' : ''}`}
                  disabled={isUploading}
                >
                  {isUploading ? 'Yükleniyor...' : '📤 Yükle'}
                </button>
              </form>
            </div>

            {/* Books Management */}
            <div className="management-section">
              <h2>📚 Mevcut Kitaplar</h2>
              
              <div className="books-list">
                {books.map(book => (
                  <div key={book.id} className={`book-item ${book.status}`}>
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <div className="book-meta">
                        <span className="category">{book.category}</span>
                        <span className="size">{book.fileSize}</span>
                        <span className="downloads">📥 {book.downloads}</span>
                      </div>
                    </div>
                    
                    <div className="book-actions">
                      <button
                        className={`status-btn ${book.status === 'active' ? 'active' : 'inactive'}`}
                        onClick={() => handleStatusToggle(book.id)}
                      >
                        {book.status === 'active' ? '✅ Aktif' : '❌ Pasif'}
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(book.id)}
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="admin-stats">
            <div className="stat-card">
              <h3>📚 Toplam Kitap</h3>
              <span className="stat-number">{books.length}</span>
            </div>
            <div className="stat-card">
              <h3>✅ Aktif</h3>
              <span className="stat-number">{books.filter(b => b.status === 'active').length}</span>
            </div>
            <div className="stat-card">
              <h3>❌ Pasif</h3>
              <span className="stat-number">{books.filter(b => b.status === 'inactive').length}</span>
            </div>
            <div className="stat-card">
              <h3>📥 Toplam İndirme</h3>
              <span className="stat-number">{books.reduce((sum, book) => sum + book.downloads, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin; 