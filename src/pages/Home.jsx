import { useState } from 'react';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

// Icon component declarations
const FileIcon = getIcon('FileText');
const ShieldIcon = getIcon('Shield');
const ShareIcon = getIcon('Share2');
const FolderIcon = getIcon('Folder');

function Home() {
  const [recentFiles, setRecentFiles] = useState([]);
  
  // Handler to be passed to MainFeature for adding new files
  const handleFileUpload = (files) => {
    const newFiles = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified),
      uploadDate: new Date()
    }));
    
    setRecentFiles(prev => [...newFiles, ...prev].slice(0, 5));
    
    if (files.length > 0) {
      toast.success(`Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''}`);
    }
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient">
          Securely Upload & Manage Your Files
        </h1>
        <p className="text-surface-600 dark:text-surface-300 text-lg md:text-xl">
          DropVault helps you store, organize, and share your files with confidence.
        </p>
      </section>
      
      {/* Main Feature Component */}
      <MainFeature onFileUpload={handleFileUpload} />
      
      {/* Recently Uploaded Files */}
      {recentFiles.length > 0 && (
        <section className="card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FileIcon className="mr-2 h-5 w-5 text-primary" />
            Recent Uploads
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-surface-200 dark:border-surface-700">
                <tr>
                  <th className="pb-2 font-medium text-surface-500 dark:text-surface-400 text-sm">Name</th>
                  <th className="pb-2 font-medium text-surface-500 dark:text-surface-400 text-sm">Type</th>
                  <th className="pb-2 font-medium text-surface-500 dark:text-surface-400 text-sm">Size</th>
                  <th className="pb-2 font-medium text-surface-500 dark:text-surface-400 text-sm">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file) => (
                  <tr key={file.id} className="border-b border-surface-100 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700/50">
                    <td className="py-3 pr-4">{file.name}</td>
                    <td className="py-3 pr-4">{file.type || 'Unknown'}</td>
                    <td className="py-3 pr-4">{formatFileSize(file.size)}</td>
                    <td className="py-3">
                      {file.uploadDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="h-12 w-12 rounded-xl bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center mb-4">
            <ShieldIcon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
          <p className="text-surface-600 dark:text-surface-300">
            Industry-leading encryption keeps your files safe and private.
          </p>
        </div>
        
        <div className="card p-6">
          <div className="h-12 w-12 rounded-xl bg-secondary-light/20 dark:bg-secondary-dark/20 flex items-center justify-center mb-4">
            <FolderIcon className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Organization</h3>
          <p className="text-surface-600 dark:text-surface-300">
            Easily organize files with folders, tags, and powerful search.
          </p>
        </div>
        
        <div className="card p-6">
          <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
            <ShareIcon className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2">Simple Sharing</h3>
          <p className="text-surface-600 dark:text-surface-300">
            Generate secure links to share files with colleagues or friends.
          </p>
        </div>
      </section>
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

export default Home;