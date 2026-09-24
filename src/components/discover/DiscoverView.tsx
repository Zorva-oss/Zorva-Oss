import React, { useState } from 'react';
import {
  Search,
  TrendingUp,
  Hash,
  Users,
  Play,
  SlidersHorizontal,
  Flame,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { VideoItem, User, VideoCategory } from '../../types';
import { CREATORS } from '../../data/mockData';

interface DiscoverViewProps {
  videos: VideoItem[];
  currentUser: User;
  onSelectVideo: (video: VideoItem) => void;
  onFollowCreator: (creatorId: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  videos,
  currentUser,
  onSelectVideo,
  onFollowCreator
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'velocity' | 'recent'>('velocity');

  const categories = [
    'All',
    'Technology',
    'Entertainment',
    'Lifestyle',
    'Food',
    'Business',
    'Education',
    'Travel'
  ];

  const trendingSearches = [
    '#CyberpunkEdits',
    'Mechanical Keyboard ASMR',
    'Tokyo Night Street Food',
    'Zorva Neural Audio',
    'Spatial UI 2026'
  ];

  const popularHashtags = [
    { tag: '#ZorvaCreator', views: '4.8B', velocity: '+88%' },
    { tag: '#Filmmaking', views: '2.1B', velocity: '+42%' },
    { tag: '#CreativeTech', views: '980M', velocity: '+114%' },
    { tag: '#SynthesizeBeat', views: '640M', velocity: '+65%' },
    { tag: '#TokyoNight', views: '420M', velocity: '+39%' }
  ];

  const filteredVideos = videos.filter((v) => {
    const matchesCategory =
      selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 select-none">
      {/* Search Header */}
      <div className="relative max-w-2xl mx-auto text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Discover Trending <span className="text-cyan-400">Content</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Explore breakthrough viral shorts, audio stems, and trending creators worldwide.
        </p>

        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords, hashtags, audio stems or creators..."
            className="w-full bg-[#0D1224] text-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-400 shadow-xl text-sm"
          />
        </div>

        {/* Trending Search Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" /> Trending:
          </span>
          {trendingSearches.map((term) => (
            <button
              key={term}
              onClick={() => setSearchTerm(term.replace('#', ''))}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800 transition"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Creators Carousel / Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" /> Recommended Creators
          </h3>
          <span className="text-xs text-cyan-400 hover:underline cursor-pointer">View All</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.values(CREATORS).map((creator) => (
            <div
              key={creator.id}
              className="p-3.5 rounded-2xl bg-[#0D1224] border border-slate-800 flex flex-col items-center text-center group hover:border-cyan-500/40 transition"
            >
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition"
              />
              <h5 className="text-xs font-bold text-white mt-2 truncate w-full flex items-center justify-center gap-1">
                <span>{creator.name}</span>
                {creator.verified && <span className="text-cyan-400 text-[10px]">✓</span>}
              </h5>
              <span className="text-[10px] text-slate-400 truncate w-full">@{creator.username}</span>

              <button
                onClick={() => onFollowCreator(creator.id)}
                className={`mt-3 w-full py-1 text-xs font-bold rounded-xl transition ${
                  creator.isFollowing
                    ? 'bg-slate-800 text-slate-300 border border-slate-700'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md'
                }`}
              >
                {creator.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Hashtags Row */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Hash className="w-4 h-4 text-cyan-400" /> Popular Hashtags & Trends
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {popularHashtags.map((h) => (
            <div
              key={h.tag}
              onClick={() => setSearchTerm(h.tag.replace('#', ''))}
              className="p-3.5 rounded-2xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-white group-hover:text-cyan-300">{h.tag}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{h.views} views</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-400">{h.velocity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-400">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 text-slate-200 border border-slate-800 rounded-lg px-2 py-1 focus:outline-none"
          >
            <option value="velocity">Trending Velocity</option>
            <option value="relevance">Most Relevant</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

      {/* Video Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group relative aspect-[9/15] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer shadow-lg transition-all transform hover:-translate-y-1"
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Top Badge: Duration & Resolution */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white font-mono">
              <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded">
                {video.duration}
              </span>
              {video.hdr && (
                <span className="bg-purple-900/80 text-purple-300 px-1.5 py-0.5 rounded font-bold">
                  HDR
                </span>
              )}
            </div>

            {/* Play Button Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-11 h-11 rounded-full bg-cyan-500/90 text-black flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Play className="w-5 h-5 fill-black ml-0.5" />
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-1">
              <div className="flex items-center gap-1.5">
                <img
                  src={video.creator.avatar}
                  alt={video.creator.name}
                  className="w-4 h-4 rounded-full object-cover border border-cyan-400"
                />
                <span className="text-[11px] font-bold text-white truncate">
                  @{video.creator.username}
                </span>
              </div>
              <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                {video.title}
              </p>
              <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1">
                <span>👁 {(video.viewsCount / 1000).toFixed(0)}K</span>
                <span className="text-cyan-400">♥ {(video.likesCount / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
