# Cloudinary Setup Guide

Bu proje artık Cloudinary kullanarak dosya yükleme işlemlerini gerçekleştirmektedir. Firebase Storage yerine ücretsiz Cloudinary servisini kullanıyoruz.

## 🎯 **Neden Cloudinary?**

- ✅ **10 GB** ücretsiz depolama
- ✅ **10 GB** ücretsiz bant genişliği/ay
- ✅ **25 GB** ücretsiz yükleme/ay
- ✅ **Billing plan gerektirmez**
- ✅ **Kredi kartı gerektirmez**

## 📋 **Adım Adım Kurulum**

### **1. Cloudinary Hesabı Oluşturma**

1. [Cloudinary](https://cloudinary.com/) adresine gidin
2. "Sign Up For Free" butonuna tıklayın
3. E-posta, şifre ve isim bilgilerinizi girin
4. Hesabınızı doğrulayın

### **2. Cloudinary Dashboard'dan Bilgileri Alma**

1. Cloudinary Dashboard'a giriş yapın
2. **Cloud Name**'i not edin (örn: `my-cloud-name`)
3. **Settings** → **Upload** sekmesine gidin
4. **Upload presets** bölümünde yeni bir preset oluşturun:
   - **Preset name**: `books-upload` (veya istediğiniz bir isim)
   - **Signing Mode**: `Unsigned`
   - **Folder**: `books` (dosyaları organize etmek için)
   - **Resource type**: `Raw` (PDF dosyaları için)
   - **Save** butonuna tıklayın

### **3. Environment Variables Ekleme**

Proje kök dizininde `.env` dosyası oluşturun:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=dzvfpepqo
VITE_CLOUDINARY_UPLOAD_PRESET=books-upload
```

### **4. Cloudinary Service Dosyasını Güncelleme**

`src/firebase/cloudinaryService.js` dosyasında şu değerleri güncelleyin:

```javascript
// Bu değerleri kendi Cloudinary bilgilerinizle değiştirin
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzvfpepqo';
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'YOUR_UPLOAD_PRESET';
```

### **5. Uygulamayı Test Etme**

1. `npm run dev` komutuyla uygulamayı başlatın  
2. `/admin-login` sayfasına gidin
3. Admin girişi yapın
4. Kitap yüklemeyi test edin

## 🔧 **Nasıl Çalışır?**

### **Akıllı Yükleme Sistemi:**

1. **Dosya boyutu ≤ 1MB**: Base64 olarak Firestore'da saklanır (ÜCRETSİZ)
2. **Dosya boyutu > 1MB**: Cloudinary'ye yüklenir (ÜCRETSİZ)

### **Dosya İndirme:**

- **Base64 dosyalar**: Doğrudan tarayıcıdan indirilir
- **Cloudinary dosyalar**: Cloudinary URL'inden indirilir

## 📊 **Kullanım Limitleri**

### **Cloudinary Free Tier:**
- **Depolama**: 10 GB
- **Bant genişliği**: 10 GB/ay
- **Yükleme**: 25 GB/ay
- **Dosya boyutu**: 100 MB'a kadar

### **Firebase Free Tier:**
- **Firestore**: 1 GB depolama
- **Authentication**: Sınırsız kullanıcı
- **Storage**: Billing plan gerektirir

## 🚨 **Önemli Notlar**

1. **Dosya boyutu sınırı**: 100 MB'a kadar
2. **Desteklenen formatlar**: PDF, DOC, DOCX, vb.
3. **Güvenlik**: Upload preset'iniz unsigned olmalı
4. **Organizasyon**: Dosyalar `books/` klasöründe saklanır

## 🔍 **Sorun Giderme**

### **Yaygın Hatalar:**

1. **"Upload failed"**
   - Cloudinary bilgilerinizi kontrol edin
   - Dosya boyutunu kontrol edin (100MB limit)

2. **"Invalid upload preset"**
   - Upload preset'inizin doğru olduğundan emin olun
   - Preset'in unsigned olduğunu kontrol edin

3. **"Network error"**
   - İnternet bağlantınızı kontrol edin
   - Cloudinary servisinin çalıştığından emin olun

### **Debug İpuçları:**

- Browser console'da hata mesajlarını kontrol edin
- Network sekmesinde Cloudinary API çağrılarını inceleyin
- Cloudinary Dashboard'da yüklenen dosyaları kontrol edin

## ✅ **Test Etme**

1. **Küçük dosya testi** (< 1MB): Base64 storage
2. **Büyük dosya testi** (> 1MB): Cloudinary storage
3. **İndirme testi**: Her iki tür dosyayı da indirin
4. **Admin paneli**: Dosya yönetimini test edin

## 🎉 **Tebrikler!**

Artık ücretsiz, güvenli ve ölçeklenebilir bir dosya yükleme sisteminiz var!

- ✅ Firebase Authentication (Güvenli giriş)
- ✅ Firestore Database (Veri saklama)
- ✅ Cloudinary Storage (Dosya yükleme)
- ✅ Base64 Storage (Küçük dosyalar için)
- ✅ Tamamen ücretsiz
- ✅ Billing plan gerektirmez 