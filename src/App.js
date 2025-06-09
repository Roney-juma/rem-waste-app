import React, { useState, useEffect } from 'react';
import SkipCard from './components/SkipCard';
import { MapPin, Trash2, Calendar, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { calculateTotalPrice } from './utils/helpers';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import ProgressSteps from './components/ProgressSteps';

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
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
              onClick={closeOverlay}
            ></div>

            {/* Slide Panel */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-96 lg:w-[32rem] bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${showOverlay ? 'translate-x-0' : 'translate-x-full'
              }`}>
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <h2 className="text-2xl font-bold text-white">Skip Details</h2>
                  <button
                    onClick={closeOverlay}
                    className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Skip Overview */}
                  <div className="bg-gray-900 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl">
                        {selectedSkip.size <= 8 ? '🗑️' : selectedSkip.size <= 14 ? '📦' : '🚛'}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{selectedSkip.size} Yard Skip</h3>
                        <p className="text-gray-400">{selectedSkip.hire_period_days} day hire period</p>
                      </div>
                    </div>

                    <div className="text-center py-4 border-t border-gray-700">
                      <div className="text-4xl font-bold text-blue-400 mb-2">
                        £{calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat)}
                      </div>
                      <div className="text-gray-400">Total price (inc. VAT)</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Base: £{selectedSkip.price_before_vat} + VAT ({selectedSkip.vat}%)
                      </div>
                    </div>
                  </div>

                  {/* Skip Specifications */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Specifications</h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-blue-400" />
                          <span className="text-gray-300">Hire Period</span>
                        </div>
                        <span className="text-white font-medium">{selectedSkip.hire_period_days} days</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Trash2 className="h-5 w-5 text-green-400" />
                          <span className="text-gray-300">Road Placement</span>
                        </div>
                        <span className={`font-medium ${selectedSkip.allowed_on_road ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedSkip.allowed_on_road ? 'Allowed' : 'Not Allowed'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-purple-400" />
                          <span className="text-gray-300">Heavy Waste</span>
                        </div>
                        <span className={`font-medium ${selectedSkip.allows_heavy_waste ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedSkip.allows_heavy_waste ? 'Allowed' : 'Not Allowed'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-orange-400" />
                          <span className="text-gray-300">Postcode</span>
                        </div>
                        <span className="text-white font-medium">{selectedSkip.postcode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Additional Options</h4>

                    <div className="space-y-3">
                      {selectedSkip.allowed_on_road && (
                        <label className="flex items-center justify-between p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-850 transition-colors">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                            <span className="text-gray-300">Road permit required</span>
                          </div>
                          <span className="text-blue-400 font-medium">+£45</span>
                        </label>
                      )}

                      <label className="flex items-center justify-between p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-850 transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                          <span className="text-gray-300">Same day delivery</span>
                        </div>
                        <span className="text-blue-400 font-medium">+£25</span>
                      </label>

                      <label className="flex items-center justify-between p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-850 transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                          <span className="text-gray-300">Extended hire (7 extra days)</span>
                        </div>
                        <span className="text-blue-400 font-medium">+£35</span>
                      </label>
                    </div>
                  </div>

                  {/* Waste Guidelines */}
                  <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
                    <h5 className="text-blue-300 font-semibold mb-2">💡 Waste Guidelines</h5>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• No hazardous materials (paint, chemicals, asbestos)</li>
                      <li>• No electrical appliances or batteries</li>
                      <li>• No liquids or wet waste</li>
                      {selectedSkip.allows_heavy_waste && <li>• Heavy materials like soil and rubble allowed</li>}
                      {!selectedSkip.allows_heavy_waste && <li>• Light household and garden waste only</li>}
                    </ul>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-700 bg-gray-900">
                  <div className="flex gap-3">
                    <button
                      onClick={closeOverlay}
                      className="flex-1 py-3 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                      Back to Selection
                    </button>
                    <button
                      onClick={confirmSelection}
                      className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Disclaimer */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm max-w-4xl mx-auto">
            Imagery and information shown throughout this website may not reflect the exact shape or size specification,
            colours may vary, options and/or accessories may be featured at additional cost.
          </p>
        </div>

        {selectedSkip && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">{selectedSkip.size} Yard Skip</span>
                <span className="text-blue-400 text-2xl font-bold">
                  £{calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat)}
                </span>
                <span className="text-gray-400">{selectedSkip.hire_period_days} day hire</span>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;