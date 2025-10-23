import { useState } from 'react';
import { useContacts } from '../context/ContactContext';
import ContactCard from './ContactCard';
import LoadingSpinner from './LoadingSpinner';
import ContactModal from './ContactModal';
import { Users, UserPlus } from 'lucide-react';

const ContactList = () => {
  const { 
    paginatedContacts, 
    loading, 
    error, 
    filteredContacts,
    searchQuery,
    deleteContact,
    updateContact
  } = useContacts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleSaveContact = (contactData) => {
    if (editingContact) {
      updateContact({ ...contactData, id: editingContact.id });
    }
    handleCloseModal();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Contacts</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {searchQuery ? (
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600 mb-4">
              No contacts match your search for "{searchQuery}"
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search terms or add a new contact
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts yet</h3>
            <p className="text-gray-600 mb-4">
              Get started by adding your first contact
            </p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Contact</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={handleEdit}
            onDelete={deleteContact}
          />
        ))}
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <ContactModal
          contact={editingContact}
          onClose={handleCloseModal}
          onSave={handleSaveContact}
        />
      )}
    </>
  );
};

export default ContactList;