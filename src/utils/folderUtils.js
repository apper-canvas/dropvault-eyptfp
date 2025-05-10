/**
 * Get all child folders recursively
 * @param {Array} folders - Array of all folders
 * @param {string} parentId - ID of the parent folder
 * @returns {Array} Array of child folder IDs including nested children
 */
export const getAllChildFolders = (folders, parentId) => {
  const directChildren = folders.filter(f => f.parentId === parentId).map(f => f.id);
  
  // If no direct children, return empty array
  if (directChildren.length === 0) return [];
  
  // Get all nested children recursively
  const nestedChildren = directChildren.flatMap(childId => 
    getAllChildFolders(folders, childId)
  );
  
  // Return direct children plus nested children
  return [...directChildren, ...nestedChildren];
};

/**
 * Get folder breadcrumb path
 * @param {Array} folders - Array of all folders
 * @param {string} folderId - ID of the current folder
 * @returns {Array} Array of folder objects forming the path from root to current folder
 */
export const getFolderPath = (folders, folderId) => {
  const path = [];
  let currentId = folderId;
  
  while (currentId) {
    const folder = folders.find(f => f.id === currentId);
    if (!folder) break;
    
    path.unshift(folder);
    currentId = folder.parentId;
  }
  
  return path;
};