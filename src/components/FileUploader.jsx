import { useState, useRef } from 'react';
import getIcon from '../utils/iconUtils';

// Icon declarations
const UploadIcon = getIcon('Upload');
const FileIcon = getIcon('File');

function FileUploader({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(Array.from(e.target.files));
      e.target.value = '';
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 transition-colors text-center cursor-pointer ${
        isDragging 
          ? 'border-primary bg-primary-light/10 dark:bg-primary-dark/10' 
          : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary hover:bg-surface-100 dark:hover:bg-surface-800'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange} 
        multiple 
      />
      <UploadIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
      <p className="text-surface-600 dark:text-surface-300 font-medium">Drag & drop files here, or click to select files</p>
      <p className="text-surface-500 dark:text-surface-400 text-sm mt-2">Files will be securely uploaded instantly</p>
    </div>
  );
}

export default FileUploader;