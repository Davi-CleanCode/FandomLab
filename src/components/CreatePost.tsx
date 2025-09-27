import React, { useState } from 'react';
import { Image, Video, Smile, MapPin, Hash, Zap } from 'lucide-react';

interface CreatePostProps {
  onSubmit: (content: string, tags: string[]) => void;
  user: any;
}

const CreatePost: React.FC<CreatePostProps> = ({ onSubmit, user }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, tags);
      setContent('');
      setTags([]);
      setCurrentTag('');
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (e.currentTarget === document.activeElement && content.trim()) {
        handleSubmit();
      }
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
      <div className="flex space-x-4">
        <img
          src={user?.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2'}
          alt={user?.displayName || 'User'}
          className="w-10 h-10 rounded-full border-2 border-purple-500/30"
        />
        <div className="flex-1">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="O que está rolando na sua mente geek hoje?"
              className="w-full bg-transparent text-white text-lg placeholder-gray-400 resize-none border-none outline-none min-h-[120px]"
              rows={4}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {content.length}/280
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Hash className="w-4 h-4 text-purple-400" />
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Adicionar tag (gaming, anime, tech...)"
                className="bg-gray-700 text-white text-sm px-3 py-1 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={addTag}
                className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Adicionar
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => removeTag(tag)}
                    className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-600/30 transition-colors"
                  >
                    #{tag} ×
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-purple-400 transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-purple-400 transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-purple-400 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-purple-400 transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                content.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Postar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;