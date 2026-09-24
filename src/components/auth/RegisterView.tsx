import React, { useState } from 'react';
import { Mail, Lock, User, AtSign, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { ZorvaLogo } from '../common/ZorvaLogo';
import { User as UserType, PageId } from '../../types';

interface RegisterViewProps {
  onRegisterSuccess: (newUser: UserType) => void;
  onNavigate: (page: PageId) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onRegisterSuccess,
  onNavigate
}) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'creator' | 'business'>('creator');
  const [selectedAvatar, setSelectedAvatar] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  );
  const [errorMsg, setErrorMsg] = useState('');

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !email || !password) {
      setErrorMsg('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    const newUser: UserType = {
      id: `u_${Date.now()}`,
      name: fullName,
      username: username.replace('@', ''),
      email,
      avatar: selectedAvatar,
      bio: accountType === 'business' ? 'Official Brand Partner on Zorva' : 'Vertical video creator & AI visualizer',
      followersCount: 0,
      followingCount: 1,
      likesCount: 0,
      isBusiness: accountType === 'business',
      verified: false
    };

    onRegisterSuccess(newUser);
    onNavigate('feed');
  };

  return (
    <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center p-4 relative select-none">
      <div className="absolute top-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-2xl relative space-y-6">
        <div className="text-center space-y-2">
          <ZorvaLogo size="lg" onClick={() => onNavigate('landing')} />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-4">Join Zorva Network</h2>
          <p className="text-xs text-slate-400">
            Create an account to start streaming, uploading, and using autonomous AI creator tools.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* Account Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAccountType('creator')}
            className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
              accountType === 'creator'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-cyan-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Content Creator</span>
          </button>

          <button
            type="button"
            onClick={() => setAccountType('business')}
            className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
              accountType === 'business'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>Brand / Business</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Avatar Picker */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#141B32] border border-slate-800">
            <img
              src={selectedAvatar}
              alt="Avatar"
              className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400"
            />
            <div className="flex-1">
              <span className="text-[11px] text-slate-400 block mb-1">Select Avatar Preset:</span>
              <div className="flex gap-2">
                {sampleAvatars.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Preset"
                    onClick={() => setSelectedAvatar(url)}
                    className={`w-7 h-7 rounded-lg object-cover cursor-pointer border-2 transition ${
                      selectedAvatar === url ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full bg-[#141B32] text-white pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Username</label>
              <div className="relative">
                <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="elena_creates"
                  className="w-full bg-[#141B32] text-white pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@example.com"
                className="w-full bg-[#141B32] text-white pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#141B32] text-white pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#141B32] text-white pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Free Account
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          <span>Already have an account? </span>
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-cyan-400 hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
