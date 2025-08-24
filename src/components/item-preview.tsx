import React from 'react';
import { Star } from 'lucide-react';

type ItemPreviewProps = {
  name: string;
  image: string;
  rating?: number;
  reviews?: number;
  description?: string;
};

const ItemPreview = ({
  name,
  image,
  description = ''
}: ItemPreviewProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-64 flex-shrink-0 m-2 hover:shadow-xl transition-shadow duration-300">
      {/* Imagem */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={image || "/assets/placeholder.png"} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
          
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        </div>
        
        {description && (
          <p className="text-gray-400 text-sm truncate">{description}</p>
        )}
      </div>
    </div>
  );
};

export default ItemPreview;
