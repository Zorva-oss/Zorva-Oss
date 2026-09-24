import React from 'react';
import { Home, Compass, Plus, MessageSquare, User as UserIcon } from 'lucide-react';
import { PageId, User } from '../../types';

interface BottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentUser: User;
  unreadMessagesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  unreadMessagesCount = 2
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#080B14]/95 backdrop-blur-xl border-t border-slate-800/80 px-3 flex items-center justify-around">
      {/* Home */}
      <button
        onClick={() => onNavigate('feed')}
        className={`flex flex-col items-center gap-1 transition ${
          currentPage === 'feed' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium">Home</span>
      </button>

      {/* Discover */}
      <button
        onClick={() => onNavigate('discover')}
        className={`flex flex-col items-center gap-1 transition ${
          currentPage === 'discover' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px] font-medium">Discover</span>
      </button>

      {/* Create (+) */}
      <button
        onClick={() => onNavigate('upload')}
        className="relative -top-3 w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95 transition-all"
        title="Create & Upload Video"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Messages */}
      <button
        onClick={() => onNavigate('messages')}
        className={`relative flex flex-col items-center gap-1 transition ${
          currentPage === 'messages' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        {unreadMessagesCount > 0 && (
          <span className="absolute -top-1 right-1 w-4 h-4 rounded-full bg-cyan-400 text-black text-[9px] font-black flex items-center justify-center">
            {unreadMessagesCount}
          </span>
        )}
        <span className="text-[10px] font-medium">Messages</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center gap-1 transition ${
          currentPage === 'profile' || currentPage === 'edit-profile'
            ? 'text-cyan-400'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className={`w-5 h-5 rounded-full object-cover border ${
            currentPage === 'profile' ? 'border-cyan-400' : 'border-slate-600'
          }`}
        />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </nav>
  );
};
