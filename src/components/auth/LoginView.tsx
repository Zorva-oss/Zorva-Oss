import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { ZorvaLogo } from '../common/ZorvaLogo';
import { User, PageId } from '../../types';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (page: PageId) => void;
  currentUser: User;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onNavigate,
  currentUser
}) => {
  const [emailOrUsername, setEmailOrUsername] = useState('creator@zorva.io');
  const [password, setPassword] = useState('zorva2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername || !password) {
      setErrorMsg('Please enter both your email/username and password');
      return;
    }
    // Simulate successful login
    onLoginSuccess(currentUser);
    onNavigate('feed');
  };

  const handleQuickDemoLogin = (role: 'creator' | 'business') => {
    onLoginSuccess({
      ...currentUser,
      isBusiness: role === 'business',
      name: role === 'business' ? 'CyberAudio Labs' : 'Alex Rivera',
      username: role === 'business' ? 'cyberaudio' : 'alex_rivera'
    });
    onNavigate('feed');
  };

  return (
    <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center p-4 relative select-none">
      <div className="absolute top-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-2xl relative space-y-6">
        <div className="text-center space-y-2">
          <ZorvaLogo size="lg" onClick={() => onNavigate('landing')} />
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-4">Welcome back to Zorva</h2>
          <p className="text-xs text-slate-400">
            Log in to stream 4K short clips, launch campaigns, and run the AI copilot.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Email or Username</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="name@example.com or @username"
                className="w-full bg-[#141B32] text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to registered email!')}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#141B32] text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <span>Remember me</span>
            </label>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-bit TLS
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Log In to Zorva
          </button>
        </form>

        {/* Quick Demo Logins */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <p className="text-[11px] text-center text-slate-400 font-semibold">⚡ Quick Demo One-Click Access:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('creator')}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Creator Profile</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('business')}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Business Profile</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          <span>Don't have a Zorva account? </span>
          <button
            onClick={() => onNavigate('register')}
            className="font-bold text-cyan-400 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
