import { useState } from 'react';
import { UserPlus, Users, Grid, List } from 'lucide-react';
import SearchBar from './SearchBar';
import ContactModal from './ContactModal';
import SortDropdown from './SortDropdown';
import { useContacts } from '../context/ContactContext';

const Header = () => {
  const { totalContacts, filteredContacts, addContact, viewMode, setViewMode } = useContacts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddContact = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveContact = (contactData) => {
    addContact(contactData);
    handleCloseModal();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6 space-y-4 lg:space-y-0">
            
            {/* Title and Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Contact Manager
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Manage your contacts efficiently
                </p>
              </div>
              
              {/* Contact Count */}
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      {filteredContacts.length} of {totalContacts} contacts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              
              {/* Search Bar */}
              <div className="flex-1 lg:flex-initial">
                <SearchBar />
              </div>

              {/* Sort, View Toggle and Add Button */}
              <div className="flex items-center space-x-2">
                
                {/* Sort Dropdown */}
                <SortDropdown />
                
                {/* View Mode Toggle */}
                <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Add Contact Button */}
                <button
                  onClick={handleAddContact}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Contact</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Modal */}
      {isModalOpen && (
        <ContactModal
          contact={null}
          onClose={handleCloseModal}
          onSave={handleSaveContact}
        />
      )}
    </>
  );
};

export default Header;