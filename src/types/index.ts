export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  verified: boolean;
  level: number;
  xp: number;
  badges: Badge[];
  followers: number;
  following: number;
  interests: string[];
  joinDate: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Post {
  id: string;
  user: User;
  content: string;
  images?: string[];
  type: 'text' | 'image' | 'video' | 'poll' | 'marketplace';
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  liked?: boolean;
  bookmarked?: boolean;
}

export interface MarketplaceItem {
  id: string;
  seller: User;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: 'new' | 'used' | 'mint';
  tags: string[];
  likes: number;
  timestamp: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  banner: string;
  members: number;
  category: string;
  tags: string[];
}