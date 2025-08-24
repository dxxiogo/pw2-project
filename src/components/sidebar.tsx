import React, { useState, useEffect } from 'react';
import { Home, ShoppingCart, Search, CreditCard, FileText, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

type SidebarProps = {
  onNavigation?: (item: NavItem) => void;
};

const Sidebar = ({ onNavigation }: SidebarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', href: '/home' },
    { icon: ShoppingCart, label: 'Carrinho', href: '/order' },
    { icon: Search, label: 'Buscar', href: '/buscar' },
    { icon: CreditCard, label: 'Pagamentos', href: '/pagamentos' },
    { icon: FileText, label: 'Documentos', href: '/documentos' },
    { icon: LogOut, label: 'Sair', href: '/welcomepage' }
  ];

  useEffect(() => {
    const index = navItems.findIndex(item => location.pathname.startsWith(item.href));
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname]);

  const handleClick = (index: number, item: NavItem) => {
    setActiveIndex(index);
    if (onNavigation) {
      onNavigation(item);
    }
    if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <nav className="w-16 bg-red-600 flex flex-col items-center py-4 h-full fixed shadow-lg z-30">
      <div className="flex flex-col items-center space-y-6 flex-1">
        {navItems.slice(0, -1).map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleClick(index, item)}
              className={`
                relative p-3 rounded-lg transition-all duration-200 
                hover:bg-red-700 hover:scale-105 group 
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                ${activeIndex === index ? 'bg-red-700 scale-105' : ''}
              `}
              title={item.label}
              aria-label={item.label}
            >
              <IconComponent size={24} className="text-white drop-shadow-sm" />
              <div className="
                absolute left-full ml-3 px-3 py-2 
                bg-gray-900 text-white text-sm rounded-md 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-200 
                whitespace-nowrap z-50 pointer-events-none
                before:content-[''] before:absolute before:right-full 
                before:top-1/2 before:-translate-y-1/2 
                before:border-4 before:border-transparent 
                before:border-r-gray-900
              ">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
      <div className="pb-2 mt-8">
        <button
          onClick={() => handleClick(navItems.length - 1, navItems[navItems.length - 1])}
          className="
            relative p-3 rounded-lg transition-all duration-200 
            hover:bg-red-700 hover:scale-105 group 
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
          "
          title="Sair"
          aria-label="Sair"
        >
          <LogOut size={24} className="text-white drop-shadow-sm" />
          <div className="
            absolute left-full ml-3 px-3 py-2 
            bg-gray-900 text-white text-sm rounded-md 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-200 
            whitespace-nowrap z-50 pointer-events-none
            before:content-[''] before:absolute before:right-full 
            before:top-1/2 before:-translate-y-1/2 
            before:border-4 before:border-transparent 
            before:border-r-gray-900
          ">
            Sair
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
