import React, { useState, useEffect } from 'react';
import SkipCard from './components/SkipCard';
import { MapPin, Trash2, Calendar, CheckCircle } from 'lucide-react';
import { calculateTotalPrice } from './utils/helpers';
import LoadingScreen from './components/LoadingScreen';

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

    if (loading) {
    return (
      <LoadingScreen/>
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
    </div>
  );
};

export default App;
