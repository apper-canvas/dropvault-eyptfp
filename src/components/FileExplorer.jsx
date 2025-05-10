import { useState } from 'react';
import getIcon from '../utils/iconUtils';
import FileItem from './FileItem';

// Icon declarations
const SearchIcon = getIcon('Search');
const FilterIcon = getIcon('SlidersHorizontal');
const GridIcon = getIcon('Grid');
const ListIcon = getIcon('List');
const FolderIcon = getIcon('Folder');

function FileExplorer({ files }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full card overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b border-surface-200 dark:border-surface-700">
        <div className="relative w-full md:w-auto flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-surface-400 dark:text-surface-500" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-surface-100 dark:bg-surface-700 rounded-lg p-1 flex">
            <button
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-surface-600 shadow-sm' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-surface-600 shadow-sm' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <GridIcon className="w-4 h-4" />
            </button>
          </div>
          
          <button className="btn-outline flex items-center gap-2 py-1.5">
            <FilterIcon className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {filteredFiles.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'}>
            {filteredFiles.map(file => (
              <FileItem 
                key={file.id} 
                file={file} 
                viewMode={viewMode} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            {searchQuery ? (
              <>
                <SearchIcon className="h-12 w-12 text-surface-400 dark:text-surface-500 mb-4" />
                <h3 className="text-lg font-semibold mb-1">No files found</h3>
                <p className="text-surface-500 dark:text-surface-400">Try adjusting your search term</p>
              </>
            ) : (
              <>
                <FolderIcon className="h-12 w-12 text-surface-400 dark:text-surface-500 mb-4" />
                <h3 className="text-lg font-semibold mb-1">No files yet</h3>
                <p className="text-surface-500 dark:text-surface-400">Upload files to see them here</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileExplorer;