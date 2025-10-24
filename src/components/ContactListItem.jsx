import { Mail, Phone, MapPin, Building, User, Edit, Trash2 } from 'lucide-react';
import { getInitials } from '../data/mockContacts';
import { useState } from 'react';

const ContactListItem = ({ contact, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(contact);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact.id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 p-4">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="shrink-0">
          {!imageError && contact.avatar ? (
            <img
              src={contact.avatar}
              alt={contact.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"
              onError={handleImageError}
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-blue-100">
              {getInitials(contact.name)}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {contact.name}
              </h3>
              <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                  <a 
                    href={`mailto:${contact.email}`}
                    className="hover:text-blue-600 transition-colors duration-200 truncate"
                  >
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                    <a 
                      href={`tel:${contact.phone}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
              {(contact.company || contact.position) && (
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                  {contact.company && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Building className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                      <span className="truncate">{contact.company}</span>
                    </div>
                  )}
                  {contact.position && (
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                      <span className="truncate">{contact.position}</span>
                    </div>
                  )}
                </div>
              )}
              {contact.address && (
                <div className="mt-1 flex items-start text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{contact.address}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                title="Edit contact"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                title="Delete contact"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>Added {new Date(contact.dateAdded).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;