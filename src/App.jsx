import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
      fileObject: file
    }));
    
    setFiles(prev => [...filesWithMetadata, ...prev]);
    
    if (newFiles.length > 0) {
      toast.success(`Successfully uploaded ${newFiles.length} file${newFiles.length > 1 ? 's' : ''}`);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route index element={<Dashboard files={files} />} />
          <Route path="files" element={<FileManager files={files} onFileUpload={handleFileUpload} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={4000} newestOnTop theme={darkMode ? "dark" : "light"} toastClassName="text-sm font-medium" />
    </>
  );
}

export default App;