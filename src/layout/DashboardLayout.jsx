import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import getIcon from '../utils/iconUtils';

// Icon declarations
const SunIcon = getIcon('Sun');
const MoonIcon = getIcon('Moon');
const MenuIcon = getIcon('Menu');

function DashboardLayout({ darkMode, toggleDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-surface-50 dark:bg-surface-900">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-20 transition-opacity bg-surface-800 bg-opacity-60 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      
      {/* Sidebar component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 z-10">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md lg:hidden text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-primary-dark dark:text-primary-light">
              DropVault
            </h1>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? 
                <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                <MoonIcon className="h-5 w-5 text-surface-600" />
              }
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 bg-surface-50 dark:bg-surface-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;