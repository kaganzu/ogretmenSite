# Firebase Setup Guide

Bu proje artık Firebase kullanarak admin girişi ve kitap verilerini yönetmektedir. Aşağıdaki adımları takip ederek Firebase'i yapılandırın.

## 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Create a project" veya "Proje oluştur" butonuna tıklayın
3. Proje adını girin (örn: "babam-site-project")
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. "Create project" butonuna tıklayın

## 2. Firebase Servislerini Etkinleştirme

### Authentication
1. Sol menüden "Authentication" seçin
2. "Get started" butonuna tıklayın
3. "Sign-in method" sekmesine gidin
4. "Email/Password" sağlayıcısını etkinleştirin
5. "Save" butonuna tıklayın

### Firestore Database
1. Sol menüden "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. "Start in test mode" seçin (geliştirme için)
4. Veritabanı konumunu seçin (örn: europe-west3)
5. "Done" butonuna tıklayın

### Storage
1. Sol menüden "Storage" seçin
2. "Get started" butonuna tıklayın
3. "Start in test mode" seçin (geliştirme için)
4. "Done" butonuna tıklayın

## 3. Firebase Yapılandırması

### Web Uygulaması Ekleme
1. Firebase Console'da proje genel bakış sayfasına gidin
2. "</>" simgesine tıklayın (Web uygulaması ekle)
3. Uygulama takma adı girin (örn: "babam-site")
4. "Register app" butonuna tıklayın
5. Firebase yapılandırma kodunu kopyalayın

### Yapılandırma Dosyasını Güncelleme
1. `src/firebase/config.js` dosyasını açın
2. `firebaseConfig` nesnesini Firebase Console'dan aldığınız bilgilerle güncelleyin:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## 4. Admin Kullanıcısı Oluşturma

### Firebase Console'dan
1. "Authentication" > "Users" sekmesine gidin
2. "Add user" butonuna tıklayın
3. E-posta ve şifre girin (örn: admin@babam.com)
4. "Add user" butonuna tıklayın

### Veya Programatik Olarak
Firebase Console'da "Authentication" > "Users" bölümünden manuel olarak kullanıcı ekleyebilirsiniz.

## 5. Güvenlik Kuralları

### Firestore Güvenlik Kuralları
Firestore Database > Rules sekmesinde aşağıdaki kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kitaplar koleksiyonu - herkes okuyabilir, sadece admin yazabilir
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Güvenlik Kuralları
Storage > Rules sekmesinde aşağıdaki kuralları ekleyin:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Kitaplar klasörü - herkes okuyabilir, sadece admin yazabilir
    match /books/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 6. Uygulamayı Test Etme

1. `npm run dev` komutuyla uygulamayı başlatın
2. `/admin-login` sayfasına gidin
3. Firebase'de oluşturduğunuz admin kullanıcısı bilgileriyle giriş yapın
4. Admin panelinden kitap yüklemeyi test edin
5. Ana sayfadan kitapları görüntülemeyi ve indirmeyi test edin

## 7. Üretim Ortamı İçin

### Güvenlik Kurallarını Güncelleyin
Üretim ortamında daha sıkı güvenlik kuralları kullanın:

```javascript
// Firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@babam.com";
    }
  }
}

// Storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /books/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@babam.com";
    }
  }
}
```

### Environment Variables
Üretim ortamında Firebase yapılandırmasını environment variables olarak saklayın:

1. Proje kök dizininde `.env` dosyası oluşturun:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

2. `.env` dosyasını `.gitignore` dosyasına ekleyin:

```gitignore
.env
.env.local
.env.production
```

3. Yapılandırma dosyası zaten environment variables'ları desteklemektedir:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project-id.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
};
```

## Sorun Giderme

### Yaygın Hatalar
1. **"Firebase App named '[DEFAULT]' already exists"**: Firebase'i birden fazla kez initialize etmeyin
2. **"Permission denied"**: Güvenlik kurallarını kontrol edin
3. **"User not found"**: Authentication'da kullanıcının var olduğundan emin olun

### Debug İpuçları
- Browser console'da Firebase hatalarını kontrol edin
- Firebase Console'da Authentication ve Firestore loglarını inceleyin
- Network sekmesinde Firebase API çağrılarını kontrol edin

## Özellikler

✅ **Admin Authentication**: Firebase Authentication ile güvenli giriş
✅ **Kitap Yönetimi**: Firestore ile kitap verilerini saklama
✅ **Dosya Yükleme**: Firebase Storage ile PDF dosyalarını saklama
✅ **İndirme Sayacı**: Kitap indirme sayılarını takip etme
✅ **Gerçek Zamanlı Güncellemeler**: Firestore ile otomatik veri senkronizasyonu
✅ **Güvenlik**: Firebase güvenlik kuralları ile veri koruması 