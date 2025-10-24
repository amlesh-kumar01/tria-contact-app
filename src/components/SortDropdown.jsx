import { useState } from 'react';
import { ChevronDown, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const SortDropdown = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useContacts();
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'company', label: 'Company' },
    { value: 'dateAdded', label: 'Date Added' }
  ];

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle order if same field is selected
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with ascending order
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
    setIsOpen(false);
  };

  const getSortIcon = () => {
    if (sortOrder === 'asc') {
      return <ArrowUp className="h-4 w-4" />;
    } else {
      return <ArrowDown className="h-4 w-4" />;
    }
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Name';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      >
        <ArrowUpDown className="h-4 w-4" />
        <span className="hidden sm:inline">Sort by</span>
        <span className="font-semibold">{getCurrentSortLabel()}</span>
        {getSortIcon()}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors duration-200 ${
                  sortBy === option.value 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700'
                }`}
              >
                <span>{option.label}</span>
                {sortBy === option.value && (
                  <div className="flex items-center space-x-1">
                    {getSortIcon()}
                    <span className="text-xs">
                      {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;