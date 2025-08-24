import React, { useState, useEffect } from "react";
import { Home, PlusSquare, FileText, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

type SidebarProps = {
  onNavigation?: (item: NavItem) => void;
};

const RestaurantSidebar = ({ onNavigation }: SidebarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: Home, label: "Meus Itens", href: "/restaurant/home" },
    { icon: PlusSquare, label: "Criar Item", href: "/restaurant/create-item" },
    { icon: FileText, label: "Pedidos", href: "/restaurant/orders" },
    { icon: LogOut, label: "Sair", href: "/welcomepage" },
  ];

  useEffect(() => {
    const index = navItems.findIndex((item) =>
      location.pathname.startsWith(item.href)
    );
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname]);

  const handleClick = (index: number, item: NavItem) => {
    setActiveIndex(index);
    if (onNavigation) onNavigation(item);
    if (item.href) navigate(item.href);
  };

  return (
    <nav className="w-16 bg-gray-800 flex flex-col items-center py-4 h-full fixed shadow-lg z-30">
      <div className="flex flex-col items-center space-y-6 flex-1">
        {navItems.slice(0, -1).map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleClick(index, item)}
              className={`p-3 rounded-lg transition-all duration-200 
                hover:bg-gray-700 hover:scale-105 group 
                ${activeIndex === index ? "bg-gray-700 scale-105" : ""}`}
              title={item.label}
            >
              <Icon size={24} className="text-white" />
            </button>
          );
        })}
      </div>
      <div className="pb-2">
        <button
          onClick={() =>
            handleClick(navItems.length - 1, navItems[navItems.length - 1])
          }
          className="p-3 rounded-lg transition-all duration-200 
            hover:bg-gray-700 hover:scale-105 group"
          title="Sair"
        >
          <LogOut size={24} className="text-white" />
        </button>
      </div>
    </nav>
  );
};

export default RestaurantSidebar;
