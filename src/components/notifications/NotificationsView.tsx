import React, { useState } from 'react';
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  Briefcase,
  Sparkles,
  CheckCheck,
  Check
} from 'lucide-react';
import { NotificationItem, User } from '../../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  currentUser: User;
  onMarkAllAsRead: () => void;
  onNavigateToFeed: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  currentUser,
  onMarkAllAsRead,
  onNavigateToFeed
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'likes' | 'comments' | 'follows' | 'system'>('all');
  const [localNotifs, setLocalNotifs] = useState<NotificationItem[]>(notifications);

  const filterMap = {
    all: () => true,
    likes: (n: NotificationItem) => n.type === 'like',
    comments: (n: NotificationItem) => n.type === 'comment',
    follows: (n: NotificationItem) => n.type === 'follow',
    system: (n: NotificationItem) => n.type === 'business' || n.type === 'ai'
  };

  const filtered = localNotifs.filter(filterMap[activeFilter]);

  const handleMarkRead = (id: string) => {
    setLocalNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-cyan-400" />
            Notification Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time activity alerts, audience reactions, and algorithmic insights.
          </p>
        </div>

        <button
          onClick={() => {
            onMarkAllAsRead();
            setLocalNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
        >
          <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'likes', label: 'Likes & Hearts' },
          { id: 'comments', label: 'Comments' },
          { id: 'follows', label: 'New Followers' },
          { id: 'system', label: 'Business & AI' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-3.5 py-1.5 rounded-xl transition whitespace-nowrap ${
              activeFilter === f.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMarkRead(item.id)}
            className={`p-4 rounded-2xl flex items-center justify-between gap-4 border transition cursor-pointer ${
              !item.isRead
                ? 'bg-[#111730] border-cyan-500/40 shadow-lg'
                : 'bg-[#0D1224] border-slate-800/80 hover:bg-slate-850/60'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <img
                  src={item.actor.avatar}
                  alt={item.actor.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">
                  {item.type === 'like' && <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />}
                  {item.type === 'comment' && <MessageCircle className="w-3 h-3 text-cyan-400" />}
                  {item.type === 'follow' && <UserPlus className="w-3 h-3 text-purple-400" />}
                  {item.type === 'business' && <Briefcase className="w-3 h-3 text-amber-400" />}
                  {item.type === 'ai' && <Sparkles className="w-3 h-3 text-indigo-400" />}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-200">
                  <strong className="text-white font-bold">{item.actor.name}</strong>{' '}
                  <span className="text-slate-300">{item.content}</span>
                </p>
                <span className="text-[10px] text-slate-500 mt-0.5 block">{item.timeAgo}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {item.targetThumbnail && (
                <img
                  src={item.targetThumbnail}
                  alt="Thumbnail"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToFeed();
                  }}
                  className="w-10 h-14 rounded-lg object-cover border border-slate-700 hover:border-cyan-400"
                />
              )}

              {item.type === 'follow' && (
                <button className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition">
                  Follow Back
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
