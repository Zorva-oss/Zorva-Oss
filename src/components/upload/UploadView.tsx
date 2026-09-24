import React, { useState } from 'react';
import {
  UploadCloud,
  Sparkles,
  Volume2,
  Lock,
  Globe,
  Users,
  Clock,
  CheckCircle,
  FileVideo,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { VideoCategory, VideoItem, User } from '../../types';
import { ProceduralVideoCanvas } from '../common/ProceduralVideoCanvas';

interface UploadViewProps {
  currentUser: User;
  onPublishSuccess: (newVideo: Partial<VideoItem>) => void;
  onOpenAI: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  currentUser,
  onPublishSuccess,
  onOpenAI
}) => {
  const [caption, setCaption] = useState(
    'Autonomous multi-agent 3D render pipeline running in real-time. Built for next-gen volumetric feeds! #zorva #tech #viral'
  );
  const [category, setCategory] = useState<VideoCategory>('Technology');
  const [visibility, setVisibility] = useState<'public' | 'followers' | 'private'>('public');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuets, setAllowDuets] = useState(true);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [launchTiming, setLaunchTiming] = useState<'immediate' | 'peak'>('immediate');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(85);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(2);
  const [isPublished, setIsPublished] = useState(false);

  const tags = ['#viral', '#zorva', '#trending', '#tech', '#aiart', '#motiongraphics'];

  const frameThumbnails = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80'
  ];

  const handleGenerateAICaption = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setCaption(
        'Testing the next-generation Zorva Neural Engine v4.3 in 4K HDR! Instant audio stems and realtime procedural lighting. What visual style should I render next? #ZorvaCreator #Filmmaking #CreativeTech #fyp'
      );
      setIsGeneratingAI(false);
    }, 700);
  };

  const handleAddTag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption((prev) => `${prev} ${tag}`);
    }
  };

  const handlePublish = () => {
    setUploadProgress(100);
    setIsPublished(true);

    const newVideo: Partial<VideoItem> = {
      title: caption.slice(0, 40),
      caption,
      category,
      visibility,
      allowComments,
      allowDownloads,
      thumbnailUrl: frameThumbnails[selectedFrameIndex]
    };

    setTimeout(() => {
      onPublishSuccess(newVideo);
    }, 1200);
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            STUDIO HUB // CLOUD NODE #428
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Upload & Distribute
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ingest high-fidelity media, enrich with neural metadata, and launch globally across
            Zorva feeds.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            AI Ingest: Online
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">
            Max 4K HDR 60fps
          </div>
        </div>
      </div>

      {isPublished ? (
        <div className="p-12 text-center rounded-3xl bg-[#0E1324] border border-cyan-500/40 shadow-2xl animate-in zoom-in-95">
          <CheckCircle className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white">Video Published Successfully!</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Your clip has been distributed to the Zorva edge network and is now live in the global
            For You algorithm.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Drag & Drop + Live Vertical Canvas Preview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Drag & Drop Area */}
            <div className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 rounded-3xl p-6 sm:p-8 bg-[#0D1224]/60 text-center flex flex-col items-center justify-center transition-all group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Drag & drop video here</h3>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                Supported: MP4, MOV, or WebM up to 2GB. Uncompressed 10-bit color grade enabled.
              </p>
              <button className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition">
                Browse Device
              </button>
              <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-center gap-3 text-[10px] text-slate-500 font-mono">
                <span>H.265 / AV1</span>
                <span>•</span>
                <span>9:16 Vertical</span>
                <span>•</span>
                <span>≤ 180s</span>
              </div>
            </div>

            {/* Live Vertical Canvas Preview */}
            <div className="rounded-3xl bg-[#0B0F1D] border border-slate-800 p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800/80 mb-3">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <FileVideo className="w-4 h-4 text-cyan-400" /> Live Vertical Canvas
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 font-mono border border-cyan-800/50">
                  Ready (Cached)
                </span>
              </div>

              {/* 9:16 Canvas Box */}
              <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800">
                <ProceduralVideoCanvas
                  theme="cyberpunk-neon"
                  isPlaying={true}
                  fallbackImage={frameThumbnails[selectedFrameIndex]}
                />

                {/* Video Info Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-white">
                  <span className="font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                    1080x1920 • 60fps • HDR
                  </span>
                  <Volume2 className="w-4 h-4 text-cyan-300 drop-shadow" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-[11px] font-bold text-white">@{currentUser.username}</p>
                  <p className="text-[10px] text-slate-300 truncate mt-0.5">{caption}</p>
                  <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span className="w-2/3 h-1 bg-cyan-400 rounded-full" />
                    <span>00:27 / 00:45</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Frame Selector */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-semibold flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Thumbnail Selector
                  </span>
                  <button className="text-[11px] text-cyan-400 hover:underline">
                    Upload Custom Cover
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {frameThumbnails.map((frame, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedFrameIndex(idx)}
                      className={`relative aspect-[9/14] rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                        selectedFrameIndex === idx
                          ? 'border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.6)]'
                          : 'border-slate-800 hover:border-slate-600 opacity-60'
                      }`}
                    >
                      <img src={frame} alt="Frame" className="w-full h-full object-cover" />
                      {selectedFrameIndex === idx && (
                        <span className="absolute bottom-1 left-1 right-1 text-center text-[8px] font-bold bg-cyan-500 text-black rounded py-0.5">
                          COVER
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  Drag marker or tap frame to set your default feed thumbnail poster.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata, Audience & Permissions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Caption & AI Assistant Button */}
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Caption & Viral Description</span>
                </label>
                <button
                  onClick={handleGenerateAICaption}
                  disabled={isGeneratingAI}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 hover:bg-purple-600/50 hover:text-white transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
                  <span>{isGeneratingAI ? 'Generating...' : 'Generate with Zorva AI'}</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={2200}
                className="w-full bg-[#12182e] text-slate-200 text-xs sm:text-sm p-3.5 rounded-2xl border border-slate-700/80 focus:outline-none focus:border-cyan-400 leading-relaxed resize-none"
              />

              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="cursor-pointer hover:text-slate-300"># Tag</span>
                  <span className="cursor-pointer hover:text-slate-300">@ Mention</span>
                  <span className="cursor-pointer hover:text-slate-300">☺ Emoji</span>
                </div>
                <span>{caption.length} / 2200</span>
              </div>

              {/* High Velocity Tags Pills */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                  High Velocity Tags:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleAddTag(tag)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Selector */}
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-3">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-400" /> Category & Algorithmic Channel
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VideoCategory)}
                className="w-full bg-[#12182e] text-slate-200 text-xs sm:text-sm p-3 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-400"
              >
                {[
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
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Auto Smart Tagging: Zorva Vision extracts visual embeddings</span>
                </div>
                <span className="text-cyan-400 font-bold font-mono">Active</span>
              </div>
            </div>

            {/* Audience Visibility */}
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-3">
              <label className="text-sm font-bold text-white">Who can watch this video</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setVisibility('public')}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition ${
                    visibility === 'public'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold">Public</span>
                  <span className="text-[10px] opacity-80">Anyone on Zorva</span>
                </button>

                <button
                  onClick={() => setVisibility('followers')}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition ${
                    visibility === 'followers'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold">Followers</span>
                  <span className="text-[10px] opacity-80">Community only</span>
                </button>

                <button
                  onClick={() => setVisibility('private')}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition ${
                    visibility === 'private'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-bold">Private</span>
                  <span className="text-[10px] opacity-80">Only you</span>
                </button>
              </div>
            </div>

            {/* Community Permissions */}
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white">Community Permissions</h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">Allow Comments</p>
                    <p className="text-[11px] text-slate-500">
                      Enable community debate and thread reactions.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowComments}
                    onChange={(e) => setAllowComments(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">Allow Duets & Stitches</p>
                    <p className="text-[11px] text-slate-500">
                      Let other creators remix your audio & vertical canvas.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowDuets}
                    onChange={(e) => setAllowDuets(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">Allow Video Downloads</p>
                    <p className="text-[11px] text-slate-500">
                      Watermarked video can be saved locally by viewers.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowDownloads}
                    onChange={(e) => setAllowDownloads(e.target.checked)}
                    className="w-5 h-5 accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Launch Timing & AI Peak Recommendation */}
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-3">
              <h4 className="text-sm font-bold text-white">Launch Timing</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLaunchTiming('immediate')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                    launchTiming === 'immediate'
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  ⚡ Post Immediately
                </button>
                <button
                  onClick={() => setLaunchTiming('peak')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                    launchTiming === 'peak'
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1" /> Schedule for Peak
                </button>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Next audience peak detected: Today at 19:45 EST (+38% projected lift)</span>
              </div>
            </div>

            {/* Upload Progress & Final Buttons (Matching Screenshot 4) */}
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Uploading & Encoding Media...
                </span>
                <span className="font-mono text-cyan-400 font-bold">{uploadProgress}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500">
                Processing HDR 1080x1920 • Segment 34/40 finalized • CDN edge replicates active
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition">
                  Save Draft
                </button>
                <button
                  onClick={handlePublish}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  🚀 Publish Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
