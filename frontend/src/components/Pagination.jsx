import React from 'react';

const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 py-6">
      <button 
        onClick={onPrev} 
        disabled={page <= 1}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 active:scale-95"
      >
        Previous
      </button>
      <span className="text-gray-700 font-semibold text-lg px-4 py-2 bg-gray-100 rounded-lg min-w-fit">
        Page {page} of {totalPages}
      </span>
      <button 
        onClick={onNext} 
        disabled={page >= totalPages}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 active:scale-95"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;