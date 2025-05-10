/**
 * Generate a shareable link for a file
 * @param {string} fileId - The ID of the file to share
 * @param {number} expiryDays - Days until the link expires
 * @param {string} permission - Permission level ('view' or 'edit')
 * @returns {string} The generated share link
 */
export const generateShareLink = (fileId, expiryDays = 7, permission = 'view') => {
  // Generate a unique share ID
  const shareId = crypto.randomUUID();
  
  // Create the shareable link
  const baseUrl = window.location.origin;
  return `${baseUrl}/shared/${shareId}`;
};