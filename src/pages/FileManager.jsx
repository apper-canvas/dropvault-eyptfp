import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import FileExplorer from '../components/FileExplorer';
import FolderManager from '../components/FolderManager';
import TagManager from '../components/TagManager';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

// Icon declarations
const FileIcon = getIcon('File');
const FolderIcon = getIcon('Folder');
const TagIcon = getIcon('Tag');
const ShareIcon = getIcon('Share2');
const FilterIcon = getIcon('Filter');

function FileManager({ 
  files, 
  folders,
  tags,
  activeFolder,
  setActiveFolder,
  onFileUpload,
  createFolder,
  createTag,
  moveFile,
  toggleFileTag,
  shareFile,
  sharedFiles,
  setSharedFiles
}) {
  const [viewMode, setViewMode] = useState('files'); // 'files', 'shared', 'tags'
  const [showTagManager, setShowTagManager] = useState(false);

  // Get files in current folder
  const folderFiles = files.filter(file => file.folderId === activeFolder);
  
  // Get current folder details
  const currentFolder = folders.find(folder => folder.id === activeFolder);
  
  // Get child folders of current folder
  const childFolders = folders.filter(folder => folder.parentId === activeFolder);
  
  // Get breadcrumbs for navigation
  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let current = currentFolder;
    
    while (current) {
      breadcrumbs.unshift(current);
      current = folders.find(folder => folder.id === current.parentId);
    }
    
    return breadcrumbs;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FileIcon className="mr-2 h-6 w-6 text-primary" />
            File Manager
          </h1>
          
          {/* Breadcrumb navigation */}
          <div className="flex items-center mt-2 text-sm text-surface-600 dark:text-surface-400">
            {getBreadcrumbs().map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                <button 
                  onClick={() => setActiveFolder(folder.id)}
                  className="hover:text-primary transition-colors"
                >
                  {folder.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('files')}
            className={`btn-outline py-1.5 ${viewMode === 'files' ? 'bg-primary text-white hover:bg-primary-dark' : ''}`}
          >
            <FileIcon className="w-4 h-4 mr-1 inline-block" />
            My Files
          </button>
          <button 
            onClick={() => setViewMode('shared')}
            className={`btn-outline py-1.5 ${viewMode === 'shared' ? 'bg-primary text-white hover:bg-primary-dark' : ''}`}
          >
            <ShareIcon className="w-4 h-4 mr-1 inline-block" />
            Shared
          </button>
          <button 
            onClick={() => setShowTagManager(!showTagManager)}
            className={`btn-outline py-1.5 ${showTagManager ? 'bg-secondary text-white hover:bg-secondary-dark' : ''}`}
          >
            <TagIcon className="w-4 h-4 mr-1 inline-block" />
            Tags
          </button>
        </div>
      </div>
      
      {viewMode === 'files' && <FileUploader onFileUpload={onFileUpload} currentFolder={currentFolder} />}
      {showTagManager && <TagManager tags={tags} createTag={createTag} onTagClick={(tagId) => toast.info(`Files with tag: ${tags.find(t => t.id === tagId)?.name}`)} />}
      <FolderManager folders={childFolders} createFolder={createFolder} onFolderClick={setActiveFolder} />
      <FileExplorer files={viewMode === 'files' ? folderFiles : sharedFiles} folders={folders} tags={tags} toggleFileTag={toggleFileTag} moveFile={moveFile} shareFile={shareFile} setSharedFiles={setSharedFiles} />
    </div>
  );
}

export default FileManager;