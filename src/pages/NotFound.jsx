import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icon component declarations
const AlertTriangleIcon = getIcon('AlertTriangle');
const ArrowLeftIcon = getIcon('ArrowLeft');
const HomeIcon = getIcon('Home');

function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="flex justify-center mb-6">
          <AlertTriangleIcon className="h-24 w-24 text-accent" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-300 text-lg mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-row justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <HomeIcon className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-outline flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;