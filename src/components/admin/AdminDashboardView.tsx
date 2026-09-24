import React, { useState } from 'react';
import {
  Users,
  Video,
  ShieldAlert,
  DollarSign,
  CheckCircle,
  XCircle,
  Trash2,
  Lock,
  Sparkles,
  Server,
  Activity,
  Layers,
  Search,
  Check,
  AlertTriangle,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { VideoItem, User } from '../../types';
import { CREATORS } from '../../data/mockData';

interface AdminDashboardViewProps {
  videos: VideoItem[];
  onLogoutAdmin: () => void;
  onNavigateToFeed: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  videos,
  onLogoutAdmin,
  onNavigateToFeed
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'categories' | 'system'>('overview');
  const [usersList, setUsersList] = useState<User[]>(Object.values(CREATORS));
  const [videoList, setVideoList] = useState<VideoItem[]>(videos);
  const [categories, setCategories] = useState<string[]>([
    'Entertainment',
    'Education',
    'Business',
    'Technology',
    'Travel',
    'Food',
    'Health',
    'Sports',
    'Lifestyle',
    'AI & Future'
  ]);
  const [newCatInput, setNewCatInput] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [searchUser, setSearchUser] = useState('');

  const handleToggleVerify = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, verified: !u.verified } : u))
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleRemoveVideo = (videoId: string) => {
    setVideoList((prev) => prev.filter((v) => v.id !== videoId));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatInput.trim() && !categories.includes(newCatInput.trim())) {
      setCategories([...categories, newCatInput.trim()]);
      setNewCatInput('');
    }
  };

  const handleDeleteCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 select-none">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5 uppercase">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            SUPERADMIN PRIVILEGE // HOST 10.0.4.12
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Zorva Global Command Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Realtime database moderation, account governance, and algorithmic distribution tuning.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateToFeed}
            className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/60 transition"
          >
            Open Client Feed
          </button>
          <button
            onClick={onLogoutAdmin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'overview', label: 'Telemetry Overview' },
          { id: 'users', label: `Users (${usersList.length})` },
          { id: 'moderation', label: `Video Queue (${videoList.length})` },
          { id: 'categories', label: `Taxonomy (${categories.length})` },
          { id: 'system', label: 'Cluster Config' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Telemetry Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800">
              <span className="text-xs text-slate-400 flex items-center justify-between">
                <span>Active Creators</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </span>
              <p className="text-3xl font-black text-white mt-2">124,580</p>
              <span className="text-[11px] text-emerald-400 mt-1 inline-block">● +1,240 Today</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800">
              <span className="text-xs text-slate-400 flex items-center justify-between">
                <span>Total Stored Videos</span>
                <Video className="w-4 h-4 text-purple-400" />
              </span>
              <p className="text-3xl font-black text-white mt-2">845,210</p>
              <span className="text-[11px] text-cyan-400 mt-1 inline-block">H.265 / AV1 Encoded</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800">
              <span className="text-xs text-slate-400 flex items-center justify-between">
                <span>Gross Ad Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </span>
              <p className="text-3xl font-black text-white mt-2">$84,290</p>
              <span className="text-[11px] text-emerald-400 mt-1 inline-block">30-day run-rate</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800">
              <span className="text-xs text-slate-400 flex items-center justify-between">
                <span>Flagged Content</span>
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              </span>
              <p className="text-3xl font-black text-rose-400 mt-2">14</p>
              <span className="text-[11px] text-rose-300 mt-1 inline-block">Pending manual audit</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D1224] border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" /> Infrastructure Node Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Database Engine:</span>
                <p className="text-emerald-400 font-bold mt-1">MySQL 8.4 Enterprise Cluster</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Latency: 1.2ms (Zero Packet Loss)</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">PHP 8.3 OPcache:</span>
                <p className="text-cyan-400 font-bold mt-1">99.8% Hit Ratio</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Memory: 2.1 GB / 8 GB allocated</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Global Edge CDN:</span>
                <p className="text-purple-400 font-bold mt-1">38 PoPs Active</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Bandwidth: 14.8 Gbps egress</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Governance */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search by name or @handle..."
                className="w-full bg-[#0D1224] text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredUsers.length} accounts
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-[#0D1224] border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 text-slate-400 font-semibold bg-[#0A0E1A]">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Followers</th>
                  <th className="p-4">Account Type</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-white flex items-center gap-1">
                          {u.name}
                          {u.verified && <span className="text-cyan-400 text-[10px]">✓</span>}
                        </p>
                        <p className="text-[11px] text-slate-400">@{u.username}</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono">{(u.followersCount / 1000).toFixed(1)}K</td>
                    <td className="p-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {u.isBusiness ? 'BRAND' : 'CREATOR'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleVerify(u.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition ${
                          u.verified
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {u.verified ? 'Verified ✓' : 'Unverified'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition"
                        title="Ban & Delete Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Video Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoList.map((video) => (
            <div
              key={video.id}
              className="p-4 rounded-3xl bg-[#0D1224] border border-slate-800 space-y-3"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-white">
                  {video.category} • {video.duration}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{video.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{video.caption}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span>By @{video.creator.username}</span>
                <span className="font-mono">{(video.viewsCount / 1000).toFixed(0)}K views</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition">
                  Approve Clip
                </button>
                <button
                  onClick={() => handleRemoveVideo(video.id)}
                  className="p-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 transition"
                  title="Remove Video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Category Taxonomy Management */}
      {activeTab === 'categories' && (
        <div className="p-6 rounded-3xl bg-[#0D1224] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Category & Algorithmic Channel Taxonomy
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Manage high-level topics used by the Zorva recommendation neural graph.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input
              type="text"
              value={newCatInput}
              onChange={(e) => setNewCatInput(e.target.value)}
              placeholder="e.g. Virtual Production, Sound Design..."
              className="flex-1 bg-[#141B32] text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-md transition"
            >
              Add Category
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <div
                key={cat}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-white">{cat}</span>
                <button
                  onClick={() => handleDeleteCategory(cat)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Cluster Config */}
      {activeTab === 'system' && (
        <div className="p-6 rounded-3xl bg-[#0D1224] border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">Cluster Security & Deployment</h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#141B32] border border-slate-800">
              <div>
                <p className="font-bold text-white">Platform Maintenance Mode</p>
                <p className="text-[11px] text-slate-400">
                  Directs incoming feed traffic to static CDN fallback page.
                </p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-5 h-5 accent-red-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#141B32] border border-slate-800">
              <div>
                <p className="font-bold text-white">Purge Global Edge Cache</p>
                <p className="text-[11px] text-slate-400">
                  Invalidate cached video fragments across all 38 edge locations.
                </p>
              </div>
              <button
                onClick={() => alert('Edge CDN cache purged across 38 nodes!')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Flush All PoPs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
