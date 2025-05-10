import { useState } from 'react';
import getIcon from '../utils/iconUtils';

// Icon declarations
const SettingsIcon = getIcon('Settings');
const UserIcon = getIcon('User');
const NotificationIcon = getIcon('Bell');
const LockIcon = getIcon('Lock');
const HelpIcon = getIcon('HelpCircle');

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <SettingsIcon className="mr-2 h-6 w-6 text-primary" />
        Settings
      </h1>
      
      <div className="space-y-6">
        <div className="card overflow-hidden">
          <div className="border-b border-surface-200 dark:border-surface-700 p-4 flex items-center">
            <UserIcon className="mr-2 h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg">Profile</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="input-field"
                placeholder="your@email.com" 
                defaultValue="user@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                className="input-field"
                placeholder="Your Name" 
                defaultValue="John Doe"
              />
            </div>
            <button className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="card overflow-hidden">
          <div className="border-b border-surface-200 dark:border-surface-700 p-4 flex items-center">
            <NotificationIcon className="mr-2 h-5 w-5 text-secondary" />
            <h2 className="font-bold text-lg">Preferences</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Notifications</p>
                <p className="text-sm text-surface-500 dark:text-surface-400">Receive notifications about file activities</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="notifications" 
                  id="notifications" 
                  className="hidden peer" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <label
                  htmlFor="notifications"
                  className="block overflow-hidden h-6 rounded-full bg-surface-300 dark:bg-surface-600 cursor-pointer peer-checked:bg-primary"
                >
                  <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Sync Files</p>
                <p className="text-sm text-surface-500 dark:text-surface-400">Automatically sync files between devices</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="autoSync" 
                  id="autoSync" 
                  className="hidden peer" 
                  checked={autoSync}
                  onChange={() => setAutoSync(!autoSync)}
                />
                <label
                  htmlFor="autoSync"
                  className="block overflow-hidden h-6 rounded-full bg-surface-300 dark:bg-surface-600 cursor-pointer peer-checked:bg-primary"
                >
                  <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card overflow-hidden">
          <div className="border-b border-surface-200 dark:border-surface-700 p-4 flex items-center">
            <LockIcon className="mr-2 h-5 w-5 text-accent" />
            <h2 className="font-bold text-lg">Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">Change Password</label>
              <input 
                type="password" 
                id="password" 
                className="input-field mb-2"
                placeholder="Current password" 
              />
              <input 
                type="password" 
                className="input-field mb-2"
                placeholder="New password" 
              />
              <input 
                type="password" 
                className="input-field"
                placeholder="Confirm new password" 
              />
            </div>
            <button className="btn-primary">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;