import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBooks } from '../hooks/useBooks'; 
import BookFilters from '../components/BookFilters';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const { user } = useAuth();
  const {
    books,
    loading,
    error,
    page,
    totalPages,
    searchTerm,
    genre,
    sort,
    setSearchTerm,
    setGenre,
    setSort,
    setPage,
    handleNextPage,
    handlePrevPage,
    handleReset,
  } = useBooks(); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80" 
              alt="Books hero" 
              className="w-full h-full object-cover rounded-bl-3xl"
            />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="lg:w-1/2">
            <div className="mb-6">
              <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">
                BOOK DISCOVERY
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white shadow-md"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white shadow-md"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white shadow-md"></div>
              </div>
              <span className="text-gray-700 font-bold text-sm">
                10k+ Reviews With 4.8 Rating
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 leading-tight">
              Discover Books,<br />Share Reviews.
            </h1>

            <p className="text-gray-700 text-lg mb-8 max-w-lg font-medium">
              Explore Fully Curated Book Reviews From Bestsellers To Hidden Gems. Find Your Next Great Read From Our Community.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Talk To A Reader Expert
              </button>
              <button className="bg-white hover:bg-orange-50 text-orange-600 px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 border-2 border-orange-300 hover:scale-105">
                Add Your Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      {user && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-white to-orange-50 rounded-2xl shadow-md p-6 border-l-4 border-orange-500">
            <p className="text-gray-700 text-lg">
              Welcome back, <span className="font-bold text-orange-600">{user.name}</span>! 
              <span className="text-gray-600 ml-2">Ready to discover your next favorite book?</span>
            </p>
          </div>
        </div>
      )}

      {!user && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl shadow-md p-6 border-2 border-orange-300">
            <p className="text-gray-800 text-lg text-center font-medium">
              <svg className="w-6 h-6 inline-block mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Browse our collection of books below and join our community to share your reviews!
            </p>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            Read Confident, Review With Ease.
          </h2>
          <p className="text-gray-700 text-lg font-medium">
            Discover Our Handpicked Selection Of Book Reviews Across The World's Most<br />
            Desirable Destinations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border-2 border-orange-200 hover:scale-105">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">10,000+</div>
            <div className="text-gray-800 font-bold">Book Reviews</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">Quality reviews available</div>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border-2 border-orange-200 hover:scale-105">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">4.9/5</div>
            <div className="text-gray-800 font-bold">Average Rating</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">Exceptional reviews</div>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border-2 border-orange-200 hover:scale-105">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-gray-800 font-bold">Genres Available</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">Growing destinations</div>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border-2 border-orange-200 hover:scale-105">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">100%</div>
            <div className="text-gray-800 font-bold">Verified & Secure</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">Protected reviews</div>
          </div>
        </div>

        {/* Book Discovery Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3 text-center">
            Discover Books, Instantly.
          </h2>
          <p className="text-gray-700 text-lg text-center mb-12 font-medium">
            Discover Our Handpicked Selection Of Amazing Books Across The<br />
            World's Most Desirable Destinations.
          </p>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-2 border-orange-200">
          <BookFilters
            searchTerm={searchTerm}
            genre={genre}
            sort={sort}
            setSearchTerm={setSearchTerm}
            setGenre={setGenre}
            setSort={setSort}
            setPage={setPage}
            onReset={handleReset}
          />
        </div>

        <BookList books={books} loading={loading} error={error} />
        
        <div className="mt-12">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;