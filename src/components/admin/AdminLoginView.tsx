import React, { useState } from 'react';
import { ShieldAlert, Lock, Mail, Key, ArrowRight, ShieldCheck } from 'lucide-react';
import { ZorvaLogo } from '../common/ZorvaLogo';
import { PageId } from '../../types';

interface AdminLoginViewProps {
  onAdminLoginSuccess: () => void;
  onNavigate: (page: PageId) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onAdminLoginSuccess,
  onNavigate
}) => {
  const [adminEmail, setAdminEmail] = useState('admin@zorva.internal');
  const [adminPassword, setAdminPassword] = useState('zorva-root-sec');
  const [securityKey, setSecurityKey] = useState('ZRV-9941');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdminLoginSuccess();
    onNavigate('admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#060810] flex flex-col items-center justify-center p-4 relative select-none">
      <div className="absolute top-1/3 w-80 h-80 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B0E1B] border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.15)] relative space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 mb-2">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Zorva Core Control</h2>
          <p className="text-xs text-slate-400 font-mono">
            RESTRICTED ACCESS // LEVEL 4 CLUSTER ROOT
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#12162A] text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-[#12162A] text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Security MFA Key</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                className="w-full bg-[#12162A] text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700 font-mono tracking-widest text-center"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Authenticate & Open Terminal
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xs text-slate-400 hover:text-white"
          >
            ← Return to Public Platform
          </button>
        </div>
      </div>
    </div>
  );
};
