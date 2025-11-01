import React from 'react';
import { TrendingUp, Users, Gamepad2, Code, Tv, Music, Star, Award, Crown, CheckCircle, XCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const trendingTopics = [
    { tag: 'CyberpunkUpdate', posts: '12.5K' },
    { tag: 'ReactJS', posts: '8.2K' },
    { tag: 'AnimeWinter2025', posts: '15.3K' },
    { tag: 'GameDev', posts: '5.7K' },
    { tag: 'MachineLearning', posts: '9.1K' },
  ];

  const communities = [
    { name: 'Gamers Unite', icon: Gamepad2, members: '125K', color: 'from-green-500 to-emerald-500' },
    { name: 'Code Masters', icon: Code, members: '87K', color: 'from-blue-500 to-cyan-500' },
    { name: 'Anime Lovers', icon: Tv, members: '203K', color: 'from-pink-500 to-rose-500' },
    { name: 'Music Geeks', icon: Music, members: '64K', color: 'from-purple-500 to-violet-500' },
  ];

  // Array de amigos da guilda - ADICIONE ESTE ARRAY
  const friends = [
    {
      name: "Aragorn",
      online: true,
      game: "Shadowlands",
      level: 45,
      avatarColor: "from-blue-500 to-cyan-500",
      role: "Guerreiro"
    },
    {
      name: "Luna",
      online: true,
      game: "Mythic Raid",
      level: 43,
      avatarColor: "from-purple-500 to-pink-500",
      role: "Maga"
    },
    {
      name: "Thorfin",
      online: false,
      game: "",
      level: 38,
      avatarColor: "from-yellow-500 to-orange-500",
      role: "Guerreiro"
    },
    {
      name: "Sylvia",
      online: true,
      game: "Arenas PvP",
      level: 42,
      avatarColor: "from-green-500 to-emerald-500",
      role: "Arqueira"
    },
    {
      name: "Draco",
      online: true,
      game: "Dungeon Run",
      level: 40,
      avatarColor: "from-red-500 to-rose-500",
      role: "Paladino"
    }
  ];

  const achievements = [
    { name: 'Early Bird', description: 'Postou antes das 6h', icon: Crown, rarity: 'legendary' },
    { name: 'Social Butterfly', description: '100+ likes em um post', icon: Star, rarity: 'epic' },
    { name: 'Code Warrior', description: 'Compartilhou código', icon: Award, rarity: 'rare' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h2 className="text-white font-bold">Trending no FandomLab</h2>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={topic.tag} className="flex items-center justify-between hover:bg-gray-700/30 rounded-lg p-2 cursor-pointer transition-colors">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">#{index + 1}</span>
                  <span className="text-purple-300 font-medium">#{topic.tag}</span>
                </div>
                <span className="text-xs text-gray-500">{topic.posts} posts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-purple-400" />
          <h2 className="text-white font-bold">Guilda Online</h2>
        </div>
        <div className="space-y-3">
          {friends.map((friend) => {
            const StatusIcon = friend.online ? CheckCircle : XCircle;
            return (
              <div key={friend.name} className="flex items-center space-x-3 hover:bg-gray-700/30 rounded-lg p-2 cursor-pointer transition-colors">
                <div className="relative">
                  <div className={`w-8 h-8 bg-gradient-to-r ${friend.avatarColor} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-sm font-medium">
                      {friend.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    friend.online ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{friend.name}</span>
                    <StatusIcon className={`w-3 h-3 ${
                      friend.online ? 'text-green-400' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="text-xs text-gray-400">
                    {friend.online ? `Jogando ${friend.game}` : 'Offline'}
                    {friend.level && ` • Nv. ${friend.level}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-purple-400" />
          <h2 className="text-white font-bold">Comunidades Populares</h2>
        </div>
        <div className="space-y-3">
          {communities.map((community) => {
            const Icon = community.icon;
            return (
              <div key={community.name} className="flex items-center space-x-3 hover:bg-gray-700/30 rounded-lg p-2 cursor-pointer transition-colors">
                <div className={`w-8 h-8 bg-gradient-to-r ${community.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{community.name}</div>
                  <div className="text-xs text-gray-400">{community.members} membros</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-purple-400" />
          <h2 className="text-white font-bold">Conquistas Recentes</h2>
        </div>
        <div className="space-y-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div key={achievement.name} className="flex items-center space-x-3 hover:bg-gray-700/30 rounded-lg p-2 cursor-pointer transition-colors">
                <div className={`w-8 h-8 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{achievement.name}</div>
                  <div className="text-xs text-gray-400">{achievement.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;