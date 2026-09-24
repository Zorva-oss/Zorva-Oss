import React, { useState, useEffect } from 'react';
import { VideoItem, User } from '../../types';
import { VideoPlayerCard } from './VideoPlayerCard';

interface FeedViewProps {
  videos: VideoItem[];
  currentUser: User;
  onLikeVideo: (videoId: string) => void;
  onSaveVideo: (videoId: string) => void;
  onFollowCreator: (creatorId: string) => void;
  onOpenCreatorProfile: (creator: User) => void;
  onShareToChat: (video: VideoItem) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  videos,
  currentUser,
  onLikeVideo,
  onSaveVideo,
  onFollowCreator,
  onOpenCreatorProfile,
  onShareToChat
}) => {
  const [feedTab, setFeedTab] = useState<'for-you' | 'following'>('for-you');
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayVideos =
    feedTab === 'following'
      ? videos.filter((v) => v.creator.isFollowing)
      : videos;

  const currentVideo = displayVideos[currentIndex] || videos[0];

  const handleNext = () => {
    if (currentIndex < displayVideos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(displayVideos.length - 1);
    }
  };

  // Keyboard navigation support: W/S or ArrowUp/ArrowDown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, displayVideos.length]);

  return (
    <div className="flex-1 flex flex-col items-center justify-between min-h-[calc(100vh-4rem)] p-2 sm:p-4">
      {/* Top Feed Tabs: For You vs Following */}
      <div className="flex items-center gap-6 mb-2 z-20">
        <button
          onClick={() => {
            setFeedTab('for-you');
            setCurrentIndex(0);
          }}
          className={`text-base font-bold transition relative pb-1 ${
            feedTab === 'for-you' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          For You
          {feedTab === 'for-you' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setFeedTab('following');
            setCurrentIndex(0);
          }}
          className={`text-base font-bold transition relative pb-1 flex items-center gap-1.5 ${
            feedTab === 'following' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Following
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {feedTab === 'following' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          )}
        </button>
      </div>

      {/* Main Video Viewport */}
      {currentVideo ? (
        <VideoPlayerCard
          video={currentVideo}
          currentUser={currentUser}
          onLike={onLikeVideo}
          onSave={onSaveVideo}
          onFollow={onFollowCreator}
          onNext={handleNext}
          onPrev={handlePrev}
          onOpenCreatorProfile={onOpenCreatorProfile}
          onShareToChat={onShareToChat}
        />
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-base font-semibold">No videos found in this feed.</p>
          <button
            onClick={() => setFeedTab('for-you')}
            className="mt-3 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold"
          >
            Switch to For You
          </button>
        </div>
      )}
    </div>
  );
};
