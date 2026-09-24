import React, { useState } from 'react';
import {
  Search,
  Send,
  Image as ImageIcon,
  Smile,
  Mic,
  Video,
  MoreVertical,
  ShieldAlert,
  UserX,
  Phone,
  Video as VideoCall,
  CheckCheck
} from 'lucide-react';
import { User, Conversation, ChatMessage } from '../../types';
import { MOCK_CONVERSATIONS, MOCK_CHAT_MESSAGES } from '../../data/mockData';

interface MessagesViewProps {
  currentUser: User;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ currentUser }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv_elena');
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(MOCK_CHAT_MESSAGES);
  const [messageInput, setMessageInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const currentMessages = messagesMap[activeConvId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      receiverId: activeConversation.participant.id,
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg]
    }));

    // Update conversation list preview
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { ...c, lastMessage: newMsg.text, lastMessageTimestamp: 'Just now' }
          : c
      )
    );

    setMessageInput('');

    // Simulate reply after 1.5s
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMsg: ChatMessage = {
          id: `reply_${Date.now()}`,
          senderId: activeConversation.participant.id,
          receiverId: currentUser.id,
          text: `Awesome idea! I just checked the Zorva neural parameters you suggested. Let's make it trend! 🚀`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        };
        setMessagesMap((prev) => ({
          ...prev,
          [activeConvId]: [...(prev[activeConvId] || []), replyMsg]
        }));
      }, 1800);
    }, 800);
  };

  const handleSendImageDemo = () => {
    const newMsg: ChatMessage = {
      id: `img_${Date.now()}`,
      senderId: currentUser.id,
      receiverId: activeConversation.participant.id,
      text: 'Check out this 3D neural color grade preview:',
      mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      mediaType: 'image',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg]
    }));
  };

  const filteredConversations = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.participant.username.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 h-[calc(100vh-4.5rem)] flex gap-6 select-none">
      {/* Left Column: Conversation List */}
      <div className="w-full sm:w-80 md:w-96 flex flex-col bg-[#0D1224] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Direct Messages</h2>
            <span className="text-xs text-cyan-400 font-mono font-bold">Online</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-[#141B32] text-white text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
          {filteredConversations.map((conv) => {
            const isActive = conv.id === activeConvId;
            return (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`p-3 rounded-2xl flex items-center gap-3 cursor-pointer transition ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-cyan-500/40'
                    : 'hover:bg-slate-800/60'
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.participant.avatar}
                    alt={conv.participant.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0D1224]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate flex items-center gap-1">
                      {conv.participant.name}
                      {conv.participant.verified && <span className="text-cyan-400 text-[10px]">✓</span>}
                    </span>
                    <span className="text-[10px] text-slate-500">{conv.lastMessageTimestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black text-[10px] font-black flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      <div className="hidden sm:flex flex-1 flex-col bg-[#0D1224] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0A0E1C]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeConversation.participant.avatar}
                alt={activeConversation.participant.name}
                className="w-10 h-10 rounded-full object-cover border border-cyan-400"
              />
              {activeConversation.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1">
                {activeConversation.participant.name}
                {activeConversation.participant.verified && (
                  <span className="text-cyan-400 text-xs">✓</span>
                )}
              </h3>
              <p className="text-[11px] text-emerald-400">
                {activeConversation.online ? 'Active now on Zorva' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition">
              <VideoCall className="w-4 h-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0E1324] border border-slate-800 rounded-2xl shadow-2xl p-2 z-30">
                  <button
                    onClick={() => setShowOptions(false)}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                  >
                    <UserX className="w-3.5 h-3.5 text-amber-400" />
                    Block User
                  </button>
                  <button
                    onClick={() => setShowOptions(false)}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg flex items-center gap-2"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Report Conversation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {currentMessages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                      : 'bg-[#151C36] text-slate-200 rounded-tl-none border border-slate-700/60'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Image Attachment Preview */}
                  {msg.mediaUrl && (
                    <img
                      src={msg.mediaUrl}
                      alt="Attachment"
                      className="mt-2.5 rounded-xl max-h-48 w-full object-cover border border-white/10"
                    />
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1 px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{activeConversation.participant.name} is typing...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-[#0A0E1C] flex items-center gap-2">
          <button
            type="button"
            onClick={handleSendImageDemo}
            className="p-2 text-slate-400 hover:text-cyan-400 transition"
            title="Attach Demo Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 text-slate-400 hover:text-cyan-400 transition">
            <Smile className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 text-slate-400 hover:text-cyan-400 transition">
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={`Message @${activeConversation.participant.username}...`}
            className="flex-1 bg-[#141B32] text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold disabled:opacity-50 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
