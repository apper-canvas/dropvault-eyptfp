import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import FileManager from './pages/FileManager';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import getIcon from './utils/iconUtils'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([
    { id: 'root', name: 'My Files', parentId: null }
  ]);
  const [tags, setTags] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [activeFolder, setActiveFolder] = useState('root');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Handler for file uploads
  const handleFileUpload = (newFiles) => {
    const filesWithMetadata = newFiles.map(file => ({ 
      id: crypto.randomUUID(), 
      name: file.name, 
      size: file.size, 
      type: file.type, 
      lastModified: new Date(file.lastModified), 
      uploadDate: new Date(),
      // Store the actual file object for download functionality
      folderId: activeFolder,
      tags: [],
      shared: false,
    }));
    
    setFiles(prev => [...filesWithMetadata, ...prev]);
    
    if (newFiles.length > 0) {
      toast.success(`Successfully uploaded ${newFiles.length} file${newFiles.length > 1 ? 's' : ''}`);
    }
  };

  // Folder management
  const createFolder = (name, parentId = activeFolder) => {
    const newFolder = {
      id: crypto.randomUUID(),
      name,
      parentId,
      createdAt: new Date()
    };
    
    setFolders(prev => [...prev, newFolder]);
    toast.success(`Folder "${name}" created successfully`);
    return newFolder.id;
  };

  // Tag management
  const createTag = (name, color = 'blue') => {
    const newTag = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date()
    };
    
    setTags(prev => [...prev, newTag]);
    return newTag.id;
  };

  // File organization
  const moveFile = (fileId, targetFolderId) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, folderId: targetFolderId } : file
    ));
    toast.success('File moved successfully');
  };

  // Add/remove tags from a file
  const toggleFileTag = (fileId, tagId) => {
    setFiles(prev => prev.map(file => {
      if (file.id === fileId) {
        const hasTags = file.tags?.includes(tagId);
        return { 
          ...file, 
          tags: hasTags 
            ? file.tags.filter(id => id !== tagId) 
            : [...(file.tags || []), tagId] 
        };
      }
      return file;
    }));
  };

  // Sharing functionality
  const shareFile = (fileId, expiryDays = 7) => {
    const shareLinkId = crypto.randomUUID();
    const expiryDate = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route index element={<Dashboard files={files} sharedFiles={sharedFiles} />} />
          <Route path="files" element={
            <FileManager 
              files={files} 
              folders={folders}
              tags={tags}
              activeFolder={activeFolder}
              setActiveFolder={setActiveFolder}
              onFileUpload={handleFileUpload}
              createFolder={createFolder}
              createTag={createTag}
              moveFile={moveFile}
              toggleFileTag={toggleFileTag}
              shareFile={shareFile}
              sharedFiles={sharedFiles}
              setSharedFiles={setSharedFiles}
            />
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={4000} newestOnTop theme={darkMode ? "dark" : "light"} toastClassName="text-sm font-medium" />
    </>
  );
}

export default App;