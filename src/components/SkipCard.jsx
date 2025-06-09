import { Calendar, Trash2, CheckCircle, ArrowRight } from 'lucide-react';
import { calculateTotalPrice, getSkipIcon } from '../utils/helpers';

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);

  return (
    <div
      className={`group relative bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border ${
        isSelected
          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900 border-blue-500'
          : 'border-gray-700 hover:border-gray-600'
      }`}
      onClick={() => onSelect(skip)}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-2 z-10 animate-bounce">
          <CheckCircle className="h-4 w-4" />
        </div>
      )}
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
      <div className="p-6">
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span>{skip.hire_period_days} day hire period</span>
          </div>
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-green-400" />
            <span>{skip.allowed_on_road ? 'Road placement allowed' : 'Private land only'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-purple-400" />
            <span>{skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}</span>
          </div>
        </div>

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

      <div className="p-6 pt-0">
        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white transform scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:transform hover:scale-105'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip);
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
};

export default SkipCard;
