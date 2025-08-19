
import { Trash2 } from 'lucide-react';
type ProductCardProps = {
  image?: string;
  title?: string;
  quantity?: string | number;
  price?: string | number;
  onRemove?: () => void;
  onImageClick?: () => void;
  className?: string;
};

const ProductCard = ({ 
  image,
  title = 'Sopa de Salmão',
  quantity = '01x',
  price = 'R$ 15,00',
  onRemove,
  onImageClick,
  className = ''
}: ProductCardProps) => {
  return (
    <div className={`flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-x-4 ${className}`}>
      <button
        onClick={onRemove}
        className="
          p-2 rounded-full
          text-red-600 hover:bg-red-50 hover:text-red-700
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        "
        aria-label="Remover produto"
      >
        <Trash2 size={16} />
      </button>
      <div className="flex-shrink-0">
        <button
          onClick={onImageClick}
          className="
            w-16 h-16 rounded-lg overflow-hidden
            border-2 border-gray-200
            hover:border-gray-300 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          "
        >
          {image ? (
            <img 
              src={image}
              alt={title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center">
              <div className="text-2xl">🍲</div>
            </div>
          )}
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {quantity}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;