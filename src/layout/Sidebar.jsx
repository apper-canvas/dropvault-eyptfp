import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

// Icon declarations
const DashboardIcon = getIcon('LayoutDashboard');
const FilesIcon = getIcon('Files');
const SettingsIcon = getIcon('Settings');
const FolderIcon = getIcon('Folder');
const StarIcon = getIcon('Star');
const TrashIcon = getIcon('Trash2');
const ChevronLeftIcon = getIcon('ChevronLeft');
const ChevronRightIcon = getIcon('ChevronRight');
const UsersIcon = getIcon('Users');
const LogOutIcon = getIcon('LogOut');

function Sidebar({ isOpen, setIsOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [location, setIsOpen, isOpen]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const navLinkClass = ({ isActive }) => 
    `flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-primary-light/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light' 
        : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
    }`;

  return (
    <>
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-surface-800 transform transition-transform duration-300 ease-in-out border-r border-surface-200 dark:border-surface-700 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-bold text-primary-dark dark:text-primary-light">DropVault</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent collapsed={false} navLinkClass={navLinkClass} />
      </div>
      
      {/* Desktop sidebar */}
      <div 
        className={`hidden lg:block lg:flex-shrink-0 transform transition-all duration-300 ease-in-out bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 ${
          collapsed ? 'lg:w-16' : 'lg:w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className={`p-4 flex ${collapsed ? 'justify-center' : 'justify-between'} items-center border-b border-surface-200 dark:border-surface-700`}>
            {!collapsed && <h2 className="text-xl font-bold text-primary-dark dark:text-primary-light">DropVault</h2>}
            <button 
              onClick={toggleCollapse}
              className="p-2 rounded-md text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? 
                <ChevronRightIcon className="w-5 h-5" /> : 
                <ChevronLeftIcon className="w-5 h-5" />
              }
            </button>
          </div>
          <SidebarContent collapsed={collapsed} navLinkClass={navLinkClass} />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ collapsed, navLinkClass }) {
  const navItems = [
    { path: '/', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/files', icon: FilesIcon, label: 'Files' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <div className="space-y-1 px-2">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} className={navLinkClass}>
            <item.icon className={`w-5 h-5 ${!collapsed && 'mr-3'}`} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-surface-200 dark:border-surface-700 px-2">
        <button className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700`}>
          <LogOutIcon className={`w-5 h-5 ${!collapsed && 'mr-3'}`} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;