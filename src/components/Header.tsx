import { Link } from "react-router-dom";
import { useUser } from "../user/useUser";

export default function Header({ onNavigate, currentSection }) {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between p-4">
      <h1
        className="text-white font-bold text-xl cursor-pointer"
        onClick={() => onNavigate("feed")}
      >
        FandomLab
      </h1>

      <div className="flex items-center gap-4">
        <nav className="hidden sm:flex gap-6 text-gray-300">
          <button onClick={() => onNavigate("feed")}>Feed</button>
          <button onClick={() => onNavigate("marketplace")}>Marketplace</button>
        </nav>

        <Link to="/profile">
          <img
            src={user.avatarUrl}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
}
