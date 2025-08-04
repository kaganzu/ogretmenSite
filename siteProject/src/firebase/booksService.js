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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

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
      const q = query(
        booksRef, 
        where('status', '==', 'active'),
        orderBy('uploadDate', 'desc')
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

  // Upload file to Firebase Storage
  async uploadFile(file, fileName) {
    try {
      const storageRef = ref(storage, `books/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { success: true, downloadURL };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
}; 