import React, { useState } from 'react';
import { Search, Bell, MessageCircle, User, Menu, Sparkles, Zap } from 'lucide-react';
import MenuUser from '../user/menuUser';

interface HeaderProps {
  user: any;
  onNavigate: (section: string) => void;
  currentSection: string;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, currentSection }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { id: 'feed', label: 'Feed', icon: Sparkles },
    { id: 'communities', label: 'Comunidades', icon: User },
    { id: 'marketplace', label: 'Marketplace', icon: Zap },
    { id: 'messages', label: 'Mensagens', icon: MessageCircle },
  ];

  // Handlers para o MenuUser
  const handleLogout = () => {
    console.log('Usuário deslogado');
    // Implementar lógica de logout
  };

  const handleProfileClick = () => {
    console.log('Abrir perfil');
    onNavigate('profile'); // ou a seção que você quiser
  };

  const handleSettingsClick = () => {
    console.log('Abrir configurações');
    onNavigate('settings'); // ou a seção que você quiser
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            FandomLab
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentSection === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-gray-800 rounded-lg border border-gray-700 shadow-xl p-3">
                <input
                  type="text"
                  placeholder="Buscar posts, usuários, comunidades..."
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </div>

          <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <MenuUser
            user={{
              id: user?.id || '1',
              displayName: user?.displayName || 'User',
              email: user?.email,
              level: user?.level || 1
            }}
            onLogout={handleLogout}
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
          />

          <button className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;