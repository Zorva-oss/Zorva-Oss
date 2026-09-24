import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Share2,
  Download,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  Video,
  Heart
} from 'lucide-react';
import { PageId } from '../../types';
import { ZorvaLogo } from '../common/ZorvaLogo';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 selection:bg-cyan-500/30">
      {/* Top Landing Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080B14]/90 backdrop-blur-xl px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <ZorvaLogo size="md" tagline={false} onClick={() => onNavigate('landing')} />

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => onNavigate('feed')} className="hover:text-cyan-400 transition">
            Home Feed
          </button>
          <button onClick={() => onNavigate('discover')} className="hover:text-cyan-400 transition">
            Discover
          </button>
          <button onClick={() => onNavigate('ai-assistant')} className="hover:text-cyan-400 transition">
            AI Assistant
          </button>
          <button onClick={() => onNavigate('business-promo')} className="hover:text-cyan-400 transition">
            Business Promotion
          </button>
          <button onClick={() => onNavigate('settings')} className="hover:text-cyan-400 transition">
            About Us
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition"
          >
            Log In
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="text-xs sm:text-sm font-bold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(0,198,255,0.4)] transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Ambient neon radial glows */}
        <div className="absolute top-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-32 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Brand Ecosystem Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/40 text-[11px] font-bold text-cyan-300 mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>● ZORVA ECOSYSTEM 3.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-white leading-tight">
          Watch. Connect.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-500 bg-clip-text text-transparent">
            Create. Grow.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          The all-in-one social powerhouse fusing immersive vertical short-video streaming,
          autonomous AI creator tools, and real-time commercial analytics.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('feed')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.45)] transition transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 text-cyan-300" />
            <span>Get Started Free</span>
          </button>

          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>Explore Trending</span>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Zero Latency Feed
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Copilot Enabled
          </span>
        </div>

        {/* Interactive 3D Phone Mockup Visual */}
        <div className="mt-14 relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[640px] rounded-[40px] p-3.5 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-cyan-500/30 shadow-[0_20px_70px_rgba(0,229,255,0.25)] border border-cyan-500/40 select-none">
          {/* Inner Phone Screen */}
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black flex flex-col justify-between p-4">
            {/* Phone Top Notch & Live Chip */}
            <div className="flex items-center justify-between text-xs text-white z-10">
              <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>● LIVE 14.2k in room</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-300">ZORVA NIGHTS</div>
            </div>

            {/* Background Simulated Video */}
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
              alt="Cyberpunk Live"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Right Action Icons overlay */}
            <div className="absolute right-3.5 bottom-28 flex flex-col items-center gap-3 z-10 text-white">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Mira"
                className="w-9 h-9 rounded-full border-2 border-cyan-400"
              />
              <div className="flex flex-col items-center">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <span className="text-[10px] font-bold mt-0.5">852.4K</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-0.5">12.1K</span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span className="text-[9px] font-bold text-cyan-300">AI Stems</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-0.5">94K</span>
              </div>
            </div>

            {/* Bottom Video Meta inside Phone */}
            <div className="relative z-10 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white">@mira_flux</span>
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 text-black text-[8px] font-black flex items-center justify-center">
                  ✓
                </span>
                <span className="text-[10px] text-slate-400">• 3h ago</span>
              </div>
              <p className="text-[11px] text-slate-200 line-clamp-2">
                Generating spatial cyberpunk landscapes in real-time with Zorva Copilot v2.3. Tap...
              </p>
              <div className="mt-2 text-[10px] text-cyan-300 flex items-center gap-1 font-mono">
                <span>✦ Original Mix – Mira Flux (144 BPM Cyber)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Stats Bar */}
      <section className="border-y border-slate-800 bg-[#090C18] py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Global Creators
            </span>
            <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">2.5M+</div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">↗ +34% this month</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Monthly Stream Plays
            </span>
            <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">400M+</div>
            <p className="text-xs text-cyan-400 mt-1 font-medium">⚡ 4K Ultra-Low Latency</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              AI Relevance Accuracy
            </span>
            <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">98.4%</div>
            <p className="text-xs text-purple-400 mt-1 font-medium">✨ Autonomous Tagging</p>
          </div>
        </div>
      </section>

      {/* Six Unified Superpowers Feature Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            ENGINEERED FOR TOMORROW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
            Six Unified Superpowers
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Everything an ambitious modern creator and enterprise needs inside a singular
            low-overhead glass architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Fluid Video Engine */}
          <div className="p-6 rounded-2xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Fluid Video Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ultra high-bitrate 9:16 vertical pipeline featuring frictionless instant-play caching,
              seamless audio synchronization, and HDR-rich rendering.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>H.265 / AV1 Supported</span>
              <span className="text-cyan-400 font-mono">60 FPS</span>
            </div>
          </div>

          {/* 2. Real-Time Social Chat */}
          <div className="p-6 rounded-2xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Real-Time Social Chat</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ultra-responsive direct & group channels equipped with kinetic typing bubbles, audio
              voice notes, and seamless direct-from-feed clipping.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>WebSocket Powered</span>
              <span className="text-emerald-400 font-mono">E2E Encrypted</span>
            </div>
          </div>

          {/* 3. Smart Search & Discover */}
          <div className="p-6 rounded-2xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Smart Search & Discover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predictive trend intelligence indexing viral hashtag velocity, geo-contextual sound
              bites, and hyper-targeted creator matching graphs.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Algorithmic Discovery</span>
              <span className="text-pink-400 font-mono">Real-time Velocity</span>
            </div>
          </div>

          {/* 4. Instant Offline Sharing */}
          <div className="p-6 rounded-2xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">4. Instant Offline Sharing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              One-tap clean video extraction for offline airplane access, watermark-managed exports,
              and cross-network publishing to stories.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Clean Export</span>
              <span className="text-amber-400 font-mono">Offline Vault</span>
            </div>
          </div>

          {/* 5. Business Growth Suite */}
          <div className="p-6 rounded-2xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">5. Business Growth Suite</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Self-serve enterprise campaign builder with verified merchant badges, direct-click
              product pins, and transparent real-time revenue analytics.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Pixel Attribution</span>
              <span className="text-emerald-400 font-mono">Instant Payouts</span>
            </div>
          </div>

          {/* 6. Autonomous AI Copilot */}
          <div className="p-6 rounded-2xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">6. Autonomous AI Copilot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated multilingual voice dubbing, dynamic video summaries, viral hook generation,
              and smart auto-tagging for maximum distribution.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>LLM Scripting</span>
              <span className="text-indigo-400 font-mono">Auto Subtitling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Zorva AI Copilot Showcase (Matching Screenshot 1) */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1426] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-cyan-300 flex items-center justify-center border border-cyan-500/40">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Zorva AI Creative Copilot</h4>
                <p className="text-[11px] text-emerald-400">Status: Active & Listening</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              v3.4 Neural
            </span>
          </div>

          <div className="my-5 space-y-3">
            {/* User Bubble */}
            <div className="flex justify-end">
              <div className="max-w-md p-3.5 rounded-2xl rounded-tr-none bg-purple-900/40 border border-purple-700/50 text-xs text-slate-200 leading-relaxed">
                Can you give me 3 high-hook video angles for tech gadgets that will trend in Tokyo
                this weekend?
              </div>
            </div>

            {/* AI Response Bubble */}
            <div className="flex justify-start">
              <div className="max-w-lg p-4 rounded-2xl rounded-tl-none bg-[#141B32] border border-cyan-500/30 text-xs text-slate-200 space-y-2">
                <p className="text-cyan-300 font-bold">● Generated 3 Viral Hooks:</p>
                <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
                  <li>
                    <strong>Akihabara Pocket Tech:</strong> "The 3 tiny devices Japanese coders never
                    leave home without..."
                  </li>
                  <li>
                    <strong>Holographic Desks:</strong> "Why Tokyo cafes are swapping monitors for
                    AR..."
                  </li>
                  <li>
                    <strong>Cyber Audio Rings:</strong> "Sound without headphones: Testing
                    bone-conduction jewelry."
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition"
            >
              🪄 Auto-Generate Script
            </button>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:text-white transition"
            >
              🗣 Dub to Japanese & Urdu
            </button>
            <button
              onClick={() => onNavigate('feed')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:text-white transition"
            >
              🎵 Find Viral Audio
            </button>
          </div>
        </div>
      </section>

      {/* Ready to Command CTA Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-b from-[#10162B] to-[#0A0D1A] border border-slate-800 shadow-2xl relative">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Ready to command the next cultural wave?
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
            Join over 2.5M creators and 15,000 businesses monetizing vertical format content on
            Zorva today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('register')}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition"
            >
              Claim Creator Handle
            </button>
            <button
              onClick={() => onNavigate('feed')}
              className="px-6 py-3 rounded-xl font-bold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              Open Web App
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060810] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <ZorvaLogo size="sm" tagline={false} onClick={() => onNavigate('landing')} />

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button onClick={() => onNavigate('feed')} className="hover:text-white">
              Platform
            </button>
            <button onClick={() => onNavigate('upload')} className="hover:text-white">
              Studio
            </button>
            <button onClick={() => onNavigate('business-promo')} className="hover:text-white">
              Brands
            </button>
            <button onClick={() => onNavigate('settings')} className="hover:text-white">
              Privacy
            </button>
            <button onClick={() => onNavigate('admin-login')} className="hover:text-white">
              Admin Access
            </button>
          </div>

          <div className="text-[11px] text-slate-500 text-center md:text-right">
            <div>Backend Engine: High-Performance PHP 8.3 & MySQL Cluster</div>
            <div>TLS 1.3 • SOC2 Type II Certified • GDPR Compliant</div>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-600 mt-8">
          © {new Date().getFullYear()} Zorva Interactive Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
