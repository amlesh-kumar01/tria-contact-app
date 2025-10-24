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
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_SORT_ORDER: 'SET_SORT_ORDER',
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
  viewMode: 'grid', // 'grid' or 'list'
  sortBy: 'name', // 'name', 'email', 'company', 'dateAdded'
  sortOrder: 'asc', // 'asc' or 'desc'
  loading: false,
  error: null
};

// Reducer function
const contactReducer = (state, action) => {
  switch (action.type) {
    case CONTACT_ACTIONS.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        filteredContacts: action.payload,
        loading: false
      };

    case CONTACT_ACTIONS.ADD_CONTACT:
      const newContacts = [...state.contacts, action.payload];
      const newFilteredContacts = state.searchQuery 
        ? newContacts.filter(contact => 
            contact.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (contact.company && contact.company.toLowerCase().includes(state.searchQuery.toLowerCase()))
          )
        : newContacts;
      
      return {
        ...state,
        contacts: newContacts,
        filteredContacts: newFilteredContacts
      };

    case CONTACT_ACTIONS.UPDATE_CONTACT:
      const updatedContacts = state.contacts.map(contact =>
        contact.id === action.payload.id ? action.payload : contact
      );
      const updatedFilteredContacts = state.searchQuery 
        ? updatedContacts.filter(contact => 
            contact.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (contact.company && contact.company.toLowerCase().includes(state.searchQuery.toLowerCase()))
          )
        : updatedContacts;
      
      return {
        ...state,
        contacts: updatedContacts,
        filteredContacts: updatedFilteredContacts
      };

    case CONTACT_ACTIONS.DELETE_CONTACT:
      const remainingContacts = state.contacts.filter(contact => contact.id !== action.payload);
      const remainingFilteredContacts = state.searchQuery 
        ? remainingContacts.filter(contact => 
            contact.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (contact.company && contact.company.toLowerCase().includes(state.searchQuery.toLowerCase()))
          )
        : remainingContacts;
      
      const newTotalPages = Math.ceil(remainingFilteredContacts.length / state.itemsPerPage);
      
      return {
        ...state,
        contacts: remainingContacts,
        filteredContacts: remainingFilteredContacts,
        currentPage: state.currentPage > newTotalPages 
          ? Math.max(1, newTotalPages)
          : state.currentPage
      };

    case CONTACT_ACTIONS.SET_SEARCH_QUERY:
      const filtered = action.payload
        ? state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            contact.email.toLowerCase().includes(action.payload.toLowerCase()) ||
            (contact.company && contact.company.toLowerCase().includes(action.payload.toLowerCase()))
          )
        : state.contacts;
      
      return {
        ...state,
        searchQuery: action.payload,
        filteredContacts: filtered,
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

    case CONTACT_ACTIONS.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload
      };

    case CONTACT_ACTIONS.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };

    case CONTACT_ACTIONS.SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload
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

  // Memoize actions to prevent infinite loops
  const actions = useMemo(() => {
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

    const setViewMode = (mode) => {
      dispatch({ type: CONTACT_ACTIONS.SET_VIEW_MODE, payload: mode });
    };

    const setSortBy = (sortBy) => {
      dispatch({ type: CONTACT_ACTIONS.SET_SORT_BY, payload: sortBy });
    };

    const setSortOrder = (sortOrder) => {
      dispatch({ type: CONTACT_ACTIONS.SET_SORT_ORDER, payload: sortOrder });
    };

    const clearError = () => {
      dispatch({ type: CONTACT_ACTIONS.CLEAR_ERROR });
    };

    return {
      addContact,
      updateContact,
      deleteContact,
      setSearchQuery,
      setCurrentPage,
      setItemsPerPage,
      setViewMode,
      setSortBy,
      setSortOrder,
      clearError
    };
  }, [state.contacts]);

  // Memoized values and functions
  const value = useMemo(() => {
    // Sort the filtered contacts
    const sortedContacts = [...state.filteredContacts].sort((a, b) => {
      let aValue, bValue;
      
      switch (state.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'company':
          aValue = (a.company || '').toLowerCase();
          bValue = (b.company || '').toLowerCase();
          break;
        case 'dateAdded':
          aValue = new Date(a.dateAdded);
          bValue = new Date(b.dateAdded);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (state.sortOrder === 'desc') {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    // Calculate pagination
    const totalFilteredContacts = sortedContacts.length;
    const totalPages = Math.ceil(totalFilteredContacts / state.itemsPerPage);
    
    // Ensure currentPage is within valid range for calculations
    const currentPageForCalc = totalPages > 0 ? Math.min(Math.max(1, state.currentPage), totalPages) : 1;
    
    const startIndex = (currentPageForCalc - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const paginatedContacts = sortedContacts.slice(startIndex, endIndex);

    return {
      // State
      contacts: state.contacts,
      filteredContacts: state.filteredContacts,
      paginatedContacts,
      searchQuery: state.searchQuery,
      currentPage: state.currentPage,
      itemsPerPage: state.itemsPerPage,
      viewMode: state.viewMode,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      totalContacts: totalFilteredContacts,
      totalPages,
      loading: state.loading,
      error: state.error,
      
      // Actions
      ...actions,
      
      // Pagination helpers
      hasNextPage: state.currentPage < totalPages,
      hasPrevPage: state.currentPage > 1,
      startIndex: totalFilteredContacts > 0 ? startIndex + 1 : 0,
      endIndex: Math.min(endIndex, totalFilteredContacts)
    };
  }, [state]);

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};