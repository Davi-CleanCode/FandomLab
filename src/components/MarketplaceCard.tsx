import React, { useState } from 'react';
import { Heart, MessageCircle, Star, ShoppingCart, Eye } from 'lucide-react';
import { MarketplaceItem } from '../types';

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onLike: (itemId: string) => void;
  onContact: (itemId: string) => void;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ item, onLike, onContact }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(item.id);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-400 bg-green-400/10';
      case 'mint': return 'text-blue-400 bg-blue-400/10';
      case 'used': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'new': return 'Novo';
      case 'mint': return 'Perfeito';
      case 'used': return 'Usado';
      default: return condition;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:bg-gray-800/70 transition-all duration-200 group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              liked ? 'text-red-500 bg-red-500/20' : 'text-white/70 bg-black/20 hover:bg-black/40'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConditionColor(item.condition)}`}>
            {getConditionLabel(item.condition)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-semibold text-lg line-clamp-2 flex-1">{item.title}</h3>
        </div>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-purple-400 text-xs px-2 py-1 bg-purple-400/10 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Seller Info */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={item.seller.avatar}
            alt={item.seller.displayName}
            className="w-6 h-6 rounded-full border border-gray-600"
          />
          <span className="text-gray-300 text-sm">{item.seller.displayName}</span>
          {item.seller.verified && (
            <Star className="w-3 h-3 text-blue-400 fill-current" />
          )}
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div className="text-2xl font-bold text-green-400">
            R$ {item.price.toLocaleString('pt-BR')}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <Eye className="w-4 h-4" />
              <span>{item.likes}</span>
            </div>
            <button
              onClick={() => onContact(item.id)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contatar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;