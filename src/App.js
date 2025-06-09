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


  useEffect(() => {
    fetchSkips();
  }, []);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
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
          {skips.slice(0, 6).map((skip, index) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={handleSkipSelection}
            />
          ))}
        </div>

        {showOverlay && selectedSkip && (
         <SkipOverlay showOverlay={showOverlay} selectedSkip={selectedSkip} confirmSelection={confirmSelection} closeOverlay={closeOverlay}/>
        )}

        {/* Disclaimer */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm max-w-4xl mx-auto">
            Imagery and information shown throughout this website may not reflect the exact shape or size specification,
            colours may vary, options and/or accessories may be featured at additional cost.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;