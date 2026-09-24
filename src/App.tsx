import React, { useState, useEffect } from 'react';
import {
  PageId,
  User,
  VideoItem,
  NotificationItem
} from './types';
import { CURRENT_USER, MOCK_VIDEOS, MOCK_NOTIFICATIONS } from './data/mockData';
import { TopNavbar } from './components/navigation/TopNavbar';
import { Sidebar } from './components/navigation/Sidebar';
import { BottomNav } from './components/navigation/BottomNav';
import { QuickPageSwitcher } from './components/navigation/QuickPageSwitcher';

// Pages
import { LandingPage } from './components/landing/LandingPage';
import { FeedView } from './components/feed/FeedView';
import { UploadView } from './components/upload/UploadView';
import { AIAssistantView } from './components/ai/AIAssistantView';
import { DiscoverView } from './components/discover/DiscoverView';
import { MessagesView } from './components/chat/MessagesView';
import { ProfileView } from './components/profile/ProfileView';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { BusinessHubView } from './components/business/BusinessHubView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { SettingsView } from './components/settings/SettingsView';
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { AdminLoginView } from './components/admin/AdminLoginView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';

const VALID_PAGES: PageId[] = [
  'landing',
  'feed',
  'discover',
  'upload',
  'video-details',
  'profile',
  'edit-profile',
  'messages',
  'ai-assistant',
  'business-promo',
  'business-dashboard',
  'notifications',
  'settings',
  'admin-login',
  'admin-dashboard',
  'login',
  'register'
];

function getInitialPage(): PageId {
  try {
    const redirectPath = sessionStorage.getItem('zorva_redirect_path');
    if (redirectPath) {
      sessionStorage.removeItem('zorva_redirect_path');
      const clean = redirectPath.replace(/^\/+/, '').split('?')[0].split('#')[0] as PageId;
      if (VALID_PAGES.includes(clean)) return clean;
    }

    const path = window.location.pathname.replace(/^\/+/, '').split('?')[0] as PageId;
    if (VALID_PAGES.includes(path)) return path;

    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0] as PageId;
    if (VALID_PAGES.includes(hash)) return hash;
  } catch {
    // ignore
  }
  return 'feed';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage());
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [videos, setVideos] = useState<VideoItem[]>(MOCK_VIDEOS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [selectedCreator, setSelectedCreator] = useState<User | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Sound & Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Sync URL history on route change
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    try {
      const targetUrl = page === 'feed' ? '/' : `/${page}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ page }, '', targetUrl);
      }
    } catch {
      // Safe fallback if history API is restricted in iframe
    }
  };

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.page && VALID_PAGES.includes(e.state.page)) {
        setCurrentPage(e.state.page);
      } else {
        const path = window.location.pathname.replace(/^\/+/, '') as PageId;
        if (VALID_PAGES.includes(path)) {
          setCurrentPage(path);
        } else {
          setCurrentPage('feed');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Like video handler
  const handleLikeVideo = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          const isLiked = !v.isLiked;
          return {
            ...v,
            isLiked,
            likesCount: isLiked ? v.likesCount + 1 : v.likesCount - 1
          };
        }
        return v;
      })
    );
  };

  // Save video handler
  const handleSaveVideo = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          const isSaved = !v.isSaved;
          return {
            ...v,
            isSaved,
            savesCount: isSaved ? v.savesCount + 1 : v.savesCount - 1
          };
        }
        return v;
      })
    );
  };

  // Follow creator handler
  const handleFollowCreator = (creatorId: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.creator.id === creatorId) {
          const isFollowing = !v.creator.isFollowing;
          return {
            ...v,
            creator: {
              ...v.creator,
              isFollowing,
              followersCount: isFollowing
                ? v.creator.followersCount + 1
                : v.creator.followersCount - 1
            }
          };
        }
        return v;
      })
    );
  };

  // Publish video handler
  const handlePublishSuccess = (newVid: Partial<VideoItem>) => {
    const created: VideoItem = {
      id: `v_${Date.now()}`,
      title: newVid.title || 'Untitled Creation',
      caption: newVid.caption || '',
      videoUrl: '',
      thumbnailUrl:
        newVid.thumbnailUrl ||
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      canvasVisualTheme: 'cyberpunk-neon',
      creator: currentUser,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      savesCount: 0,
      viewsCount: 142,
      duration: '0:35',
      soundTitle: 'Original Audio • ' + currentUser.name,
      soundAuthor: currentUser.name,
      category: newVid.category || 'Technology',
      tags: ['#zorva', '#viral', '#tech'],
      allowComments: newVid.allowComments ?? true,
      allowDownloads: newVid.allowDownloads ?? true,
      visibility: newVid.visibility || 'public',
      resolution: '4K',
      fps: 60,
      hdr: true,
      viralResonance: 99.1,
      createdAt: 'Just now'
    };

    setVideos([created, ...videos]);
    navigateTo('feed');
  };

  const handleOpenCreatorProfile = (creator: User) => {
    setSelectedCreator(creator);
    navigateTo('profile');
  };

  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    navigateTo('feed');
  };

  const handleShareToChat = (video: VideoItem) => {
    navigateTo('messages');
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Check if current page is full-page without normal shell
  const isFullPage = ['landing', 'login', 'register', 'admin-login'].includes(currentPage);

  return (
    <div
      className={`min-h-screen text-slate-100 flex flex-col font-sans transition-colors duration-200 ${
        themeMode === 'dark' ? 'bg-[#070913]' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Full Page Views (Landing, Login, Register, Admin Login) */}
      {currentPage === 'landing' && <LandingPage onNavigate={navigateTo} />}
      {currentPage === 'login' && (
        <LoginView
          currentUser={currentUser}
          onLoginSuccess={(u) => setCurrentUser(u)}
          onNavigate={navigateTo}
        />
      )}
      {currentPage === 'register' && (
        <RegisterView
          onRegisterSuccess={(u) => setCurrentUser(u)}
          onNavigate={navigateTo}
        />
      )}
      {currentPage === 'admin-login' && (
        <AdminLoginView
          onAdminLoginSuccess={() => setIsAdminAuthenticated(true)}
          onNavigate={navigateTo}
        />
      )}

      {/* Main Authenticated Layout Shell */}
      {!isFullPage && (
        <>
          <TopNavbar
            currentPage={currentPage}
            onNavigate={navigateTo}
            currentUser={currentUser}
            onSwitchUserRole={(role) => {
              setCurrentUser((prev) => ({
                ...prev,
                isBusiness: role === 'business',
                role
              }));
            }}
            themeMode={themeMode}
            onToggleTheme={handleToggleTheme}
            notifications={notifications}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={() => navigateTo('discover')}
          />

          <div className="flex-1 flex max-w-full">
            <Sidebar
              currentPage={currentPage}
              onNavigate={navigateTo}
              currentUser={currentUser}
              unreadMessagesCount={2}
            />

            <main className="flex-1 pb-20 md:pb-6 overflow-x-hidden min-h-[calc(100vh-4rem)]">
              {currentPage === 'feed' && (
                <FeedView
                  videos={videos}
                  currentUser={currentUser}
                  onLikeVideo={handleLikeVideo}
                  onSaveVideo={handleSaveVideo}
                  onFollowCreator={handleFollowCreator}
                  onOpenCreatorProfile={handleOpenCreatorProfile}
                  onShareToChat={handleShareToChat}
                />
              )}

              {currentPage === 'discover' && (
                <DiscoverView
                  videos={videos}
                  currentUser={currentUser}
                  onSelectVideo={handleSelectVideo}
                  onFollowCreator={handleFollowCreator}
                />
              )}

              {currentPage === 'upload' && (
                <UploadView
                  currentUser={currentUser}
                  onPublishSuccess={handlePublishSuccess}
                  onOpenAI={() => navigateTo('ai-assistant')}
                />
              )}

              {currentPage === 'ai-assistant' && (
                <AIAssistantView
                  currentUser={currentUser}
                  onInsertToUpload={(text) => {
                    navigateTo('upload');
                  }}
                />
              )}

              {currentPage === 'messages' && <MessagesView currentUser={currentUser} />}

              {currentPage === 'profile' && (
                <ProfileView
                  user={selectedCreator || currentUser}
                  videos={videos}
                  currentUser={currentUser}
                  onEditProfileClick={() => setShowEditProfileModal(true)}
                  onFollowToggle={handleFollowCreator}
                  onSelectVideo={handleSelectVideo}
                  onOpenBusinessDashboard={() => navigateTo('business-dashboard')}
                />
              )}

              {currentPage === 'edit-profile' && (
                <ProfileView
                  user={currentUser}
                  videos={videos}
                  currentUser={currentUser}
                  onEditProfileClick={() => setShowEditProfileModal(true)}
                  onSelectVideo={handleSelectVideo}
                />
              )}

              {(currentPage === 'business-promo' || currentPage === 'business-dashboard') && (
                <BusinessHubView
                  currentUser={currentUser}
                  onNavigateToUpload={() => navigateTo('upload')}
                  onOpenAI={() => navigateTo('ai-assistant')}
                />
              )}

              {currentPage === 'notifications' && (
                <NotificationsView
                  notifications={notifications}
                  currentUser={currentUser}
                  onMarkAllAsRead={handleMarkAllNotifsRead}
                  onNavigateToFeed={() => navigateTo('feed')}
                />
              )}

              {currentPage === 'settings' && (
                <SettingsView
                  currentUser={currentUser}
                  themeMode={themeMode}
                  onToggleTheme={handleToggleTheme}
                  onLogout={() => navigateTo('login')}
                />
              )}

              {currentPage === 'admin-dashboard' && (
                <AdminDashboardView
                  videos={videos}
                  onLogoutAdmin={() => {
                    setIsAdminAuthenticated(false);
                    navigateTo('feed');
                  }}
                  onNavigateToFeed={() => navigateTo('feed')}
                />
              )}
            </main>
          </div>

          <BottomNav
            currentPage={currentPage}
            onNavigate={navigateTo}
            currentUser={currentUser}
            unreadMessagesCount={2}
          />
        </>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal
          user={currentUser}
          onSave={(updated) => setCurrentUser((prev) => ({ ...prev, ...updated }))}
          onClose={() => setShowEditProfileModal(false)}
        />
      )}

      {/* Floating Quick Page Switcher for seamless test review */}
      <QuickPageSwitcher currentPage={currentPage} onNavigate={navigateTo} />
    </div>
  );
}
