// src/user/ProfilePage.tsx
import React from "react";
import { useUser } from "./useUser";
import UserAvatar from "./UserAvatar";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-gray-900 p-6 rounded-xl flex items-center gap-4">
        <UserAvatar src={user.avatarUrl} size={80} />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400">@{user.username}</p>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-6 rounded-xl">
        <h2 className="font-semibold mb-2">Bio</h2>
        <p className="text-gray-300">{user.bio}</p>
      </div>
    </div>
  );
}
