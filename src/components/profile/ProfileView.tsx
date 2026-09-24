import React, { useState } from 'react';
import {
  Grid,
  Heart,
  Bookmark,
  Briefcase,
  Edit3,
  Share2,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Play
} from 'lucide-react';
import { User, VideoItem } from '../../types';

interface ProfileViewProps {
  user: User;
  videos: VideoItem[];
  currentUser: User;
  onEditProfileClick: () => void;
  onFollowToggle?: (userId: string) => void;
  onSelectVideo: (video: VideoItem) => void;
  onOpenBusinessDashboard?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  videos,
  currentUser,
  onEditProfileClick,
  onFollowToggle,
  onSelectVideo,
  onOpenBusinessDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'liked' | 'saved' | 'business'>('videos');
  const isSelf = user.id === currentUser.id;

  const userVideos = videos.filter((v) => v.creator.id === user.id);
  const likedVideos = videos.filter((v) => v.isLiked);
  const savedVideos = videos.filter((v) => v.isSaved);

  const currentDisplayVideos =
    activeTab === 'videos'
      ? (userVideos.length > 0 ? userVideos : videos.slice(0, 3))
      : activeTab === 'liked'
      ? likedVideos
      : activeTab === 'saved'
      ? savedVideos
      : userVideos;

  return (
    <div className="flex-1 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 select-none">
      {/* Profile Header Banner & Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-purple-900/30 via-cyan-900/20 to-blue-900/30 border-b border-white/5" />

        <div className="relative pt-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          {/* Avatar & User Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative group">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-[#0D1224] shadow-2xl relative z-10"
              />
              <span className="absolute bottom-1 right-1 z-20 w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#0D1224] shadow-[0_0_8px_#00e5ff]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{user.name}</h1>
                {user.verified && (
                  <span className="w-4 h-4 rounded-full bg-cyan-400 text-black text-[9px] font-black flex items-center justify-center">
                    ✓
                  </span>
                )}
                {user.isBusiness && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/60">
                    Business
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-cyan-400">@{user.username}</p>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed pt-1">{user.bio}</p>

              {user.businessDetails?.website && (
                <a
                  href={user.businessDetails.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 pt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{user.businessDetails.website}</span>
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {isSelf ? (
              <>
                <button
                  onClick={onEditProfileClick}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
                {onOpenBusinessDashboard && (
                  <button
                    onClick={onOpenBusinessDashboard}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/60 flex items-center gap-1.5 transition"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Business Hub</span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => onFollowToggle && onFollowToggle(user.id)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
                  user.isFollowing
                    ? 'bg-slate-800 text-slate-300 border border-slate-700'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/30'
                }`}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            )}

            <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Numeric Counts Bar */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 mt-6 pt-4 text-center">
          <div>
            <span className="text-xs text-slate-400 font-semibold">Following</span>
            <p className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              {user.followingCount.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Followers</span>
            <p className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              {(user.followersCount / 1000).toFixed(1)}K
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Total Likes</span>
            <p className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              {(user.likesCount / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </div>

      {/* Profile Tabs Navigation */}
      <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'videos'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Videos</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'liked'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Liked Videos</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'saved'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Videos</span>
        </button>

        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'business'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Business Content</span>
        </button>
      </div>

      {/* Responsive Video Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentDisplayVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group relative aspect-[9/15] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-400 cursor-pointer shadow-lg transition-all"
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute top-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white">
              {video.duration}
            </div>

            <div className="absolute bottom-2 left-2 right-2 text-white">
              <p className="text-[11px] font-semibold line-clamp-1">{video.title}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Play className="w-3 h-3 fill-white" /> {(video.viewsCount / 1000).toFixed(0)}K
                </span>
                <span>♥ {(video.likesCount / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
