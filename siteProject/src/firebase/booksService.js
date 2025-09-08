import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

// Books service for Firestore
export const booksService = {
  // Get all books
  async getAllBooks() {
    try {
      const booksRef = collection(db, 'books');
      const q = query(booksRef, orderBy('uploadDate', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, books };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Get active books only
  async getActiveBooks() {
    try {
      const booksRef = collection(db, 'books');
      // Geçici olarak sadece status filtresini kullanalım
      const q = query(
        booksRef, 
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(q);
      
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, books };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Add a new book
  async addBook(bookData) {
    try {
      const booksRef = collection(db, 'books');
      const docRef = await addDoc(booksRef, {
        ...bookData,
        uploadDate: new Date().toISOString(),
        downloads: 0,
        status: 'active'
      });
      
      return { success: true, id: docRef.id };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Update book downloads count
  async updateBookDownloads(bookId) {
    try {
      const bookRef = doc(db, 'books', bookId);
      const bookDoc = await getDoc(bookRef);
      
      if (bookDoc.exists()) {
        const currentDownloads = bookDoc.data().downloads || 0;
        await updateDoc(bookRef, {
          downloads: currentDownloads + 1
        });
        return { success: true };
      }
      
      return { success: false, error: 'Book not found' };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Update book status (active/inactive)
  async updateBookStatus(bookId, status) {
    try {
      const bookRef = doc(db, 'books', bookId);
      await updateDoc(bookRef, { status });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Delete a book
  async deleteBook(bookId) {
    try {
      const bookRef = doc(db, 'books', bookId);
      await deleteDoc(bookRef);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Upload file to Cloudinary
  // Upload file to Cloudinary
async uploadFile(file) {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'books');
    // Eğer özel bir public_id gerekiyorsa burada kullan
    formData.append('public_id', 'abface12-f9f4-43cd-ae4d-c2d64617bee8');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return { success: true, downloadURL: data.secure_url };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
}; 