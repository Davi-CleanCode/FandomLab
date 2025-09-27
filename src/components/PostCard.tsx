import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Zap, Star } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onShare }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [bookmarked, setBookmarked] = useState(post.bookmarked || false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(post.id);
  };

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/70 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={post.user.avatar}
              alt={post.user.displayName}
              className="w-10 h-10 rounded-full border-2 border-purple-500/30"
            />
            {post.user.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-semibold">{post.user.displayName}</h3>
              <span className="text-gray-400 text-sm">@{post.user.username}</span>
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded-full">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-bold">{post.user.level}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {post.user.badges.slice(0, 2).map((badge) => (
                <div
                  key={badge.id}
                  className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getBadgeColor(badge.rarity)} text-white`}
                >
                  {badge.name}
                </div>
              ))}
              <span className="text-gray-500 text-sm">{formatTimeAgo(post.timestamp)}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-white text-lg leading-relaxed">{post.content}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={post.images[0]}
            alt="Post content"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all duration-200 ${
              liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes + (liked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={() => onComment(post.id)}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          
          <button
            onClick={() => onShare(post.id)}
            className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors"
          >
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            bookmarked ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-400 hover:text-yellow-400 hover:bg-gray-700'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;