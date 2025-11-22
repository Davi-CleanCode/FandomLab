// src/App.tsx
import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProfilePage from "./user/ProfilePage";
import CreatePost from "./components/CreatePost";
import PostCard from "./components/PostCard";
import MarketplaceCard from "./components/MarketplaceCard";
import { mockPosts, mockMarketplaceItems, mockCurrentUser } from "./data/mockData";
import { Post, MarketplaceItem } from "./types";

function FeedContent({ posts, onLike, onComment, onShare, onCreatePost, user, feedRef }) {
  return (
    <div className="space-y-6">
      <CreatePost onSubmit={onCreatePost} user={user} />
      <div ref={feedRef}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [currentSection, setCurrentSection] = useState("feed");
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [marketplaceItems] = useState<MarketplaceItem[]>(mockMarketplaceItems);
  const [user] = useState(mockCurrentUser);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const handleNavigate = (section: string) => setCurrentSection(section);

  const handleCreatePost = (content: string, tags: string[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user,
      content,
      type: "text",
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      tags,
      liked: false,
      bookmarked: false,
    };
    setPosts((p) => [newPost, ...p]);
    if (feedRef.current) feedRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLikePost = (postId: string) =>
    setPosts((p) =>
      p.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
      )
    );

  const handleCommentPost = (postId: string) => console.log("Comment", postId);
  const handleSharePost = (postId: string) => console.log("Share", postId);
  const handleLikeMarketplaceItem = (itemId: string) => console.log("Like item", itemId);
  const handleContactSeller = (itemId: string) => console.log("Contact seller", itemId);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
        <Header onNavigate={handleNavigate} currentSection={currentSection} />

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            <div className="flex-1 min-w-0">
              <Routes>
                <Route
                  path="/"
                  element={
                    <FeedContent
                      posts={posts}
                      onLike={handleLikePost}
                      onComment={handleCommentPost}
                      onShare={handleSharePost}
                      onCreatePost={handleCreatePost}
                      user={user}
                      feedRef={feedRef}
                    />
                  }
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/marketplace"
                  element={
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-2">Marketplace</h1>
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
                  }
                />
              </Routes>
            </div>

            <div className="w-80 hidden lg:block">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
