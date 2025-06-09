import React, { useState, useEffect } from 'react';
import { MapPin, Trash2, Calendar, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

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
      // Auto-select first skip for demo
      if (data.length > 0) {
        // Don't auto-select for better UX
        // setSelectedSkip(data[2]);
      }
    } catch (err) {
      setError('Failed to fetch skip data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={fetchSkips}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Progress Steps */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step.completed 
                      ? 'bg-blue-600 border-blue-600' 
                      : step.active 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-600 bg-gray-800'
                  }`}>
                    <step.icon className={`w-5 h-5 ${
                      step.completed || step.active ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <span className={`ml-3 text-sm font-medium ${
                    step.completed || step.active ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    steps[index + 1].completed || steps[index + 1].active 
                      ? 'bg-blue-600' 
                      : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Skip Size</h1>
          <p className="text-gray-400 text-lg">Select the skip size that best suits your needs</p>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skips.slice(0, 6).map((skip, index) => {
            const isSelected = selectedSkip?.id === skip.id;
            const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
            
            const getSkipIcon = (size) => {
              if (size <= 8) return '🗑️';
              if (size <= 14) return '📦';
              return '🚛';
            };

            return (
              <div
                key={skip.id}
                className={`group relative bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border ${
                  isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900 border-blue-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSkipSelection(skip)}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-2 z-10 animate-bounce">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
                
                {/* Card Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{getSkipIcon(skip.size)}</div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{skip.size}</div>
                      <div className="text-sm text-gray-400">yards</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">£{totalPrice}</div>
                    <div className="text-sm text-gray-400">inc. VAT</div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span>{skip.hire_period_days} day hire period</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Trash2 className="h-4 w-4 text-green-400" />
                      <span>{skip.allowed_on_road ? 'Road placement allowed' : 'Private land only'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                      <span>{skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}</span>
                    </div>
                  </div>
                  
                  {/* Features badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skip.allowed_on_road && (
                      <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full border border-green-700">
                        Road OK
                      </span>
                    )}
                    {skip.allows_heavy_waste && (
                      <span className="px-2 py-1 bg-purple-900 text-purple-300 text-xs rounded-full border border-purple-700">
                        Heavy Waste
                      </span>
                    )}
                    {skip.size <= 8 && (
                      <span className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded-full border border-blue-700">
                        Compact
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 text-white transform scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:transform hover:scale-105'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkipSelection(skip);
                    }}
                  >
                    {isSelected ? 'Selected ✓' : (
                      <span className="flex items-center justify-center gap-2">
                        Select This Skip <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Slide Overlay */}
        {showOverlay && selectedSkip && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
              onClick={closeOverlay}
            ></div>
            
            {/* Slide Panel */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-96 lg:w-[32rem] bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              showOverlay ? 'translate-x-0' : 'translate-x-full'
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

        {/* Bottom Navigation */}
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