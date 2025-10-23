import React from 'react';
import { ContactProvider } from './context/ContactContext';
import Header from './components/Header';
import ContactList from './components/ContactList';
import Pagination from './components/Pagination';

function App() {
  return (
    <ContactProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Contact List */}
              <div className="p-6">
                <ContactList />
              </div>
              
              {/* Pagination */}
              <Pagination />
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              <p>© 2024 Tria Contact Manager. Built with React, Tailwind CSS, and ❤️</p>
              <p className="mt-1">
                A professional contact management solution with search, pagination, and CRUD operations.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ContactProvider>
  );
}

export default App;
