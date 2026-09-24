import {
  User,
  VideoItem,
  CommentItem,
  Conversation,
  ChatMessage,
  BusinessCampaign,
  NotificationItem,
  AdminReport,
  AIPromptTemplate,
  AIMessage
} from '../types';

export const CURRENT_USER: User = {
  id: 'user_current',
  name: 'Creative Studio',
  username: 'zorvacreator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  bio: 'Filmmaker, visual storyteller & neural audio experimenter 🌌 Creating on Zorva v4.3.',
  verified: true,
  followersCount: 142800,
  followingCount: 384,
  likesCount: 2400000,
  isBusiness: true,
  role: 'creator',
  businessDetails: {
    companyName: 'Creative Studio Global',
    website: 'https://creativestudio.zorva.io',
    category: 'Media & Tech',
    verifiedBadge: true
  }
};

export const CREATORS: Record<string, User> = {
  elena: {
    id: 'creator_elena',
    name: 'Elena Vance',
    username: 'elena_creates',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: 'Director & AI Colorist 🎬 4K HDR Real-Time Experiments in Neo-Tokyo.',
    verified: true,
    followersCount: 894000,
    followingCount: 210,
    likesCount: 14800000,
    isFollowing: true,
    role: 'creator'
  },
  mira: {
    id: 'creator_mira',
    name: 'Mira Flux',
    username: 'mira_flux',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    bio: 'Generative spatial cyberpunk landscapes & live neural shaders ⚡',
    verified: true,
    followersCount: 1240000,
    followingCount: 145,
    likesCount: 29500000,
    isFollowing: true,
    role: 'creator'
  },
  nexus: {
    id: 'creator_nexus',
    name: 'Nexus Tech Lab',
    username: 'nexustech_official',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Tactile tech, custom ASMR keyboards & futuristic hardware teardowns 🕹️',
    verified: true,
    followersCount: 642000,
    followingCount: 92,
    likesCount: 8200000,
    isFollowing: false,
    role: 'business'
  },
  marcus: {
    id: 'creator_marcus',
    name: 'Marcus K',
    username: 'marcus_sound',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    bio: 'Synthwave & Spatial Audio Architect. Stem packs on Zorva Marketplace 🎧',
    verified: true,
    followersCount: 412000,
    followingCount: 88,
    likesCount: 5100000,
    isFollowing: false,
    role: 'creator'
  },
  sofia: {
    id: 'creator_sofia',
    name: 'Sofia Radiant',
    username: 'sofia_vogue',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
    bio: 'Neo-streetwear drops & sustainable high-fashion runway vlogs 🪡✨',
    verified: true,
    followersCount: 980000,
    followingCount: 312,
    likesCount: 19400000,
    isFollowing: true,
    role: 'creator'
  },
  akira: {
    id: 'creator_akira',
    name: 'Chef Akira',
    username: 'akira_culinary',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    bio: 'Midnight Tokyo ramen alleys, sizzling wagyu & culinary cyberpunk aesthetics 🍜',
    verified: true,
    followersCount: 520000,
    followingCount: 65,
    likesCount: 9100000,
    isFollowing: false,
    role: 'creator'
  }
};

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'vid_1',
    title: 'Testing the new Zorva AI automated scriptwriter and lighting setup',
    caption: 'Testing out the new Zorva AI automated scriptwriter and lighting setup! ✨ What do you think of this color grade? #ZorvaCreator #Filmmaking #CreativeTech #fyp #aiart',
    creator: CREATORS.elena,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    likesCount: 284500,
    commentsCount: 4892,
    sharesCount: 8140,
    savesCount: 12300,
    viewsCount: 1240000,
    isLiked: true,
    isSaved: false,
    soundTitle: 'Zorva Synthwave Beats • Original Audio (144 BPM)',
    soundAuthor: 'Elena Vance & Zorva AI',
    duration: '0:42',
    tags: ['#ZorvaCreator', '#Filmmaking', '#CreativeTech', '#fyp', '#neon'],
    category: 'Technology',
    createdAt: '2 hours ago',
    allowComments: true,
    allowDownloads: true,
    visibility: 'public',
    resolution: '4K',
    fps: 60,
    hdr: true,
    viralResonance: 98.4,
    canvasVisualTheme: 'cyberpunk-neon'
  },
  {
    id: 'vid_2',
    title: 'Generating spatial cyberpunk landscapes in real-time with Zorva Copilot',
    caption: 'Generating spatial cyberpunk landscapes in real-time with Zorva Copilot v2.3. Tap audio stems to remix in your studio! #SynthesizeBeat #VisualAI #ZorvaOriginals #scifi',
    creator: CREATORS.mira,
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    likesCount: 852400,
    commentsCount: 12100,
    sharesCount: 24300,
    savesCount: 39500,
    viewsCount: 3820000,
    isLiked: false,
    isSaved: true,
    soundTitle: 'Original Mix – Mira Flux (144 BPM Cyber)',
    soundAuthor: 'Mira Flux',
    duration: '0:34',
    tags: ['#SynthesizeBeat', '#VisualAI', '#ZorvaOriginals', '#cyberpunk'],
    category: 'Entertainment',
    createdAt: '5 hours ago',
    allowComments: true,
    allowDownloads: true,
    visibility: 'public',
    resolution: '4K',
    fps: 60,
    hdr: true,
    viralResonance: 99.1,
    canvasVisualTheme: 'ai-stems'
  },
  {
    id: 'vid_3',
    title: 'Tactile ASMR Teardown: 65% Ceramic Keyboard with Lubed Switches',
    caption: 'Stop scrolling if your desk setup sounds like plastic 🔊 Full sound test with ceramic keycaps on brass plate. Specs linked in creator bio! #MechanicalKeyboards #ASMR #DeskSetup #TechReview',
    creator: CREATORS.nexus,
    thumbnailUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    likesCount: 192300,
    commentsCount: 3410,
    sharesCount: 5200,
    savesCount: 18900,
    viewsCount: 890000,
    isLiked: false,
    isSaved: false,
    soundTitle: 'Sub-Bass ASMR #41 – Ultra Pure Thock',
    soundAuthor: 'Nexus Tech Lab',
    duration: '0:29',
    tags: ['#MechanicalKeyboards', '#ASMR', '#DeskSetup', '#TechReview'],
    category: 'Technology',
    createdAt: '1 day ago',
    allowComments: true,
    allowDownloads: true,
    visibility: 'public',
    resolution: '4K',
    fps: 60,
    hdr: false,
    viralResonance: 96.2,
    canvasVisualTheme: 'minimal-dark'
  },
  {
    id: 'vid_4',
    title: 'Tokyo Midnight Ramen Walk: Hidden 4-Seater Alley Behind Shinjuku',
    caption: 'Found this 70-year-old broth recipe hidden behind neon neon alleyways in Shinjuku. The umami depth is insane! 🍜 #TokyoFood #TravelJapan #StreetFood #NightVibes',
    creator: CREATORS.akira,
    thumbnailUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
    likesCount: 431000,
    commentsCount: 5890,
    sharesCount: 14200,
    savesCount: 42100,
    viewsCount: 1980000,
    isLiked: true,
    isSaved: true,
    soundTitle: 'Lofi Shinjuku Rain • Akira Beats',
    soundAuthor: 'Chef Akira',
    duration: '0:48',
    tags: ['#TokyoFood', '#TravelJapan', '#StreetFood', '#NightVibes'],
    category: 'Food',
    createdAt: '2 days ago',
    allowComments: true,
    allowDownloads: true,
    visibility: 'public',
    resolution: '1080p',
    fps: 60,
    hdr: true,
    viralResonance: 97.8,
    canvasVisualTheme: 'tokyo-street'
  },
  {
    id: 'vid_5',
    title: 'Cyberpunk Runway 2026: Liquid Chrome Fabric & Kinetic Pleats',
    caption: 'Our fall collection uses reactive micro-filaments that change refraction depending on humidity and ambient light. Model walking in Shibuya! #CyberFashion #Streetwear #Runway #Vogue',
    creator: CREATORS.sofia,
    thumbnailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    likesCount: 310500,
    commentsCount: 2940,
    sharesCount: 7800,
    savesCount: 15400,
    viewsCount: 1420000,
    isLiked: false,
    isSaved: false,
    soundTitle: 'Berlin Techno Pulse – Runway Mix',
    soundAuthor: 'Sofia Vogue Club',
    duration: '0:38',
    tags: ['#CyberFashion', '#Streetwear', '#Runway', '#Vogue'],
    category: 'Lifestyle',
    createdAt: '3 days ago',
    allowComments: true,
    allowDownloads: true,
    visibility: 'public',
    resolution: '4K',
    fps: 60,
    hdr: true,
    viralResonance: 95.5,
    canvasVisualTheme: 'retro-wave'
  }
];

export const MOCK_COMMENTS: CommentItem[] = [
  {
    id: 'c_1',
    videoId: 'vid_1',
    user: CREATORS.mira,
    text: 'That volumetric blue rim lighting is so clean! Did you prompt the Zorva engine for that specific atmospheric haze?',
    timestamp: '1h ago',
    likesCount: 342,
    isLiked: true
  },
  {
    id: 'c_2',
    videoId: 'vid_1',
    user: CREATORS.nexus,
    text: 'The color grading curve matches 10-bit cinema log flawlessly. Drop the node breakdown please!',
    timestamp: '45m ago',
    likesCount: 128,
    isLiked: false
  },
  {
    id: 'c_3',
    videoId: 'vid_1',
    user: CREATORS.marcus,
    text: 'Synced this with the 144 BPM synth stem and the transitions hit right on the bass drop 🔥🔥',
    timestamp: '30m ago',
    likesCount: 94,
    isLiked: false
  },
  {
    id: 'c_4',
    videoId: 'vid_1',
    user: CURRENT_USER,
    text: 'Instant bookmark. Using this hook structure for my next commercial ad!',
    timestamp: '10m ago',
    likesCount: 15,
    isLiked: false
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_elena',
    participant: CREATORS.elena,
    lastMessage: 'Let’s collaborate on the next 3D procedural short!',
    lastMessageTimestamp: '10:42 AM',
    unreadCount: 2,
    online: true
  },
  {
    id: 'conv_mira',
    participant: CREATORS.mira,
    lastMessage: 'Just sent the stem package link in your Zorva vault.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
    online: true
  },
  {
    id: 'conv_nexus',
    participant: CREATORS.nexus,
    lastMessage: 'The sponsored review reel hit 890k views in 24 hours!',
    lastMessageTimestamp: '2d ago',
    unreadCount: 0,
    online: false
  },
  {
    id: 'conv_sofia',
    participant: CREATORS.sofia,
    lastMessage: 'Are you attending the Neo-Tokyo Creator Summit next week?',
    lastMessageTimestamp: '3d ago',
    unreadCount: 0,
    online: false
  }
];

export const MOCK_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  conv_elena: [
    {
      id: 'm1',
      senderId: 'creator_elena',
      receiverId: 'user_current',
      text: 'Hey! Loved your recent video on real-time neural compositing.',
      timestamp: '10:30 AM',
      isRead: true
    },
    {
      id: 'm2',
      senderId: 'user_current',
      receiverId: 'creator_elena',
      text: 'Thanks Elena! Generated the script hook using Zorva AI Copilot and retention spiked to 78%.',
      timestamp: '10:35 AM',
      isRead: true
    },
    {
      id: 'm3',
      senderId: 'creator_elena',
      receiverId: 'user_current',
      text: 'That is crazy good! Can you share the prompt template?',
      timestamp: '10:40 AM',
      isRead: true
    },
    {
      id: 'm4',
      senderId: 'creator_elena',
      receiverId: 'user_current',
      text: 'Let’s collaborate on the next 3D procedural short!',
      timestamp: '10:42 AM',
      isRead: false
    }
  ]
};

export const MOCK_CAMPAIGNS: BusinessCampaign[] = [
  {
    id: 'camp_1',
    brandName: 'CyberAudio Labs',
    title: 'Acoustic AI Headphone Launch 2026',
    description: 'Promoting spatial binaural noise-cancelling headphones to tech & music enthusiasts.',
    budgetTotal: 5000,
    budgetSpent: 2840,
    impressions: 1840000,
    clicks: 78200,
    conversions: 3410,
    status: 'active',
    ctaText: 'Shop Now',
    ctaUrl: 'https://cyberaudio.example.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    targetCategory: 'Technology',
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    roi: '+314%'
  },
  {
    id: 'camp_2',
    brandName: 'NovaFit Energy',
    title: 'Zero-Sugar Electrolyte Boost for Creatives',
    description: 'Targeting video editors, gamers, and developers working late-night shifts.',
    budgetTotal: 2500,
    budgetSpent: 1950,
    impressions: 920000,
    clicks: 42100,
    conversions: 1820,
    status: 'active',
    ctaText: 'Get Started',
    ctaUrl: 'https://novafit.example.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
    targetCategory: 'Health',
    startDate: '2026-09-10',
    endDate: '2026-09-30',
    roi: '+240%'
  },
  {
    id: 'camp_3',
    brandName: 'NeoTokyo Apparel',
    title: 'Reflective Cyberpunk Streetwear Drop #04',
    description: 'High conversion video ad campaign using 9:16 vertical runway reels.',
    budgetTotal: 8000,
    budgetSpent: 8000,
    impressions: 3400000,
    clicks: 164000,
    conversions: 7890,
    status: 'completed',
    ctaText: 'Shop Now',
    ctaUrl: 'https://neotokyo.example.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    targetCategory: 'Lifestyle',
    startDate: '2026-08-01',
    endDate: '2026-09-01',
    roi: '+480%'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'like',
    actor: CREATORS.elena,
    content: 'liked your video "Procedural 3D Shaders in 60s"',
    timeAgo: '4m ago',
    isRead: false,
    targetThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif_2',
    type: 'comment',
    actor: CREATORS.mira,
    content: 'commented: "That volumetric rim lighting is insane!"',
    timeAgo: '22m ago',
    isRead: false,
    targetThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif_3',
    type: 'follow',
    actor: CREATORS.nexus,
    content: 'started following your creative studio.',
    timeAgo: '1h ago',
    isRead: true
  },
  {
    id: 'notif_4',
    type: 'business',
    actor: CURRENT_USER,
    content: 'Campaign "CyberAudio Labs Launch" reached 1.84M impressions milestone (+314% ROI).',
    timeAgo: '3h ago',
    isRead: true
  },
  {
    id: 'notif_5',
    type: 'ai',
    actor: {
      id: 'zorva_ai',
      name: 'Zorva AI Copilot',
      username: 'zorva_ai',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      bio: 'Autonomous Social Intelligence',
      verified: true,
      followersCount: 1000000,
      followingCount: 0,
      likesCount: 50000000
    },
    content: 'Audience peak alert: Best time to publish in your niche is today at 19:45 EST.',
    timeAgo: '5h ago',
    isRead: true
  }
];

export const MOCK_REPORTS: AdminReport[] = [
  {
    id: 'rep_1',
    targetType: 'video',
    targetId: 'vid_99',
    reportedBy: '@alex_tech',
    reason: 'Copyright Infringement',
    status: 'pending',
    timestamp: '15m ago',
    details: 'Unlicensed commercial background audio track detected by automated acoustic fingerprinter.'
  },
  {
    id: 'rep_2',
    targetType: 'comment',
    targetId: 'com_404',
    reportedBy: '@sara_art',
    reason: 'Spam & Scam',
    status: 'pending',
    timestamp: '1h ago',
    details: 'Suspicious crypto giveaway link posted repeatedly across 8 creator comment threads.'
  },
  {
    id: 'rep_3',
    targetType: 'user',
    targetId: 'usr_bot3',
    reportedBy: 'Zorva Neural Shield',
    reason: 'Harassment',
    status: 'resolved',
    timestamp: '6h ago',
    details: 'Automated bot activity blocked after triggering rate limits & abusive sentiment flags.'
  }
];

export const MOCK_AI_TEMPLATES: AIPromptTemplate[] = [
  {
    id: 't_script',
    category: 'script',
    title: 'Viral Video Scripts',
    prompt: 'Write a 30s TikTok/Reel hook for an ultra-compact mechanical keyboard review, targeting desk aesthetic enthusiasts.',
    preview: 'Cinematic 3-second tension hook with tactile sound and high-contrast B-roll directions.'
  },
  {
    id: 't_captions',
    category: 'captions',
    title: 'Viral Captions & Tags',
    prompt: 'Generate 5 high-converting captions with viral hashtags for a cyberpunk street photography vlog in Tokyo.',
    preview: 'High velocity hashtags, engagement questions & SEO search discovery terms.'
  },
  {
    id: 't_growth',
    category: 'growth',
    title: 'Business & Ads Strategy',
    prompt: 'Propose a promotional ad strategy with target audience & CTA for a local specialty coffee roastery.',
    preview: 'Audience profiling, high-converting offer hooks & ROI projection.'
  },
  {
    id: 't_trends',
    category: 'trends',
    title: 'Content & Sound Trends',
    prompt: 'What are the top 5 trending audio tempos and editing styles dominating vertical video this week?',
    preview: 'BPM analysis, beat-drop transition timing & viral sound predictions.'
  }
];

export const INITIAL_AI_CHAT: AIMessage[] = [
  {
    id: 'ai_msg_1',
    role: 'user',
    content: 'Can you write a high-tension 30-second video script hook for an ultra-compact mechanical keyboard review, targeting setup aesthetic enthusiasts?',
    timestamp: '10:42 AM'
  },
  {
    id: 'ai_msg_2',
    role: 'assistant',
    content: 'Here is a cinematic, tactile 30-second reel script built to maximize 3-second retention and audio-first bookmarking:',
    timestamp: '10:42 AM',
    scriptData: {
      hookRate: '78.4%',
      audienceResonance: 'Desk Setup / Edits',
      recommendedSound: 'Sub-Bass ASMR #41',
      scriptSegments: [
        {
          time: '0:00 - 0:03 HOOK',
          label: 'HOOK',
          text: '"Stop scrolling if your desk setup sounds like cheap plastic."',
          broll: '(Silent ASMR switch pop directly against microphone)'
        },
        {
          time: '0:04 - 0:12 PROBLEM',
          label: 'PROBLEM',
          text: '"Most compact keyboards sacrifice dampening foam for gimmick harsh RGB. But this aluminum monolith? It weighs 2.4 pounds."',
          broll: 'Quick cuts of cluttered, bulky keyboards with flashing harsh RGB'
        },
        {
          time: '0:13 - 0:24 REVEAL',
          label: 'REVEAL',
          text: '"Lubed linear switches, gasket mounted, and battery life that outlasts your work week. Listen to this spacebar."',
          broll: 'Slow glide shot over matte ceramic keycaps. 2 seconds pure deep thock audio.'
        },
        {
          time: '0:25 - 0:30 CTA',
          label: 'CTA',
          text: '"Specs linked in creator basket below. Drop a ⌨️ if you need sound test stems."',
          broll: 'Clean overhead top-down shot of minimalist desk setup'
        }
      ]
    }
  }
];
