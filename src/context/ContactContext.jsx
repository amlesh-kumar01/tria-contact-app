import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import { mockContacts } from '../data/mockContacts.js';

// Action types
const CONTACT_ACTIONS = {
  SET_CONTACTS: 'SET_CONTACTS',
  ADD_CONTACT: 'ADD_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_ITEMS_PER_PAGE: 'SET_ITEMS_PER_PAGE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  contacts: [],
  filteredContacts: [],
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 6,
  loading: false,
  error: null,
  totalContacts: 0
};

// Reducer function
const contactReducer = (state, action) => {
  switch (action.type) {
    case CONTACT_ACTIONS.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        filteredContacts: action.payload,
        totalContacts: action.payload.length,
        loading: false
      };

    case CONTACT_ACTIONS.ADD_CONTACT:
      const newContacts = [...state.contacts, action.payload];
      const newFilteredContacts = state.searchQuery 
        ? newContacts.filter(contact => 
            contact.name.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : newContacts;
      
      return {
        ...state,
        contacts: newContacts,
        filteredContacts: newFilteredContacts,
        totalContacts: newFilteredContacts.length
      };

    case CONTACT_ACTIONS.UPDATE_CONTACT:
      const updatedContacts = state.contacts.map(contact =>
        contact.id === action.payload.id ? action.payload : contact
      );
      const updatedFilteredContacts = state.searchQuery 
        ? updatedContacts.filter(contact => 
            contact.name.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : updatedContacts;
      
      return {
        ...state,
        contacts: updatedContacts,
        filteredContacts: updatedFilteredContacts,
        totalContacts: updatedFilteredContacts.length
      };

    case CONTACT_ACTIONS.DELETE_CONTACT:
      const remainingContacts = state.contacts.filter(contact => contact.id !== action.payload);
      const remainingFilteredContacts = state.searchQuery 
        ? remainingContacts.filter(contact => 
            contact.name.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : remainingContacts;
      
      return {
        ...state,
        contacts: remainingContacts,
        filteredContacts: remainingFilteredContacts,
        totalContacts: remainingFilteredContacts.length,
        currentPage: state.currentPage > Math.ceil(remainingFilteredContacts.length / state.itemsPerPage) 
          ? Math.max(1, Math.ceil(remainingFilteredContacts.length / state.itemsPerPage))
          : state.currentPage
      };

    case CONTACT_ACTIONS.SET_SEARCH_QUERY:
      const filtered = action.payload
        ? state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            contact.email.toLowerCase().includes(action.payload.toLowerCase()) ||
            contact.company.toLowerCase().includes(action.payload.toLowerCase())
          )
        : state.contacts;
      
      return {
        ...state,
        searchQuery: action.payload,
        filteredContacts: filtered,
        totalContacts: filtered.length,
        currentPage: 1 // Reset to first page when searching
      };

    case CONTACT_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case CONTACT_ACTIONS.SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1 // Reset to first page when changing items per page
      };

    case CONTACT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case CONTACT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CONTACT_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Create context
const ContactContext = createContext();

// Custom hook to use the contact context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

// Context provider component
export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Load initial contacts
  useEffect(() => {
    dispatch({ type: CONTACT_ACTIONS.SET_LOADING, payload: true });
    
    // Simulate API call delay
    setTimeout(() => {
      dispatch({ type: CONTACT_ACTIONS.SET_CONTACTS, payload: mockContacts });
    }, 500);
  }, []);

  // Memoized values and functions
  const value = useMemo(() => {
    // Calculate pagination
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const paginatedContacts = state.filteredContacts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(state.totalContacts / state.itemsPerPage);

    // Actions
    const addContact = (contactData) => {
      const newContact = {
        ...contactData,
        id: Math.max(...state.contacts.map(c => c.id), 0) + 1,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      dispatch({ type: CONTACT_ACTIONS.ADD_CONTACT, payload: newContact });
    };

    const updateContact = (contactData) => {
      dispatch({ type: CONTACT_ACTIONS.UPDATE_CONTACT, payload: contactData });
    };

    const deleteContact = (contactId) => {
      dispatch({ type: CONTACT_ACTIONS.DELETE_CONTACT, payload: contactId });
    };

    const setSearchQuery = (query) => {
      dispatch({ type: CONTACT_ACTIONS.SET_SEARCH_QUERY, payload: query });
    };

    const setCurrentPage = (page) => {
      dispatch({ type: CONTACT_ACTIONS.SET_CURRENT_PAGE, payload: page });
    };

    const setItemsPerPage = (items) => {
      dispatch({ type: CONTACT_ACTIONS.SET_ITEMS_PER_PAGE, payload: items });
    };

    const clearError = () => {
      dispatch({ type: CONTACT_ACTIONS.CLEAR_ERROR });
    };

    return {
      // State
      contacts: state.contacts,
      filteredContacts: state.filteredContacts,
      paginatedContacts,
      searchQuery: state.searchQuery,
      currentPage: state.currentPage,
      itemsPerPage: state.itemsPerPage,
      totalContacts: state.totalContacts,
      totalPages,
      loading: state.loading,
      error: state.error,
      
      // Actions
      addContact,
      updateContact,
      deleteContact,
      setSearchQuery,
      setCurrentPage,
      setItemsPerPage,
      clearError,
      
      // Pagination helpers
      hasNextPage: state.currentPage < totalPages,
      hasPrevPage: state.currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, state.totalContacts)
    };
  }, [state]);

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};