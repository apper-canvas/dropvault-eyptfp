/**
 * Utility function to download a file
 * @param {File} file - The file object to download
 * @param {string} filename - The name to give the downloaded file
 */
export const downloadFile = (file, filename) => {
  // Create a blob URL for the file
  const blob = new Blob([file], { type: file.type });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || file.name;
  
  // Append to the document, click it, and then remove it
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Clean up the blob URL
  URL.revokeObjectURL(url);
};