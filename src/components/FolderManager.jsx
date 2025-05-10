import { useState } from 'react';
import getIcon from '../utils/iconUtils';

// Icon declarations
const FolderIcon = getIcon('Folder');
const FolderPlusIcon = getIcon('FolderPlus');
const ChevronRightIcon = getIcon('ChevronRight');

function FolderManager({ folders = [], createFolder, onFolderClick }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    
    createFolder(newFolderName);
    setNewFolderName('');
    setShowCreateForm(false);
  };
  
  if (folders.length === 0 && !showCreateForm) {
    return (
      <div className="flex justify-between items-center">
        <div className="text-sm text-surface-500 dark:text-surface-400">
          No folders in this location
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-outline flex items-center gap-2 py-1.5 px-3 text-sm"
        >
          <FolderPlusIcon className="h-4 w-4" />
          New Folder
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center">
          <FolderIcon className="mr-2 h-5 w-5 text-primary" />
          Folders
        </h2>
        
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-outline flex items-center gap-2 py-1.5 px-3 text-sm"
        >
          <FolderPlusIcon className="h-4 w-4" />
          {showCreateForm ? 'Cancel' : 'New Folder'}
        </button>
      </div>
      
      {showCreateForm && (
        <form onSubmit={handleCreateFolder} className="flex gap-2">
          <input
            type="text"
            className="input-field flex-1"
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-primary">Create</button>
        </form>
      )}
      
      {folders.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => onFolderClick(folder.id)}
              className="p-4 flex flex-col items-center justify-center text-center border border-surface-200 dark:border-surface-700 rounded-lg hover:border-primary dark:hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <div className="h-12 w-12 mb-2 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                <FolderIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium truncate w-full" title={folder.name}>
                {folder.name}
              </h3>
              <div className="flex items-center mt-2 text-surface-500 hover:text-primary dark:text-surface-400 text-sm">
                Open <ChevronRightIcon className="h-4 w-4 ml-1" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderManager;