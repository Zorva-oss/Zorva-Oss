import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Sliders,
  HelpCircle,
  Moon,
  Sun,
  Lock,
  Globe,
  Check,
  UserX,
  Volume2,
  Trash2
} from 'lucide-react';
import { User } from '../../types';

interface SettingsViewProps {
  currentUser: User;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  themeMode,
  onToggleTheme,
  onLogout
}) => {
  const [activeSection, setActiveSection] = useState<'account' | 'privacy' | 'notifications' | 'content' | 'about'>('account');
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);
  const [autoplayVideo, setAutoplayVideo] = useState(true);
  const [allowPush, setAllowPush] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 select-none">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          Settings & Preferences
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your account safety, streaming bitrate, privacy policies, and theme modes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 space-y-1 bg-[#0D1224] p-3 rounded-3xl border border-slate-800 h-fit">
          {[
            { id: 'account', label: 'Account Management', icon: Lock },
            { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'content', label: 'Playback & Content', icon: Sliders },
            { id: 'about', label: 'About & Support', icon: HelpCircle }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-800/80">
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-300 hover:bg-slate-800/60 transition"
            >
              <span className="flex items-center gap-2">
                {themeMode === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                <span>Theme: {themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Toggle
              </span>
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="md:col-span-8 p-6 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-6">
          {activeSection === 'account' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Account Management</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full bg-[#141B32] text-slate-400 p-3 rounded-xl border border-slate-700/60 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Username</label>
                  <input
                    type="text"
                    defaultValue={currentUser.username}
                    className="w-full bg-[#141B32] text-white p-3 rounded-xl border border-slate-700 font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full bg-[#141B32] text-white p-3 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new secure password"
                    className="w-full bg-[#141B32] text-white p-3 rounded-xl border border-slate-700"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/40 rounded-xl transition"
                >
                  Log Out of Session
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg transition"
                >
                  Save Account Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Privacy & Safety</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141B32] border border-slate-800">
                  <div>
                    <p className="font-bold text-white">Private Account</p>
                    <p className="text-[11px] text-slate-400">
                      Only approved followers can view your clips and liked videos.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPrivateAccount}
                    onChange={(e) => setIsPrivateAccount(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141B32] border border-slate-800">
                  <div>
                    <p className="font-bold text-white">Who Can Direct Message You</p>
                    <p className="text-[11px] text-slate-400">Manage spam and unsolicited inbound reach.</p>
                  </div>
                  <select className="bg-slate-800 text-white rounded-lg p-1.5 border border-slate-700">
                    <option>Everyone</option>
                    <option>Followers Only</option>
                    <option>No One</option>
                  </select>
                </div>

                <div className="p-3 rounded-2xl bg-[#141B32] border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Blocked Accounts</p>
                    <p className="text-[11px] text-slate-400">0 accounts currently blocked on Zorva.</p>
                  </div>
                  <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Notification Preferences</h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141B32] border border-slate-800">
                  <div>
                    <p className="font-bold text-white">Push Notifications</p>
                    <p className="text-[11px] text-slate-400">Receive instant mobile/desktop stream alerts.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowPush}
                    onChange={(e) => setAllowPush(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141B32] border border-slate-800">
                  <div>
                    <p className="font-bold text-white">Weekly Commercial Digest</p>
                    <p className="text-[11px] text-slate-400">Earnings summaries and growth analytics.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'content' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Playback & Performance</h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141B32] border border-slate-800">
                  <div>
                    <p className="font-bold text-white">Auto-Play Next Video</p>
                    <p className="text-[11px] text-slate-400">Continuous feed loop playback with low latency.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoplayVideo}
                    onChange={(e) => setAutoplayVideo(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141B32] border border-slate-800">
                  <div>
                    <p className="font-bold text-white">Data Saver Mode</p>
                    <p className="text-[11px] text-slate-400">Stream in 720p SDR when on cellular data.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={dataSaver}
                    onChange={(e) => setDataSaver(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-white">About Zorva Platform</h3>

              <p className="text-slate-300 leading-relaxed">
                Zorva is the high-velocity vertical streaming network uniting content creators,
                commercial merchants, and procedural AI automation.
              </p>

              <div className="p-4 rounded-2xl bg-[#141B32] border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Client Engine:</span>
                  <span className="text-cyan-400">Zorva Web 3.4.0 (React 19 + Vite)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Server Architecture:</span>
                  <span className="text-purple-400">PHP 8.3 & MySQL Multi-Region</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">AI Model Pipeline:</span>
                  <span className="text-pink-400">Google Gemini GenAI 2.4.0</span>
                </div>
              </div>
            </div>
          )}

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Preferences saved successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
