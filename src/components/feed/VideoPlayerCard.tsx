import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Download,
  Volume2,
  VolumeX,
  Plus,
  Check,
  Disc3,
  Sliders,
  Sparkles,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Copy,
  ExternalLink,
  Send,
  X
} from 'lucide-react';
import { VideoItem, User, CommentItem } from '../../types';
import { ProceduralVideoCanvas } from '../common/ProceduralVideoCanvas';
import { soundEngine } from '../../services/soundEngine';

interface VideoPlayerCardProps {
  video: VideoItem;
  currentUser: User;
  onLike: (videoId: string) => void;
  onSave: (videoId: string) => void;
  onFollow: (creatorId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onShareToChat?: (video: VideoItem) => void;
  onOpenCreatorProfile?: (creator: User) => void;
}

export const VideoPlayerCard: React.FC<VideoPlayerCardProps> = ({
  video,
  currentUser,
  onLike,
  onSave,
  onFollow,
  onNext,
  onPrev,
  onShareToChat,
  onOpenCreatorProfile
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [likeHeartAnimation, setLikeHeartAnimation] = useState(false);

  // Local comments state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      videoId: video.id,
      user: {
        id: 'u1',
        name: 'Mira Flux',
        username: 'mira_flux',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        bio: '3D procedural artist',
        verified: true,
        followersCount: 12000,
        followingCount: 300,
        likesCount: 50000
      },
      text: 'The volumetric blue rim lighting is so clean! Did you prompt the Zorva engine for that specific atmospheric haze?',
      timestamp: '1h ago',
      likesCount: 342,
      isLiked: true
    },
    {
      id: 'c2',
      videoId: video.id,
      user: {
        id: 'u2',
        name: 'Nexus Tech Lab',
        username: 'nexustech_official',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        bio: 'Custom hardware',
        verified: true,
        followersCount: 40000,
        followingCount: 120,
        likesCount: 90000
      },
      text: 'The color grading curve matches 10-bit cinema log flawlessly. Drop the node breakdown please!',
      timestamp: '45m ago',
      likesCount: 128
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  // Handle Audio playback
  const handleToggleSound = () => {
    const currentlyPlaying = soundEngine.getStatus();
    if (currentlyPlaying) {
      soundEngine.stop();
      setIsMuted(true);
    } else {
      soundEngine.playSynthwaveBeat();
      setIsMuted(false);
    }
  };

  const handleDoubleTapLike = () => {
    if (!video.isLiked) {
      onLike(video.id);
    }
    setLikeHeartAnimation(true);
    setTimeout(() => setLikeHeartAnimation(false), 800);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      videoId: video.id,
      user: currentUser,
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likesCount: 0
    };
    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center gap-6 py-2 select-none">
      {/* Realtime Stream telemetry card (Desktop left) */}
      <div className="hidden xl:flex flex-col gap-3 w-64 p-4 rounded-2xl bg-[#0D1224]/85 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-ping" />
          <span>Realtime Stream</span>
        </div>

        <div className="space-y-1.5 border-t border-slate-800/80 pt-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Resolution</span>
            <span className="text-white font-mono font-bold">
              {video.resolution || '4K'} {video.fps || 60}FPS • {video.hdr ? 'HDR' : 'SDR'}
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Smart Audio Match</span>
            <span className="text-cyan-300 font-mono font-bold">
              {video.viralResonance || 98.4}% Viral Resonance
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-200 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>Zorva Synth Engine v2.4</span>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
          <span className="text-slate-400 flex items-center gap-1">
            👁 {(video.viewsCount / 1000000).toFixed(2)}M
          </span>
          <span className="text-emerald-400 font-semibold">+18.4% velocity</span>
        </div>
      </div>

      {/* Main 9:16 Vertical Video Frame */}
      <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 flex items-center justify-center">
        {/* Procedural Canvas Video Renderer */}
        <div
          className="w-full h-full cursor-pointer relative"
          onClick={() => setIsPlaying(!isPlaying)}
          onDoubleClick={handleDoubleTapLike}
        >
          <ProceduralVideoCanvas
            theme={video.canvasVisualTheme}
            isPlaying={isPlaying}
            fallbackImage={video.thumbnailUrl}
          />

          {/* Double Tap Heart Explosion Effect */}
          {likeHeartAnimation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in-50 duration-200">
              <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]" />
            </div>
          )}
        </div>

        {/* Top Header Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-20">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>LIVE AI REMIXED</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/10 transition"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/10 transition"
              title="More Options / Report"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Floating Actions Bar */}
        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3.5 z-20 pointer-events-auto">
          {/* Creator Profile Avatar + Follow Button */}
          <div className="relative group">
            <button
              onClick={() => onOpenCreatorProfile && onOpenCreatorProfile(video.creator)}
              className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-lg cursor-pointer"
            >
              <img
                src={video.creator.avatar}
                alt={video.creator.name}
                className="w-full h-full rounded-full object-cover"
              />
            </button>
            <button
              onClick={() => onFollow(video.creator.id)}
              className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md transition ${
                video.creator.isFollowing
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 animate-bounce'
              }`}
            >
              {video.creator.isFollowing ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            </button>
          </div>

          {/* Like Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onLike(video.id)}
              className={`w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all ${
                video.isLiked
                  ? 'text-rose-500 bg-rose-500/20 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                  : 'text-white hover:text-rose-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${video.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <span className="text-[11px] font-bold text-white mt-1 drop-shadow">
              {(video.likesCount / 1000).toFixed(1)}K
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowComments(!showComments)}
              className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-cyan-300 transition"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-bold text-white mt-1 drop-shadow">
              {video.commentsCount.toLocaleString()}
            </span>
          </div>

          {/* Save / Bookmark Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onSave(video.id)}
              className={`w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center transition ${
                video.isSaved
                  ? 'text-amber-400 bg-amber-400/20 border-amber-400/50'
                  : 'text-white hover:text-amber-300'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${video.isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <span className="text-[11px] font-bold text-white mt-1 drop-shadow">
              {(video.savesCount / 1000).toFixed(1)}K
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowShareModal(true)}
              className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-cyan-300 transition"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-bold text-white mt-1 drop-shadow">
              {(video.sharesCount / 1000).toFixed(1)}K
            </span>
          </div>

          {/* Download Save HD Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleDownload}
              className={`w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center transition ${
                downloadSuccess ? 'text-emerald-400 bg-emerald-500/20' : 'text-white hover:text-cyan-300'
              }`}
              title="Download Clean HD"
            >
              <Download className="w-5 h-5" />
            </button>
            <span className="text-[9px] font-semibold text-slate-300 mt-1">
              {downloadSuccess ? 'Saved!' : 'Save HD'}
            </span>
          </div>

          {/* Rotating Audio Vinyl Disc */}
          <div
            onClick={handleToggleSound}
            className={`w-11 h-11 rounded-full p-1 bg-[#151928] border-2 border-slate-700/80 flex items-center justify-center cursor-pointer shadow-lg relative ${
              isPlaying && !isMuted ? 'animate-spin-slow' : ''
            }`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center">
              <Disc3 className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 text-[11px] text-cyan-400">♪</span>
          </div>
        </div>

        {/* Bottom Content Information Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-auto">
          {/* Creator handle & follow badge */}
          <div className="flex items-center gap-2 mb-2">
            <span
              onClick={() => onOpenCreatorProfile && onOpenCreatorProfile(video.creator)}
              className="text-sm font-extrabold text-white cursor-pointer hover:underline"
            >
              @{video.creator.username}
            </span>
            {video.creator.verified && (
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-black text-[9px] font-black flex items-center justify-center">
                ✓
              </span>
            )}
            {!video.creator.isFollowing && (
              <button
                onClick={() => onFollow(video.creator.id)}
                className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-600 hover:bg-purple-500 text-white transition"
              >
                Follow
              </button>
            )}
          </div>

          {/* Caption & Hashtags */}
          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed mb-2">
            {video.caption}
          </p>

          {/* Audio track info */}
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
            <div className="flex items-center gap-1.5 overflow-hidden max-w-[240px]">
              <span className="text-cyan-400">🎵</span>
              <span className="truncate">{video.soundTitle}</span>
            </div>
            <span className="text-slate-400 text-[10px] flex items-center gap-1">
              👁 {(video.viewsCount / 1000000).toFixed(1)}M
            </span>
          </div>

          {/* Progress Timeline Scrubber */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: isPlaying ? '64%' : '35%' }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">0:18 / {video.duration}</span>
          </div>
        </div>

        {/* Comment Drawer Modal */}
        {showComments && (
          <div className="absolute inset-0 bg-[#0E1324]/95 backdrop-blur-xl z-30 p-4 flex flex-col justify-between animate-in slide-in-from-bottom duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white">Comments ({comments.length})</h4>
                <button
                  onClick={() => setShowComments(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3.5 my-3 max-h-[460px] overflow-y-auto pr-1">
                {comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5 text-xs">
                    <img
                      src={c.user.avatar}
                      alt={c.user.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">@{c.user.username}</span>
                        {c.user.verified && <span className="text-cyan-400 text-[10px]">✓</span>}
                        <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                      </div>
                      <p className="text-slate-300 mt-0.5 leading-relaxed">{c.text}</p>
                    </div>
                    <button className="text-slate-400 hover:text-rose-400 flex flex-col items-center">
                      <Heart className={`w-3.5 h-3.5 ${c.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="text-[9px] mt-0.5">{c.likesCount}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handlePostComment} className="relative flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a comment to this clip..."
                className="w-full bg-[#141B32] text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Up/Down Arrow & Keyboard Navigation buttons */}
      <div className="hidden lg:flex flex-col items-center gap-3">
        <button
          onClick={onPrev}
          className="w-10 h-10 rounded-full bg-[#12182e] hover:bg-[#1a2344] text-slate-300 border border-slate-800 flex items-center justify-center transition shadow-lg"
          title="Previous Video"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="w-10 h-10 rounded-full bg-[#12182e] hover:bg-[#1a2344] text-slate-300 border border-slate-800 flex items-center justify-center transition shadow-lg"
          title="Next Video"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono text-center">
          W / S OR<br />↑ / ↓
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#0E1324] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Share Video</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <div className="w-11 h-11 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center">
                  <Copy className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-300">Copy Link</span>
              </button>

              <button
                onClick={() => {
                  if (onShareToChat) onShareToChat(video);
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-300">Zorva Chat</span>
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-300">Embed</span>
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-300">Direct</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#0E1324] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                Report Inappropriate Content
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Help keep Zorva a safe, creative community. Select why you are reporting this video:
            </p>

            <div className="space-y-2">
              {['Copyright Infringement', 'Inappropriate or Explicit', 'Spam or Misleading', 'Harassment or Hate'].map(
                (reason) => (
                  <button
                    key={reason}
                    onClick={() => setShowReportModal(false)}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-200 border border-slate-700/60 transition"
                  >
                    {reason}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
