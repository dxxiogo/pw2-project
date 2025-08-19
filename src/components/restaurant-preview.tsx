import { ChevronRight, Star } from 'lucide-react';

const restaurantPreview = () => {
  return (
    <div className="flex w-3/4  bg-white rounded-xl shadow-md overflow-hidden   border border-gray-100">
      <div className="bg-black flex items-center justify-center p-4 w-24 flex-shrink-0">
        <div className="text-white text-center">
          
          <div className="mb-2">
            <div className="flex justify-center space-x-1">
              <div className="w-1 h-4 bg-white rounded-full transform rotate-12"></div>
              <div className="w-1 h-5 bg-white rounded-full"></div>
              <div className="w-1 h-4 bg-white rounded-full transform -rotate-12"></div>
              <div className="w-1 h-3 bg-white rounded-full transform rotate-45"></div>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="w-10 h-6 bg-white rounded-full mx-auto relative">
              <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-3 left-2.5 w-0.5 h-0.5 bg-black rounded-full"></div>
              <div className="absolute top-3 right-2.5 w-0.5 h-0.5 bg-black rounded-full"></div>
            </div>
          </div>
          
          <div className="text-white font-bold text-sm tracking-wider leading-tight">
            <div>LA</div>
            <div>BRASA</div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col justify-between min-h-0">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">La Brasa</h2>
          <p className="text-gray-400 text-xs mb-3 leading-relaxed">
            Um restaurante moderno com uma culinária tradicional
          </p>
          
          <div className="flex items-center ">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">4.1</span>
            <span className="ml-1 text-xs text-gray-400">(12273)</span>
          </div>
          
        </div>
        
        <div className="flex justify-end mt-2">
          <button className="p-1 hover:bg-gray-50 rounded-full transition-colors duration-200">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default restaurantPreview;