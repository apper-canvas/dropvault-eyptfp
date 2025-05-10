import { useState } from 'react';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

// Icon declarations
const FileTextIcon = getIcon('FileText');
const ImageIcon = getIcon('Image');
const PaletteIcon = getIcon('Palette');
const FileAudioIcon = getIcon('FileAudio');
const FileVideoIcon = getIcon('FileVideo');
const FileCodeIcon = getIcon('FileCode');
const FileArchiveIcon = getIcon('Archive');
const FilePenIcon = getIcon('FilePen');
const FileIcon = getIcon('File');
const MoreVerticalIcon = getIcon('MoreVertical');

function FileItem({ file, viewMode }) {
  const getFileIcon = () => {
    if (file.type.startsWith('image/')) return ImageIcon;
    if (file.type.startsWith('audio/')) return FileAudioIcon;
    if (file.type.startsWith('video/')) return FileVideoIcon;
    if (file.type.includes('pdf')) return FilePenIcon;
    if (file.type.includes('word') || file.type.includes('document')) return FileTextIcon;
    if (file.type.includes('excel') || file.type.includes('spreadsheet')) return FileCodeIcon;
    if (file.type.includes('zip') || file.type.includes('compressed')) return FileArchiveIcon;
    return FileIcon;
  };
  
  const FileIconComponent = getFileIcon();
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  if (viewMode === 'grid') {
    return (
      <div className="card flex flex-col p-3 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <div className="bg-primary-light/10 dark:bg-primary-dark/20 p-2 rounded-lg text-primary">
            <FileIconComponent className="w-6 h-6" />
          </div>
          <button className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
            <MoreVerticalIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="truncate font-medium">{file.name}</div>
        <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
          {formatFileSize(file.size)} • {format(file.uploadDate, 'MMM d, yyyy')}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700/50 transition-colors">
      <div className="flex items-center overflow-hidden">
        <FileIconComponent className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
        <span className="truncate font-medium">{file.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-surface-500 dark:text-surface-400 hidden sm:inline">{formatFileSize(file.size)}</span>
        <span className="text-sm text-surface-500 dark:text-surface-400">{format(file.uploadDate, 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
}

export default FileItem;