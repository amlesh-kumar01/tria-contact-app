# Tria Contact Manager

A professional contact management application built with React and Tailwind CSS. This application provides a comprehensive solution for managing contacts with advanced search, sorting, pagination, and CRUD operations.

## Features

### Core Functionality
- **Contact Management**: Create, read, update, and delete contacts with comprehensive information
- **Advanced Search**: Real-time search across contact names, emails, and companies with debounced input
- **Smart Sorting**: Sort contacts by name, email, company, or date added with ascending/descending options
- **Pagination**: Efficient pagination with configurable items per page (6, 12, 24, 48)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Interface
- **Dual View Modes**: Switch between grid view (card layout) and list view (detailed horizontal layout)
- **Professional Modals**: Custom modal components for adding, editing, and deleting contacts
- **Delete Confirmation**: Reusable delete modal with loading states and clear warnings
- **Visual Feedback**: Hover effects, loading spinners, and smooth transitions
- **Blur Effects**: Professional backdrop blur effects for modals

### Technical Features
- **State Management**: Centralized state management using React Context and useReducer
- **Performance Optimized**: Memoized calculations and debounced search for optimal performance
- **Form Validation**: Comprehensive client-side validation for contact forms
- **Error Handling**: Graceful error handling with user-friendly error messages
- **Loading States**: Visual loading indicators for all asynchronous operations

## Technology Stack

### Core Libraries
- **React 19.1.1**: Latest React version for modern component development
- **Vite 7.1.7**: Fast development server and build tool
- **Tailwind CSS 4.1.16**: Utility-first CSS framework for rapid UI development

### UI Components
- **Lucide React 0.546.0**: Modern icon library with consistent design
- **Custom Components**: Reusable components for modals, cards, and form elements

### Development Tools
- **ESLint**: Code linting with React-specific rules
- **PostCSS**: CSS processing for Tailwind CSS
- **VS Code Extensions**: Optimized for Visual Studio Code development

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ContactCard.jsx     # Grid view contact card
│   ├── ContactList.jsx     # Main contact list container
│   ├── ContactListItem.jsx # List view contact item
│   ├── ContactModal.jsx    # Add/edit contact modal
│   ├── DeleteModal.jsx     # Reusable delete confirmation modal
│   ├── Header.jsx          # Application header with controls
│   ├── LoadingSpinner.jsx  # Loading state component
│   ├── Pagination.jsx      # Pagination controls
│   ├── SearchBar.jsx       # Search input with debouncing
│   └── SortDropdown.jsx    # Sorting controls
├── context/             # State management
│   └── ContactContext.jsx  # Global contact state and actions
├── data/               # Mock data and utilities
│   └── mockContacts.js     # Sample contact data and validation functions
├── hooks/              # Custom React hooks
│   └── useDebounce.js      # Debouncing and utility hooks
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## Setup and Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tria-contact-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-optimized bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Design Choices and Assumptions

### State Management
- **Context + useReducer**: Chosen over external state management libraries for simplicity while maintaining scalability
- **Centralized State**: All contact operations managed through a single context to ensure consistency
- **Immutable Updates**: All state updates follow immutable patterns for predictable behavior

### User Experience
- **Debounced Search**: 300ms debounce prevents excessive API calls during typing
- **Optimistic UI**: Immediate feedback for user actions with proper error handling
- **Responsive Design**: Mobile-first approach with progressive enhancement for larger screens
- **Accessibility**: Semantic HTML, keyboard navigation, and proper ARIA attributes

### Performance Optimizations
- **Memoization**: Heavy computations memoized to prevent unnecessary recalculations
- **Virtual Pagination**: Only render visible contacts to handle large datasets efficiently
- **Lazy Loading**: Components and images loaded as needed

### Data Validation
- **Client-side Validation**: Real-time form validation for immediate user feedback
- **Phone Number Formatting**: Automatic formatting for consistent data presentation
- **Email Validation**: Regex-based email validation for data integrity

## Component Architecture

### Reusable Components
- **DeleteModal**: Generic confirmation modal reusable across the application
- **ContactModal**: Handles both creation and editing of contacts
- **Form Components**: Consistent styling and validation across all forms

### Layout Components
- **Header**: Contains search, sorting, view controls, and primary actions
- **ContactList**: Manages display logic for both grid and list views
- **Pagination**: Handles all pagination logic with customizable options

### State Components
- **ContactContext**: Provides global state and actions to all child components
- **Custom Hooks**: Encapsulate complex logic for reuse across components

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- Backend API integration for persistent data storage
- Advanced filtering options (by company, location, etc.)
- Contact import/export functionality
- Contact grouping and tagging
- Advanced search with multiple criteria
- User authentication and multi-user support

## Contributing

1. Follow the existing code style and patterns
2. Write comprehensive tests for new features
3. Update documentation for any API changes
4. Ensure responsive design works across devices
5. Maintain accessibility standards

## License

This project is developed as part of the Tria assignment and follows standard software development practices.