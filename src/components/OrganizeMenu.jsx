import { useRef, useEffect } from 'react';
import getIcon from '../utils/iconUtils';

// Icon declarations
const FolderIcon = getIcon('Folder');
const TagIcon = getIcon('Tag');
const CheckIcon = getIcon('Check');
const ChevronLeftIcon = getIcon('ChevronLeft');

function OrganizeMenu({ 
  folders = [], 
  tags = [], 
  onClose, 
  onMoveSelect, 
  onTagSelect, 
  selectedTags = [],
  showMoveOptions = true,
  showTagOptions = true,
  menuType = null,
  setMenuType
}) {
  const menuRef = useRef(null);
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Main menu options
  if (!menuType) {
    return (
      <div 
        ref={menuRef}
        className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-surface-800 shadow-lg rounded-lg border border-surface-200 dark:border-surface-700 z-10"
      >
        <div className="py-1">
          {showMoveOptions && (
            <button
              onClick={() => setMenuType('move')}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-surface-100 dark:hover:bg-surface-700"
            >
              <FolderIcon className="h-4 w-4" />
              <span>Move to folder</span>
            </button>
          )}
          
          {showTagOptions && (
            <button
              onClick={() => setMenuType('tag')}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-surface-100 dark:hover:bg-surface-700"
            >
              <TagIcon className="h-4 w-4" />
              <span>Manage tags</span>
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // Move to folder submenu
  if (menuType === 'move') {
    return (
      <div 
        ref={menuRef}
        className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-surface-800 shadow-lg rounded-lg border border-surface-200 dark:border-surface-700 z-10"
      >
        <div className="flex items-center p-2 border-b border-surface-200 dark:border-surface-700">
          <button 
            onClick={() => setMenuType(null)}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span className="ml-2 font-medium">Select folder</span>
        </div>
        <div className="py-1 max-h-48 overflow-y-auto">
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => {
                onMoveSelect(folder.id);
                onClose();
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-surface-100 dark:hover:bg-surface-700"
            >
              <FolderIcon className="h-4 w-4 text-primary" />
              <span className="truncate">{folder.name}</span>
            </button>
          ))}
          {folders.length === 0 && (
            <div className="px-4 py-2 text-sm text-surface-500 dark:text-surface-400">
              No folders available
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Tag management submenu
  if (menuType === 'tag') {
    return (
      <div 
        ref={menuRef}
        className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-surface-800 shadow-lg rounded-lg border border-surface-200 dark:border-surface-700 z-10"
      >
        <div className="flex items-center p-2 border-b border-surface-200 dark:border-surface-700">
          <button 
            onClick={() => setMenuType(null)}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span className="ml-2 font-medium">Manage tags</span>
        </div>
        <div className="py-1 max-h-48 overflow-y-auto">
          {tags.map(tag => {
            const isSelected = selectedTags.includes(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => onTagSelect(tag.id)}
                className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full bg-${tag.color}-500`}></span>
                  <span>{tag.name}</span>
                </div>
                
                {isSelected && (
                  <CheckIcon className="h-4 w-4 text-primary" />
                )}
              </button>
            );
          })}
          
          {tags.length === 0 && (
            <div className="px-4 py-2 text-sm text-surface-500 dark:text-surface-400">
              No tags available
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return null;
}

export default OrganizeMenu;