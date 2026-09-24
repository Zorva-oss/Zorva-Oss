import React, { useState } from 'react';
import { Layers, ChevronRight, X, ExternalLink } from 'lucide-react';
import { PageId } from '../../types';

interface QuickPageSwitcherProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const QuickPageSwitcher: React.FC<QuickPageSwitcherProps> = ({
  currentPage,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const pages: { id: PageId; label: string; group: string }[] = [
    { id: 'landing', label: '1. Landing Page', group: 'Public' },
    { id: 'login', label: '2. Login Page', group: 'Auth' },
    { id: 'register', label: '3. Registration Page', group: 'Auth' },
    { id: 'feed', label: '4. Home / Video Feed', group: 'Core' },
    { id: 'discover', label: '5. Discover Page', group: 'Core' },
    { id: 'upload', label: '6. Video Upload Page', group: 'Core' },
    { id: 'video-details', label: '7. Video Details Modal', group: 'Core' },
    { id: 'profile', label: '8. User Profile Page', group: 'User' },
    { id: 'edit-profile', label: '9. Edit Profile Modal', group: 'User' },
    { id: 'messages', label: '10. Messages Page', group: 'Social' },
    { id: 'ai-assistant', label: '11. AI Assistant Studio', group: 'AI Copilot' },
    { id: 'business-promo', label: '12. Business Promotion', group: 'Business' },
    { id: 'business-dashboard', label: '13. Business Dashboard', group: 'Business' },
    { id: 'notifications', label: '14. Notifications Page', group: 'User' },
    { id: 'settings', label: '15. Settings Page', group: 'System' },
    { id: 'admin-login', label: '16. Admin Login', group: 'Admin' },
    { id: 'admin-dashboard', label: '17. Admin Dashboard', group: 'Admin' },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 lg:bottom-6 right-5 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-[#12182e]/90 hover:bg-[#1a2344] text-cyan-300 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,229,255,0.3)] backdrop-blur-md text-xs font-bold transition-all hover:scale-105 active:scale-95"
        title="Open 17-Page Prototype Switcher"
      >
        <Layers className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline">17 UI Pages Hub</span>
        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded-full font-mono">
          {pages.findIndex((p) => p.id === currentPage) + 1}/17
        </span>
      </button>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-sm h-full bg-[#0B0F1E] border-l border-slate-800 p-5 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-black font-extrabold text-xs">
                    Z
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">All 17 Zorva Pages</h3>
                    <p className="text-[11px] text-slate-400">Jump straight to any design specification</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {pages.map((p) => {
                  const isCurrent = currentPage === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onNavigate(p.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isCurrent
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono w-4">
                          {p.group}
                        </span>
                        <span>{p.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center justify-between">
                <span>Theme: Dark & Light Mode Ready</span>
                <span className="text-cyan-400 font-mono">React 19 + Tailwind</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Built strictly to Zorva system architecture specs.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
