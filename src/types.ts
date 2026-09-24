/**
 * Core Types for Zorva Social Media & AI Platform
 */

export type PageId =
  | 'landing'
  | 'feed'
  | 'discover'
  | 'upload'
  | 'video-details'
  | 'profile'
  | 'edit-profile'
  | 'messages'
  | 'ai-assistant'
  | 'business-promo'
  | 'business-dashboard'
  | 'notifications'
  | 'settings'
  | 'admin-login'
  | 'admin-dashboard'
  | 'login'
  | 'register';

export type VideoCategory =
  | 'Entertainment'
  | 'Education'
  | 'Business'
  | 'Technology'
  | 'Travel'
  | 'Food'
  | 'Health'
  | 'Sports'
  | 'Lifestyle'
  | 'AI & Future';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar: string;
  bio: string;
  verified: boolean;
  followersCount: number;
  followingCount: number;
  likesCount: number;
  isFollowing?: boolean;
  isBusiness?: boolean;
  businessDetails?: {
    companyName: string;
    website: string;
    category: string;
    verifiedBadge: boolean;
  };
  role?: 'creator' | 'business' | 'admin';
}

export interface VideoItem {
  id: string;
  title: string;
  caption: string;
  creator: User;
  videoUrl?: string;
  thumbnailUrl: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  viewsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  soundTitle: string;
  soundAuthor: string;
  duration: string;
  tags: string[];
  category: VideoCategory;
  createdAt: string;
  allowComments: boolean;
  allowDownloads: boolean;
  visibility: 'public' | 'followers' | 'private';
  resolution?: string;
  fps?: number;
  hdr?: boolean;
  viralResonance?: number;
  canvasVisualTheme: 'cyberpunk-neon' | 'ai-stems' | 'retro-wave' | 'minimal-dark' | 'tokyo-street';
}

export interface CommentItem {
  id: string;
  videoId: string;
  user: User;
  text: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'link';
  sharedVideoId?: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  online: boolean;
  isTyping?: boolean;
}

export interface BusinessCampaign {
  id: string;
  brandName: string;
  title: string;
  description: string;
  budgetTotal: number;
  budgetSpent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status: 'active' | 'in-review' | 'paused' | 'completed';
  ctaText: 'Shop Now' | 'Learn More' | 'Install App' | 'Book Demo' | 'Get Started';
  ctaUrl: string;
  thumbnailUrl: string;
  targetCategory: VideoCategory;
  startDate: string;
  endDate: string;
  roi: string;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'share' | 'business' | 'ai';
  actor: User;
  content: string;
  timeAgo: string;
  isRead: boolean;
  targetVideoId?: string;
  targetThumbnail?: string;
}

export interface AdminReport {
  id: string;
  targetType: 'video' | 'user' | 'comment';
  targetId: string;
  reportedBy: string;
  reason: 'Inappropriate Content' | 'Copyright Infringement' | 'Spam & Scam' | 'Harassment';
  status: 'pending' | 'resolved' | 'dismissed';
  timestamp: string;
  details: string;
}

export interface AIPromptTemplate {
  id: string;
  category: 'script' | 'captions' | 'growth' | 'trends';
  title: string;
  prompt: string;
  preview: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  scriptData?: {
    hookRate: string;
    audienceResonance: string;
    recommendedSound: string;
    scriptSegments: Array<{
      time: string;
      label: string;
      text: string;
      broll?: string;
    }>;
  };
  language?: 'en' | 'ur';
}
