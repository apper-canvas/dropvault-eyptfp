import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { generateShareLink } from '../utils/shareUtils';

// Icon declarations
const XIcon = getIcon('X');
const LinkIcon = getIcon('Link');
const ClipboardIcon = getIcon('Clipboard');
const CheckIcon = getIcon('Check');
const SendIcon = getIcon('Send');
const ShieldIcon = getIcon('Shield');

function ShareModal({ file, onClose, onShare }) {
  const [expiry, setExpiry] = useState('7'); // Days
  const [permission, setPermission] = useState('view'); // 'view' or 'edit'
  const [email, setEmail] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);
  const linkInputRef = useRef(null);
  
  // Generate link when modal opens or settings change
  useEffect(() => {
    if (file) {
      const newLink = generateShareLink(file.id, parseInt(expiry), permission);
      setShareLink(newLink);
    }
  }, [file, expiry, permission]);
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  const copyToClipboard = () => {
    if (navigator.clipboard && linkInputRef.current) {
      navigator.clipboard.writeText(linkInputRef.current.value)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast.success('Link copied to clipboard');
        })
        .catch(() => {
          toast.error('Failed to copy link');
        });
    }
  };
  
  const handleSendEmail = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    
    // Simulate email sending
    toast.success(`Share link sent to ${email}`);
    setEmail('');
  };
  
  const handleConfirmShare = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(expiry));
    
    onShare({
      shareId: shareLink.split('/').pop(),
      shareUrl: shareLink,
      expiry: expiryDate,
      permission,
      shared: true,
      sharedAt: new Date()
    });
    
    toast.success('File shared successfully');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
          <h3 className="text-lg font-semibold">Share "{file.name}"</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Link generation */}
          <div>
            <label className="block text-sm font-medium mb-1">Share link</label>
            <div className="flex">
              <input
                ref={linkInputRef}
                type="text"
                value={shareLink}
                readOnly
                className="input-field flex-1 pr-12"
              />
              <button
                onClick={copyToClipboard}
                className="btn-outline ml-2"
                title={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          {/* Share settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry</label>
              <select
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="input-field w-full"
              >
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Permission</label>
              <select
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
                className="input-field w-full"
              >
                <option value="view">View only</option>
                <option value="edit">Allow editing</option>
              </select>
            </div>
          </div>
          
          {/* Email sharing */}
          <form onSubmit={handleSendEmail}>
            <label className="block text-sm font-medium mb-1">Share via email</label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="input-field flex-1"
              />
              <button
                type="submit"
                className="btn-primary ml-2"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
          
          <div className="flex items-center text-xs text-surface-500 dark:text-surface-400">
            <ShieldIcon className="h-3 w-3 mr-1" />
            <span>Anyone with the link can access this file until expiry</span>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t border-surface-200 dark:border-surface-700">
          <button onClick={onClose} className="btn-outline mr-2">
            Cancel
          </button>
          <button onClick={handleConfirmShare} className="btn-primary">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;