/**
 * Utility functions for handling file downloads
 */

/**
 * Creates a download for a file
 * @param {Object} file - The file object with metadata and fileObject
 * @returns {Promise} - A promise that resolves when download is initiated
 */
export const downloadFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file.fileObject) {
        throw new Error('File content not available for download');
      }

      // Create a URL for the file
      const url = URL.createObjectURL(file.fileObject);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.style.display = 'none';
      
      // Append to document, trigger click, then remove
      document.body.appendChild(a);
      a.click();
      
      // Clean up after download initiated
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        resolve();
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};