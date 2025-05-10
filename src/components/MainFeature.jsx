import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Icon component declarations
const UploadCloudIcon = getIcon('UploadCloud');
const FileIcon = getIcon('File');
const XIcon = getIcon('X');
const CheckCircleIcon = getIcon('CheckCircle');
const TrashIcon = getIcon('Trash2');
const FolderOpenIcon = getIcon('FolderOpen');

function MainFeature({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  
  // Process files when dropped or selected
  const processFiles = (newFiles) => {
    // Convert FileList to Array and filter out any non-file items
    const fileArray = Array.from(newFiles).filter(file => file instanceof File);
    
    if (fileArray.length === 0) {
      toast.error("No valid files were selected");
      return;
    }
    
    // Check for any files that exceed size limit (100MB for this example)
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    const oversizedFiles = fileArray.filter(file => file.size > MAX_SIZE);
    
    if (oversizedFiles.length > 0) {
      toast.error(`${oversizedFiles.length} file(s) exceed the 100MB size limit`);
      // Filter out oversized files
      const validFiles = fileArray.filter(file => file.size <= MAX_SIZE);
      setFiles(prev => [...prev, ...validFiles]);
    } else {
      setFiles(prev => [...prev, ...fileArray]);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };
  
  const openFileDialog = () => {
    fileInputRef.current.click();
  };
  
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const clearFiles = () => {
    setFiles([]);
    setUploadProgress({});
  };
  
  const uploadFiles = () => {
    if (files.length === 0) {
      toast.info("Please select files to upload");
      return;
    }
    
    setUploading(true);
    
    // Simulate file upload with progress for each file
    files.forEach((file, index) => {
      // Initialize progress for this file
      setUploadProgress(prev => ({...prev, [index]: 0}));
      
      // Simulate upload progress updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        setUploadProgress(prev => ({...prev, [index]: progress}));
        
        if (progress === 100) {
          clearInterval(interval);
          
          // Check if all files have completed
          const allCompleted = Object.values({...uploadProgress, [index]: 100})
            .every(p => p === 100);
          
          if (allCompleted) {
            setTimeout(() => {
              onFileUpload(files);
              setUploading(false);
              setFiles([]);
              setUploadProgress({});
              toast.success("All files uploaded successfully!");
            }, 500);
          }
        }
      }, 300);
    });
  };
  
  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
        <UploadCloudIcon className="h-6 w-6 text-primary" />
        <span>Upload Your Files</span>
      </h2>
      
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-200 
          ${isDragging 
            ? 'border-primary bg-primary/5 dark:bg-primary/10' 
            : 'border-surface-300 dark:border-surface-600 hover:border-primary hover:bg-surface-50 dark:hover:bg-surface-700/50'}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          multiple
        />
        
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ y: -5 }}
            className="h-16 w-16 md:h-20 md:w-20 mb-4 text-primary/80 dark:text-primary-light/80"
          >
            <UploadCloudIcon className="h-full w-full" />
          </motion.div>
          
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            {isDragging ? "Drop files here" : "Drag & Drop files here"}
          </h3>
          
          <p className="text-surface-600 dark:text-surface-300 mb-4">
            or
          </p>
          
          <button
            onClick={openFileDialog}
            className="btn-primary flex items-center gap-2"
            disabled={uploading}
          >
            <FolderOpenIcon className="h-5 w-5" />
            Browse Files
          </button>
          
          <p className="mt-4 text-sm text-surface-500 dark:text-surface-400">
            Maximum file size: 100MB
          </p>
        </div>
      </div>
      
      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileIcon className="h-5 w-5 text-primary" />
              <span>Selected Files ({files.length})</span>
            </h3>
            
            <button
              onClick={clearFiles}
              className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 flex items-center gap-1 text-sm"
              disabled={uploading}
            >
              <TrashIcon className="h-4 w-4" />
              Clear All
            </button>
          </div>
          
          <div className="space-y-3 max-h-[350px] overflow-y-auto scrollbar-hide pr-2">
            <AnimatePresence initial={false}>
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface-50 dark:bg-surface-700/30 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-surface-100 dark:bg-surface-600 flex items-center justify-center flex-shrink-0">
                      <FileIcon className="h-5 w-5 text-surface-600 dark:text-surface-300" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex items-center gap-2">
                    {uploading ? (
                      uploadProgress[index] === 100 ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 flex items-center">
                          <div className="w-16 bg-surface-200 dark:bg-surface-600 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-primary h-full transition-all duration-300"
                              style={{ width: `${uploadProgress[index] || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    ) : (
                      <button
                        onClick={() => removeFile(index)}
                        className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={uploadFiles}
              className="btn-primary flex items-center gap-2"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloudIcon className="h-5 w-5" />
                  Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to format file sizes
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default MainFeature;