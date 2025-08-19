
import { useState, ChangeEvent, FormEvent } from 'react';
import { MapPin, Search, User } from 'lucide-react';

type HeaderSearchProps = {
  location?: string;
  onLocationChange?: () => void;
  onSearch?: (value: string) => void;
  onProfileClick?: () => void;
  placeholder?: string;
};

const HeaderSearch = ({ 
  location = 'Cajazeiras, PB',
  onLocationChange,
  onSearch,
  onProfileClick,
  placeholder = 'Digite o nome...'
}: HeaderSearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="flex items-center space-x-1 text-red-600">
            <MapPin size={20} className="text-red-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-900 truncate">
              {location}
            </span>
          </div>
          <button
            onClick={onLocationChange}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap"
          >
            Alterar localização
          </button>
        </div>
        <div className="flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="
                  w-full pl-10 pr-4 py-2.5
                  bg-white border border-gray-300 rounded-lg
                  text-sm text-gray-900 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition-all duration-200
                "
              />
            </div>
          </form>
        </div>
        <button
          onClick={onProfileClick}
          className="
            p-2 rounded-full
            bg-red-600 hover:bg-red-700
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          "
          aria-label="Perfil do usuário"
        >
          <User size={20} className="text-white" />
        </button>
      </div>
    </header>
  );
};

export default HeaderSearch;