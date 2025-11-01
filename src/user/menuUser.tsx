import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';

interface User {
  id: string;
  displayName: string;
  email?: string;
  level?: number;
  avatar?: string;
}

interface MenuUserProps {
  user: User;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const MenuUser = ({ user, onLogout, onProfileClick, onSettingsClick }: MenuUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    onProfileClick?.();
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    onSettingsClick?.();
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  return (
    <div className="relative" ref={menuRef}>

      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors duration-200 group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            user.displayName.charAt(0).toUpperCase()
          )}
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm font-medium text-white">
            {user.displayName}
          </span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-yellow-400 font-bold">
              {user.level || 1}
            </span>
          </div>
        </div>

        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } group-hover:text-white`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50 backdrop-blur-lg">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm font-medium text-white">{user.displayName}</p>
            {user.email && (
              <p className="text-sm text-gray-400 truncate">{user.email}</p>
            )}
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-xs text-yellow-400 font-bold">
                Level {user.level || 1}
              </span>
            </div>
          </div>

       
          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
            >
              <User className="w-4 h-4 mr-3" />
              Inventario do Player
            </button>

            <button
              onClick={handleSettingsClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
            >
              <Settings className="w-4 h-4 mr-3" />
              Configurações
            </button>
          </div>

          <div className="border-t border-gray-700"></div>

          <div className="py-2">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors duration-150"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuUser;