import { useState } from 'react';
import getIcon from '../utils/iconUtils';
import { downloadFile } from '../utils/downloadUtils';
import OrganizeMenu from './OrganizeMenu';

// Icon declarations
const DownloadIcon = getIcon('Download');
const MoreVerticalIcon = getIcon('MoreVertical');
const ShareIcon = getIcon('Share2');
const TagIcon = getIcon('Tag');
const FolderIcon = getIcon('Folder');

function FileItem({ 
  file, 
  viewMode = 'list', 
  tags = [], 
  folders = [],
  onShare, 
  onTagToggle, 
  onMove,
  fileTags = [],
  showMoveOptions = false,
  showTagOptions = false 
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState(null); // 'move', 'tag', null

  // Get file icon based on type
  const getFileIcon = () => {
    const type = file.type || '';
    
    if (type.includes('image')) return getIcon('Image');
    if (type.includes('pdf')) return getIcon('FileText');
    if (type.includes('word') || type.includes('document')) return getIcon('FileText');
    if (type.includes('excel') || type.includes('sheet')) return getIcon('FileText');
    if (type.includes('video')) return getIcon('Film');
    if (type.includes('audio')) return getIcon('Music');
    if (type.includes('zip') || type.includes('compressed')) return getIcon('Archive');
    
    return getIcon('File');
  };
  
  const FileTypeIcon = getFileIcon();
  
  const handleDownload = () => {
    if (file.fileObject) {
      downloadFile(file.fileObject, file.name);
    }
  };
  
  // Format file upload date
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format file size
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`group relative ${viewMode === 'list' ? 'flex items-center' : 'flex flex-col'} p-3 rounded-lg border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all duration-200`}>
      {/* File icon/preview */}
      <div className={`${viewMode === 'list' ? 'mr-3 h-10 w-10' : 'mb-3 h-24 w-full'} bg-surface-100 dark:bg-surface-800 rounded-lg flex items-center justify-center overflow-hidden`}>
        {file.type?.includes('image') ? (
          <img 
            src={file.fileObject ? URL.createObjectURL(file.fileObject) : ''}
            alt={file.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <FileTypeIcon className={`${viewMode === 'list' ? 'h-5 w-5' : 'h-12 w-12'} text-primary`} />
        )}
      </div>
      
      {/* File details */}
      <div className={`${viewMode === 'list' ? 'flex-1 min-w-0 mr-2' : 'w-full'}`}>
        <h3 className="font-medium truncate" title={file.name}>{file.name}</h3>
        
        <div className={`flex ${viewMode === 'grid' ? 'flex-col text-xs mt-1' : 'text-sm'} text-surface-500 dark:text-surface-400`}>
          <span>{formatSize(file.size)}</span>
          {viewMode === 'grid' && <span className="mt-1">{formatDate(file.uploadDate)}</span>}
          {viewMode === 'list' && <span className="mx-2">•</span>}
          {viewMode === 'list' && <span>{formatDate(file.uploadDate)}</span>}
        </div>
        
        {/* Tags display */}
        {fileTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {fileTags.map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              if (!tag) return null;
              return (
                <span key={tagId} className={`text-xs px-2 py-0.5 rounded-full bg-${tag.color}-100 text-${tag.color}-800 dark:bg-${tag.color}-900 dark:text-${tag.color}-200`}>
                  {tag.name}
                </span>
              );
            })}
          </div>
        )}
      </div>
      
      {/* File actions */}
      <div className={`${viewMode === 'list' ? 'flex' : 'absolute top-2 right-2 opacity-0 group-hover:opacity-100'} items-center space-x-1`}>
        <button 
          onClick={handleDownload}
          className="p-1.5 rounded-full text-surface-600 hover:text-primary hover:bg-surface-200 dark:hover:bg-surface-700"
          title="Download"
        >
          <DownloadIcon className="h-4 w-4" />
        </button>
        
        {onShare && (
          <button 
            onClick={onShare}
            className="p-1.5 rounded-full text-surface-600 hover:text-primary hover:bg-surface-200 dark:hover:bg-surface-700"
            title="Share"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
        )}
        
        {(showMoveOptions || showTagOptions) && (
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-full text-surface-600 hover:text-primary hover:bg-surface-200 dark:hover:bg-surface-700"
              title="More options"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <OrganizeMenu 
                folders={folders}
                tags={tags}
                onClose={() => {
                  setShowMenu(false);
                  setMenuType(null);
                }}
                onMoveSelect={onMove}
                onTagSelect={onTagToggle}
                selectedTags={fileTags}
                showMoveOptions={showMoveOptions}
                showTagOptions={showTagOptions}
                menuType={menuType}
                setMenuType={setMenuType}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileItem;