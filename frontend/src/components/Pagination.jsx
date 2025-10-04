import React from 'react';
import { useTheme } from '../hooks/useTheme';

const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  const { isDark } = useTheme();
  
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
      <span className={`font-semibold text-lg px-4 py-2 rounded-lg min-w-fit ${
        isDark
          ? 'text-gray-300 bg-gray-700'
          : 'text-gray-700 bg-gray-100'
      }`}>
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