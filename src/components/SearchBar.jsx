import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import { useDebounce } from '../hooks/useCustom';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, totalContacts, filteredContacts } = useContacts();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(inputValue, 300);

  // Update search query when debounced value changes
  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  // Update input value when external search query changes
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search contacts by name, email, or company..."
          className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
        />
        
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
      
      {/* Search Results Info */}
      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600">
          {filteredContacts.length > 0 ? (
            <span>
              Found <span className="font-semibold text-blue-600">{filteredContacts.length}</span> 
              {filteredContacts.length === 1 ? ' contact' : ' contacts'} 
              {totalContacts > 0 && (
                <span> out of {totalContacts}</span>
              )}
            </span>
          ) : (
            <span className="text-red-600">No contacts found for "{searchQuery}"</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;