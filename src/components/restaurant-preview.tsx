import React from "react";
import { Star } from "lucide-react";

type RestaurantPreviewProps = {
  name: string;
  description?: string;
  rating?: number; // nota do restaurante
  reviews?: number;
  image?: string;
};

const RestaurantPreview = ({
  name,
  description = "Um restaurante incrível",
  rating = 0,
  reviews = 0,
  image = "/assets/placeholder.png"
}: RestaurantPreviewProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-64 flex-shrink-0 overflow-hidden">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>

          <div className="flex items-center space-x-0.5">
            {/* estrelas cheias */}
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}

            {/* meia estrela */}
            {halfStar === 1 && (
              <div className="relative w-4 h-4">
                <Star className="w-4 h-4 text-gray-300 fill-current absolute top-0 left-0" />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </div>
            )}

            {/* estrelas vazias */}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" />
            ))}

            {/* valor numérico */}
            <span className="ml-1 text-sm text-gray-900">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPreview;
