import React from 'react';
import {
  Home,
  Compass,
  Upload,
  Sparkles,
  MessageSquare,
  BarChart3,
  Shield,
  Settings,
  PlusCircle,
  Bell
} from 'lucide-react';
import { PageId, User } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentUser: User;
  unreadMessagesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  unreadMessagesCount = 2
}) => {
  const navItems = [
    {
      id: 'feed' as PageId,
      label: 'Home / For You',
      icon: Home
    },
    {
      id: 'discover' as PageId,
      label: 'Discover & Search',
      icon: Compass
    },
    {
      id: 'upload' as PageId,
      label: 'Video Upload',
      icon: Upload
    },
    {
      id: 'ai-assistant' as PageId,
      label: 'Zorva AI Assistant',
      icon: Sparkles,
      badge: 'v4.2'
    },
    {
      id: 'messages' as PageId,
      label: 'Messages',
      icon: MessageSquare,
      count: unreadMessagesCount
    },
    {
      id: 'business-promo' as PageId,
      label: 'Business Hub',
      icon: BarChart3
    },
    {
      id: 'notifications' as PageId,
      label: 'Notifications',
      icon: Bell
    },
    {
      id: 'admin-dashboard' as PageId,
      label: 'Admin Panel',
      icon: Shield
    },
    {
      id: 'settings' as PageId,
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 bg-[#080B14] border-r border-slate-800/80 p-4 justify-between select-none">
      <div className="space-y-4">
        {/* Quick Action Button: + Create */}
        <button
          onClick={() => onNavigate('upload')}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(0,198,255,0.35)] hover:shadow-[0_0_25px_rgba(0,198,255,0.55)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>Create</span>
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentPage === item.id ||
              (item.id === 'business-promo' && currentPage === 'business-dashboard');

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/80 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-purple-900/40 text-purple-300 border border-purple-700/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {typeof item.count === 'number' && item.count > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-blue-900' : 'bg-cyan-500 text-black font-extrabold'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Card: Studio AI Pro */}
      <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0e1428] border border-cyan-500/20 shadow-inner">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-cyan-400">
            Studio AI Pro
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-pulse" />
        </div>
        <p className="text-[11px] text-slate-400 leading-snug">
          Viral analytics & autonomous video remixing active.
        </p>
        <button
          onClick={() => onNavigate('ai-assistant')}
          className="mt-2.5 w-full py-1 text-[11px] font-semibold text-center text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-800/60 rounded-lg transition"
        >
          Open AI Studio →
        </button>
      </div>
    </aside>
  );
};
