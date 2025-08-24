import { ChangeEvent } from 'react';

type PlaceholderInputProps = {
  name?:string
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const PlaceholderInput = ({ name,className = '', placeholder, value, onChange, type }: PlaceholderInputProps) => {
  return (
    <div className={className}>
      <input
      name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className || ''}`}
        type={type}
      />
    </div>
  );
};

export default PlaceholderInput;
