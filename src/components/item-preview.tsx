import React from 'react';
import { Star } from 'lucide-react';

const ItemPreview = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm">
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
        <img
          src="/api/placeholder/400/300" 
          alt="Panquecas recheadas com frutas e calda"
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-4 bg-yellow-200 rounded-full mb-1 shadow-sm"></div>
            <div className="w-32 h-4 bg-yellow-100 rounded-full mb-1 shadow-sm"></div>
            <div className="w-32 h-4 bg-yellow-200 rounded-full mb-1 shadow-sm"></div>
            <div className="w-32 h-4 bg-yellow-100 rounded-full mb-1 shadow-sm"></div>
            
            <div className="absolute -top-2 left-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div> {/* Strawberry */}
            </div>
            <div className="absolute -top-1 right-8">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div> {/* Blueberry */}
            </div>
            <div className="absolute top-1 left-10">
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div> {/* Nut */}
            </div>
            
            <div className="absolute top-0 left-8 w-1 h-8 bg-amber-500 rounded-full opacity-70"></div>
            <div className="absolute top-0 right-12 w-1 h-6 bg-amber-500 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>

    
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Panquecas recheadas</h2>
          
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">4.1</span>
            <span className="ml-1 text-xs text-gray-400">(12273)</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm">
          Recheada com doce de leite e carinho.
        </p>
      </div>
    </div>
  );
};

export default ItemPreview;