import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Sidebar from './components/Sidebar';
import MarketplaceCard from './components/MarketplaceCard';
import { mockPosts, mockMarketplaceItems, mockCurrentUser } from './data/mockData';
import { Post, MarketplaceItem } from './types';

function App() {
  const [currentSection, setCurrentSection] = useState('feed');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [marketplaceItems] = useState<MarketplaceItem[]>(mockMarketplaceItems);
  const [user] = useState(mockCurrentUser);
  const feedRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleCreatePost = (content: string, tags: string[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: user,
      content,
      type: 'text',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      tags,
      liked: false,
      bookmarked: false,
    };
    setPosts([newPost, ...posts]);
    
    // Smooth scroll to top
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleCommentPost = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const handleSharePost = (postId: string) => {
    console.log('Share post:', postId);
  };

  const handleLikeMarketplaceItem = (itemId: string) => {
    console.log('Like marketplace item:', itemId);
  };

  const handleContactSeller = (itemId: string) => {
    console.log('Contact seller for item:', itemId);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'feed':
        return (
          <div className="space-y-6">
            <CreatePost onSubmit={handleCreatePost} user={user} />
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLikePost}
                onComment={handleCommentPost}
                onShare={handleSharePost}
              />
            ))}
          </div>
        );
      
      case 'marketplace':
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Marketplace Geek</h1>
              <p className="text-gray-400">Descubra itens incríveis da comunidade</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceItems.map((item) => (
                <MarketplaceCard
                  key={item.id}
                  item={item}
                  onLike={handleLikeMarketplaceItem}
                  onContact={handleContactSeller}
                />
              ))}
            </div>
          </div>
        );
      
      case 'communities':
        return (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-white mb-4">Comunidades</h1>
            <p className="text-gray-400">Em breve: Conecte-se com pessoas que compartilham seus interesses!</p>
          </div>
        );
      
      case 'messages':
        return (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-white mb-4">Mensagens</h1>
            <p className="text-gray-400">Em breve: Chat em tempo real com a comunidade!</p>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-white mb-4">Em Desenvolvimento</h1>
            <p className="text-gray-400">Esta seção estará disponível em breve!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <Header 
        user={user} 
        onNavigate={handleNavigate} 
        currentSection={currentSection} 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div ref={feedRef} className="max-h-[calc(100vh-120px)] overflow-y-auto">
              {renderContent()}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-80 hidden lg:block">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;