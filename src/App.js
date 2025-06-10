import React, { useState, useEffect } from 'react';
import SkipCard from './components/SkipCard';
import { MapPin, Trash2, Calendar, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { calculateTotalPrice } from './utils/helpers';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import ProgressSteps from './components/ProgressSteps';
import SkipOverlay from './components/SkipOverlay';

const App = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [skipsPerPage] = useState(6); // Number of skips to show per page

  useEffect(() => {
    fetchSkips();
  }, []);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      if (!process.env.REACT_APP_REMWASTE_API_BASE_URL) {
        throw new Error('API base URL is not defined');
      }
      const response = await fetch(`${process.env.REACT_APP_REMWASTE_API_BASE_URL}/api/skips/by-location?postcode=NR32&area=Lowestoft`);
      const data = await response.json();
      setSkips(data);
    } catch (err) {
      setError('Failed to fetch skip data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipSelection = (skip) => {
    setSelectedSkip(skip);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    // Keep selected skip but hide overlay
  };

  const confirmSelection = () => {
    setShowOverlay(false);
    // Continue to next step
    console.log('Proceeding with skip:', selectedSkip);
  };

  // Pagination calculations
  const totalPages = Math.ceil(skips.length / skipsPerPage);
  const indexOfLastSkip = currentPage * skipsPerPage;
  const indexOfFirstSkip = indexOfLastSkip - skipsPerPage;
  const currentSkips = skips.slice(indexOfFirstSkip, indexOfLastSkip);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const steps = [
    { id: 1, name: 'Postcode', icon: MapPin, active: true, completed: true },
    { id: 2, name: 'Waste Type', icon: Trash2, active: true, completed: true },
    { id: 3, name: 'Select Skip', icon: Calendar, active: true, completed: false },
    { id: 4, name: 'Permit Check', icon: CheckCircle, active: false, completed: false },
    { id: 5, name: 'Choose Date', icon: Calendar, active: false, completed: false },
    { id: 6, name: 'Payment', icon: CheckCircle, active: false, completed: false },
  ];

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  if (error) {
    return (
      <ErrorScreen
        fetchSkips={fetchSkips}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ProgressSteps steps={steps} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Skip Size</h1>
          <p className="text-gray-400 text-lg">Select the skip size that best suits your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {currentSkips.map((skip, index) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={handleSkipSelection}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-8">
            {/* Page Info */}
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstSkip + 1} to {Math.min(indexOfLastSkip, skips.length)} of {skips.length} skips
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                    : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg border transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                    : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Alternative: Simple page indicator for mobile */}
            <div className="md:hidden text-center">
              <span className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        )}

        {showOverlay && selectedSkip && (
         <SkipOverlay 
           showOverlay={showOverlay} 
           selectedSkip={selectedSkip} 
           confirmSelection={confirmSelection} 
           closeOverlay={closeOverlay}
         />
        )}
      </div>
    </div>
  );
};

export default App;