import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';
import getIcon from '../utils/iconUtils';
import FileItem from '../components/FileItem';
import { connectToActivityStream, disconnectFromActivityStream } from '../utils/activityService';

// Icon declarations
const FolderIcon = getIcon('Folder');
const UploadIcon = getIcon('Upload');
const DownloadIcon = getIcon('Download');
const BarChartIcon = getIcon('BarChart');
const FileIcon = getIcon('FileText');
const UsersIcon = getIcon('Users');
const PlusIcon = getIcon('Plus');
const RefreshCwIcon = getIcon('RefreshCw');

function Dashboard({ files }) {
  const [chartOptions, setChartOptions] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const recentFiles = files.slice(0, 5);
  const totalStorage = files.reduce((total, file) => total + file.size, 0);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Prepare chart data
  useEffect(() => {
    // Get theme colors from CSS variables
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#cbd5e1' : '#475569';
    
    setChartOptions({
      chart: {
        fontFamily: 'Inter, ui-sans-serif, system-ui',
        toolbar: { show: false },
        zoom: { enabled: false },
        foreColor: textColor,
      },
      colors: ['#3B82F6', '#8B5CF6', '#F59E0B'],
      dataLabels: { enabled: false },
      legend: { show: false },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { show: false },
      grid: { show: false },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
    });
  }, []);

  // Connect to activity data service
  useEffect(() => {
    // Handle incoming activity data updates
    const handleActivityUpdate = (data) => {
      setIsUpdating(true);
      setActivityData(data);
      setLastUpdated(new Date());
      
      // Reset updating state after animation
      setTimeout(() => setIsUpdating(false), 700);
    };
    
    // Connect to data stream and get cleanup function
    const intervalId = connectToActivityStream(handleActivityUpdate);
    
    return () => disconnectFromActivityStream(intervalId, handleActivityUpdate);
  }, []);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format the last updated time
  const formatLastUpdated = (date) => {
    if (!date) return 'Not yet updated';
    
    return `Last updated ${format(date, 'hh:mm:ss a')}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-surface-500 dark:text-surface-400">Storage Used</h3>
            <div className="bg-primary-light/10 dark:bg-primary-dark/20 p-2 rounded-lg text-primary">
              <FolderIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{formatFileSize(totalStorage)}</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">
            {files.length} file{files.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-surface-500 dark:text-surface-400">Uploaded</h3>
            <div className="bg-secondary-light/10 dark:bg-secondary-dark/20 p-2 rounded-lg text-secondary">
              <UploadIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{files.length}</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">
            This month
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-surface-500 dark:text-surface-400">Downloaded</h3>
            <div className="bg-accent/10 p-2 rounded-lg text-accent">
              <DownloadIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">0</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">
            This month
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-surface-500 dark:text-surface-400">Users</h3>
            <div className="bg-primary-light/10 dark:bg-primary-dark/20 p-2 rounded-lg text-primary">
              <UsersIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">1</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">
            Active user
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card overflow-hidden lg:col-span-2">
            <div>
              <h2 className="font-bold text-lg flex items-center">
                <BarChartIcon className="mr-2 h-5 w-5 text-primary" />
                Activity Overview
              </h2>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                {formatLastUpdated(lastUpdated)}
              </p>
            </div>
            <div className="flex items-center">
              <RefreshCwIcon 
                className={`h-5 w-5 text-primary ${isUpdating ? 'animate-spin' : ''}`} 
              />
            </div>
            </h2>
          </div>
            {chartOptions && activityData ? (
            {chartOptions && (
              <Chart 
                series={activityData.series} 
                ]} 
                type="line" 
                height={250} 
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCwIcon 
                    className="h-10 w-10 text-primary animate-spin mx-auto mb-4"
                  />
                  <p className="text-surface-600 dark:text-surface-400">
                    Loading activity data...
                  </p>
                  <p className="text-sm text-surface-500 dark:text-surface-500 mt-2">
                    Connecting to real-time data stream
                  </p>
                </div>
              </div>
              />
            )}
          </div>
        </div>
        
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-700 p-4">
            <h2 className="font-bold text-lg flex items-center">
              <FileIcon className="mr-2 h-5 w-5 text-secondary" />
              Recent Files
            </h2>
            <Link to="/files" className="btn-outline py-1 px-3 flex items-center gap-1 text-sm">
              <PlusIcon className="h-4 w-4" />
              <span>Add Files</span>
            </Link>
          </div>
          <div>
            {recentFiles.length > 0 ? (
              <div className="divide-y divide-surface-100 dark:divide-surface-700">
                {recentFiles.map(file => (
                  <FileItem key={file.id} file={file} viewMode="list" />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <FolderIcon className="h-10 w-10 text-surface-400 mx-auto mb-3" />
                <p className="text-surface-500 dark:text-surface-400 mb-3">No files uploaded yet</p>
                <Link to="/files" className="btn-primary inline-flex items-center">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Files
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;