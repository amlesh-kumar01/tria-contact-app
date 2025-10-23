import { useState } from 'react';
import { Mail, Phone, MapPin, Building, User, Edit, Trash2 } from 'lucide-react';
import { getInitials } from '../data/mockContacts';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Avatar and Actions */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="relative">
              {!imageError && contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100"
                  onError={handleImageError}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-blue-100">
                  {getInitials(contact.name)}
                </div>
              )}
            </div>
            
            {/* Name and Position */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {contact.name}
              </h3>
              {contact.position && (
                <p className="text-sm text-gray-600 truncate">
                  {contact.position}
                </p>
              )}
              {contact.company && (
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Building className="h-3 w-3 mr-1 shrink-0" />
                  <span className="truncate">{contact.company}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className={`flex space-x-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
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
      
      {/* Contact Information */}
      <div className="px-6 pb-6 space-y-3">
        {/* Email */}
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-3 text-gray-400 shrink-0" />
          <a 
            href={`mailto:${contact.email}`}
            className="hover:text-blue-600 transition-colors duration-200 truncate"
          >
            {contact.email}
          </a>
        </div>
        
        {/* Phone */}
        {contact.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-3 text-gray-400 shrink-0" />
            <a 
              href={`tel:${contact.phone}`}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {contact.phone}
            </a>
          </div>
        )}
        
        {/* Address */}
        {contact.address && (
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-3 text-gray-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{contact.address}</span>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
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

export default ContactCard;