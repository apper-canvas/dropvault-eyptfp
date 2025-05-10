import { useState } from 'react';
import getIcon from '../utils/iconUtils';

// Icon declarations
const TagIcon = getIcon('Tag');
const PlusIcon = getIcon('Plus');

// Available tag colors
const tagColors = [
  { name: 'blue', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { name: 'red', class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { name: 'green', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { name: 'yellow', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  { name: 'purple', class: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  { name: 'pink', class: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
  { name: 'indigo', class: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
];

function TagManager({ tags = [], createTag, onTagClick }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  
  const handleCreateTag = (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    
    createTag(newTagName, selectedColor);
    setNewTagName('');
    setShowCreateForm(false);
  };
  
  return (
    <div className="card p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center">
          <TagIcon className="mr-2 h-5 w-5 text-primary" />
          Tags
        </h2>
        
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-outline flex items-center gap-2 py-1.5 px-3 text-sm"
        >
          <PlusIcon className="h-4 w-4" />
          {showCreateForm ? 'Cancel' : 'New Tag'}
        </button>
      </div>
      
      {showCreateForm && (
        <form onSubmit={handleCreateTag} className="space-y-3">
          <input
            type="text"
            className="input-field w-full"
            placeholder="Tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-surface-600 dark:text-surface-400">Color:</span>
            {tagColors.map(color => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`w-6 h-6 rounded-full border-2 ${selectedColor === color.name ? 'border-primary' : 'border-transparent'} bg-${color.name}-500 hover:opacity-80 transition-opacity`}
                aria-label={`Select ${color.name} color`}
              ></button>
            ))}
            <button type="submit" className="btn-primary ml-auto">Create Tag</button>
          </div>
        </form>
      )}
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => onTagClick(tag.id)}
            className={`px-3 py-1 rounded-full bg-${tag.color}-100 text-${tag.color}-800 dark:bg-${tag.color}-900 dark:text-${tag.color}-200 hover:bg-${tag.color}-200 dark:hover:bg-${tag.color}-800 transition-colors`}
          >
            <div className="flex items-center gap-1">
              <TagIcon className="h-3 w-3" />
              <span>{tag.name}</span>
            </div>
          </button>
        ))}
        
        {tags.length === 0 && !showCreateForm && (
          <div className="text-sm text-surface-500 dark:text-surface-400">
            No tags created yet. Create a tag to organize your files.
          </div>
        )}
      </div>
    </div>
  );
}

export default TagManager;