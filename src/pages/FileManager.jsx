import FileUploader from '../components/FileUploader';
import FileExplorer from '../components/FileExplorer';
import getIcon from '../utils/iconUtils';

// Icon declarations
const FileIcon = getIcon('File');

function FileManager({ files, onFileUpload }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FileIcon className="mr-2 h-6 w-6 text-primary" />
        File Manager
      </h1>
      <FileUploader onFileUpload={onFileUpload} />
      <FileExplorer files={files} />
    </div>
  );
}

export default FileManager;