
import { useState } from 'react';

type PlaceholderInputProps =  {
  className?: string;
  placeholder?: string;
};

const PlaceholderInput = ({ className = '', placeholder}: PlaceholderInputProps) => {
  const [value, setValue] = useState('');

  return (
    <div className={className}>
      <input
      placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className || ''}`}
      />
    </div>
  );
};

export default PlaceholderInput;