// Cloudinary service for file uploads (FREE alternative to Firebase Storage)
export const cloudinaryService = {
  // Upload file to Cloudinary
  async uploadFile(file) {
    try {

      // Cloudinary configuration
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('resource_type', 'raw'); // For PDF files
      formData.append('folder', 'books'); // Organize files in a folder

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.secure_url) {
        return { 
          success: true, 
          fileURL: data.secure_url,
          publicId: data.public_id,
          storageType: 'cloudinary'
        };
      } else {
        throw new Error('Upload failed: No URL returned');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Convert file to base64 (for small files)
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // Smart upload - chooses best method based on file size
  async smartUpload(file) {
    const maxBase64Size = 1024 * 1024; // 1MB
    
    if (file.size <= maxBase64Size) {
      // Use base64 for small files (FREE, stored in Firestore)
      try {
        const base64Data = await this.fileToBase64(file);
        return { 
          success: true, 
          fileData: base64Data,
          storageType: 'base64'
        };
      } catch (error) {
        return { 
          success: false, 
          error: error.message 
        };
      }
    } else {
      // Use Cloudinary for larger files (FREE, 10GB storage)
      return await this.uploadFile(file);
    }
  }
}; 