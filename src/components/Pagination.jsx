import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    totalContacts,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    setCurrentPage,
    setItemsPerPage
  } = useContacts();

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
  };

  if (totalContacts === 0) {
    return null;
  }

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        
        {/* Results Info */}
        <div className="flex items-center text-sm text-gray-700 order-2 sm:order-1">
          <span>
            Showing{' '}
            <span className="font-medium">{startIndex}</span>
            {' '}to{' '}
            <span className="font-medium">{endIndex}</span>
            {' '}of{' '}
            <span className="font-medium">{totalContacts}</span>
            {' '}results
          </span>
        </div>

        {/* Items per page selector */}
        <div className="flex items-center space-x-2 text-sm text-gray-700 order-1 sm:order-2">
          <span>Show:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
          <span>per page</span>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-1 order-3">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!hasPrevPage}
              className="relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="hidden sm:flex space-x-1">
              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(page)}
                  disabled={page === '...'}
                  className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    page === currentPage
                      ? 'z-10 bg-blue-600 text-white border border-blue-600'
                      : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page === '...' ? <MoreHorizontal className="h-4 w-4" /> : page}
                </button>
              ))}
            </div>

            {/* Mobile: Current page indicator */}
            <div className="sm:hidden flex items-center px-3 py-2 text-sm text-gray-700">
              <span>{currentPage} / {totalPages}</span>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!hasNextPage}
              className="relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span className="mr-1 hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;