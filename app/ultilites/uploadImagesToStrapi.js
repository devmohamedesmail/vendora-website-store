
import axios from 'axios';
import { config } from '../config/api';

export const uploadImagesToStrapi = async (images) => {
    const uploadedImageIds = [];

    for (const image of images) {
      const formData = new FormData();
      
      // Handle different image formats for Next.js
      if (image instanceof File) {
        // Direct File object
        formData.append('files', image);
      } else if (image.file instanceof File) {
        // Object with file property (like our current structure)
        formData.append('files', image.file);
      } else if (image.uri) {
        // React Native format (fallback)
        formData.append('files', {
          uri: image.uri,
          name: 'image.jpeg',
          type: 'image/jpeg',
        });
      } else {
        console.warn('Invalid image format:', image);
        continue;
      }

      try {
        const res = await axios.post(
          `${config.baseURL}/api/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${config.token}`, 
            },
          }
        );

        uploadedImageIds.push(res.data[0].id); 
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error(`Failed to upload image: ${error.response?.data?.error?.message || error.message}`);
      }
    }

    return uploadedImageIds;
  };