import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Sun,
  Moon,
  ShieldCheck,
  Briefcase,
  User as UserIcon,
  LogOut,
  UploadCloud,
  ChevronDown
} from 'lucide-react';
import { ZorvaLogo } from '../common/ZorvaLogo';
import { PageId, User, NotificationItem } from '../../types';

interface TopNavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentUser: User;
  onSwitchUserRole: (role: 'creator' | 'business' | 'admin') => void;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  notifications: NotificationItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onSwitchUserRole,
  themeMode,
  onToggleTheme,
  notifications,
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-slate-800/80 bg-[#080B14]/90 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-4">
        <ZorvaLogo
          size="md"
          tagline={false}
          onClick={() => onNavigate('landing')}
        />

        {/* Quick landing vs app toggle badge */}
        <button
          onClick={() => onNavigate(currentPage === 'landing' ? 'feed' : 'landing')}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800/70 hover:bg-slate-700/70 text-slate-300 border border-slate-700/60 transition"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {currentPage === 'landing' ? 'Open Zorva App' : 'View Landing Page'}
        </button>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search viral creators, sounds, hashtags and AI prompts..."
            className="w-full bg-[#101424] text-slate-200 placeholder:text-slate-500 pl-10 pr-12 py-2 rounded-xl text-sm border border-slate-800/90 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
          />
          <button
            onClick={() => onSearchSubmit(searchQuery)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-800/80 rounded border border-slate-700 hover:text-cyan-300"
          >
            ↵
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Zorva AI quick launcher */}
        <button
          onClick={() => onNavigate('ai-assistant')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-purple-600/30 to-cyan-500/20 text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
          title="Zorva AI Studio"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">Zorva AI</span>
        </button>

        {/* Upload Shortcut */}
        <button
          onClick={() => onNavigate('upload')}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/70 transition"
        >
          <UploadCloud className="w-3.5 h-3.5 text-slate-300" />
          <span>Upload</span>
        </button>

        {/* Theme mode toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition"
          title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {themeMode === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-300" />
          )}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0E1324] border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('notifications');
                  }}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto my-2">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('notifications');
                    }}
                    className="py-2.5 px-2 flex items-start gap-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition"
                  >
                    <img
                      src={notif.actor.avatar}
                      alt={notif.actor.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300">
                        <strong className="text-white font-medium">{notif.actor.name}</strong>{' '}
                        {notif.content}
                      </p>
                      <span className="text-[10px] text-slate-500">{notif.timeAgo}</span>
                    </div>
                    {notif.targetThumbnail && (
                      <img
                        src={notif.targetThumbnail}
                        alt="Video"
                        className="w-9 h-12 rounded object-cover border border-slate-800 shrink-0"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowNotifications(false);
                  onNavigate('notifications');
                }}
                className="w-full py-2 text-center text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 rounded-xl transition"
              >
                Go to Notification Center
              </button>
            </div>
          )}
        </div>

        {/* User Avatar & Fast Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-cyan-500/50"
            />
            <div className="hidden lg:flex flex-col text-left leading-tight pr-1">
              <span className="text-xs font-semibold text-slate-200">{currentUser.name}</span>
              <span className="text-[10px] text-slate-400">@{currentUser.username}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0E1324] border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in">
              <div className="pb-3 border-b border-slate-800 mb-2 px-1">
                <p className="text-xs font-bold text-white">{currentUser.name}</p>
                <p className="text-[11px] text-cyan-400">@{currentUser.username}</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Current Role: </span>
                  <span className="capitalize text-slate-200 font-semibold">{currentUser.role || 'creator'}</span>
                </div>
              </div>

              {/* Fast Switch User Demo Persona */}
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                Switch Demo Persona
              </p>
              <div className="space-y-1 mb-2">
                <button
                  onClick={() => {
                    onSwitchUserRole('creator');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                    Creative Studio (Creator)
                  </span>
                  {currentUser.role === 'creator' && <span className="text-cyan-400 text-xs">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onSwitchUserRole('business');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                    CyberAudio Labs (Business)
                  </span>
                  {currentUser.role === 'business' && <span className="text-purple-400 text-xs">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onSwitchUserRole('admin');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Zorva Admin (Platform Mod)
                  </span>
                  {currentUser.role === 'admin' && <span className="text-emerald-400 text-xs">✓</span>}
                </button>
              </div>

              <div className="border-t border-slate-800 pt-2 space-y-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('profile');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('settings');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('login');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out / Switch Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
