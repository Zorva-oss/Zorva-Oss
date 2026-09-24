import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Copy,
  RotateCw,
  Bookmark,
  Share2,
  ArrowRight,
  Mic,
  Paperclip,
  Languages,
  Check,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { AIMessage, AIPromptTemplate, User } from '../../types';
import { MOCK_AI_TEMPLATES, INITIAL_AI_CHAT } from '../../data/mockData';
import { askZorvaAI } from '../../services/geminiService';

interface AIAssistantViewProps {
  currentUser: User;
  onInsertToUpload: (text: string) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  currentUser,
  onInsertToUpload
}) => {
  const [messages, setMessages] = useState<AIMessage[]>(INITIAL_AI_CHAT);
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'script' | 'captions' | 'growth' | 'trends' | 'general'>('script');
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputPrompt).trim();
    if (!textToSend || isLoading) return;

    const userMsg: AIMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const aiResponse = await askZorvaAI(textToSend, selectedCategory, language);
      setMessages((prev) => [...prev, aiResponse]);
    } catch {
      // safe fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTemplateClick = (template: AIPromptTemplate) => {
    setInputPrompt(template.prompt);
    setSelectedCategory(template.category);
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 select-none">
      {/* Main Chat & Playground Area */}
      <div className="flex-1 flex flex-col justify-between space-y-6">
        {/* Header Hero */}
        <div className="text-center py-4">
          {/* Logo badge with pulse */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#19153a] via-[#101938] to-[#070e20] border border-cyan-500/40 shadow-[0_0_30px_rgba(0,229,255,0.3)] mb-3 relative">
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Z
            </span>
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              ZORVA INTELLIGENCE STUDIO V4.2
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Hello! I'm <span className="text-cyan-400">Zorva</span> <span className="text-purple-400">AI</span>. How can I help you create & grow today?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Ask questions, generate viral short-video captions, brainstorm trending hooks, or optimize your business campaigns.
          </p>

          {/* Multilingual Selector Toggle */}
          <div className="mt-4 inline-flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Languages className="w-3.5 h-3.5 text-cyan-400 ml-2" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                language === 'en' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                language === 'ur' ? 'bg-cyan-500 text-black shadow font-serif' : 'text-slate-400 hover:text-white font-serif'
              }`}
            >
              اردو (Urdu)
            </button>
          </div>
        </div>

        {/* Prompt Category Library Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOCK_AI_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleTemplateClick(tmpl)}
              className="p-4 rounded-2xl bg-[#0D1224] border border-slate-800/90 hover:border-cyan-500/50 hover:bg-[#121933] cursor-pointer transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-cyan-400">
                  {tmpl.category}
                </span>
                <h4 className="text-xs font-bold text-white mt-1 group-hover:text-cyan-300">
                  {tmpl.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  "{tmpl.prompt}"
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-semibold text-cyan-400">
                <span>Use Prompt</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Conversation Stream */}
        <div className="space-y-4 pt-2">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            if (isUser) {
              return (
                <div key={msg.id} className="flex justify-end gap-3 items-start">
                  <div className="max-w-xl p-4 rounded-2xl rounded-tr-none bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-700/50 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg">
                    {msg.content}
                    <div className="text-[10px] text-slate-400 text-right mt-1.5">{msg.timestamp}</div>
                  </div>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400"
                  />
                </div>
              );
            }

            // AI Assistant Card
            return (
              <div key={msg.id} className="flex justify-start gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 text-black flex items-center justify-center shrink-0 mt-1 shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                  <Sparkles className="w-4 h-4" />
                </div>

                <div className="flex-1 max-w-3xl p-5 sm:p-6 rounded-3xl rounded-tl-none bg-[#0D1224] border border-cyan-500/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Zorva Director Agent</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                        9:16 Optimized
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Model v4-Pro
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </div>

                  {/* Rich Script Breakdown Box if present */}
                  {msg.scriptData && (
                    <div className="p-4 rounded-2xl bg-[#090C18] border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pb-2 border-b border-slate-800">
                        <span>SEGMENT SCRIPT • 0:00 - 0:30</span>
                        <span>B-Roll: Macro 4K 60fps</span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        {msg.scriptData.scriptSegments.map((seg, sIdx) => (
                          <div key={sIdx} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-cyan-400 font-bold">[{seg.time}]:</span>
                              {seg.broll && <span className="text-[11px] text-slate-400 italic">{seg.broll}</span>}
                            </div>
                            <p className="text-slate-200 pl-4 border-l border-cyan-500/30 font-medium">
                              {seg.text}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Video Hook Metrics */}
                      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center">
                        <div className="p-2 rounded-xl bg-slate-900/60">
                          <span className="text-[10px] text-slate-400">Est. Hook Hold Rate</span>
                          <p className="text-base font-extrabold text-cyan-400 font-mono">
                            {msg.scriptData.hookRate}
                          </p>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900/60">
                          <span className="text-[10px] text-slate-400">Audience Resonance</span>
                          <p className="text-xs font-bold text-white mt-1">
                            {msg.scriptData.audienceResonance}
                          </p>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900/60">
                          <span className="text-[10px] text-slate-400">Recommended Sound</span>
                          <p className="text-xs font-bold text-pink-400 mt-1 truncate">
                            {msg.scriptData.recommendedSound}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy Text'}</span>
                      </button>

                      <button
                        onClick={() => handleSend('Regenerate with an even higher tension opening hook')}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Regenerate Hook</span>
                      </button>

                      <button className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onInsertToUpload(msg.content)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Insert into Video Upload</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-cyan-400 text-xs font-bold py-2">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Zorva AI is composing high-converting content...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 rounded-2xl bg-[#0D1224] border border-slate-800 shadow-2xl flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="hidden sm:block bg-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 border border-slate-700 focus:outline-none"
          >
            <option value="script">Scripts & Hooks</option>
            <option value="captions">Captions & Tags</option>
            <option value="growth">Business & Ads</option>
            <option value="trends">Viral Trends</option>
          </select>

          <button className="p-2 text-slate-400 hover:text-slate-200">
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'ur'
                ? 'زوروا اے آئی سے کچھ بھی پوچھیں، سکرپٹ لکھوائیں یا ویڈیوز وائرل کریں...'
                : 'Ask Zorva AI anything about video hooks, captions, audio trends, or ad growth...'
            }
            className="flex-1 bg-transparent text-slate-100 text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none px-2"
          />

          <button className="p-2 text-slate-400 hover:text-slate-200">
            <Mic className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleSend()}
            disabled={!inputPrompt.trim() || isLoading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 disabled:opacity-50 transition"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right Sidebar: Recent Prompts & Copilot Status */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Recent Prompts List */}
        <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Recent Prompts</span>
            </h3>
            <span className="text-[10px] text-slate-500">History</span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                type: 'Script',
                time: '10:42 AM',
                title: 'Mechanical Keyboard ASMR Reel',
                desc: '30s high-tension hook for desk aesthetic tech niche...'
              },
              {
                type: 'Captions',
                time: 'Yesterday',
                title: 'Summer Streetwear Drop',
                desc: '5 high-conversion hooks featuring #OOTD and street style tags...'
              },
              {
                type: 'Business Strategy',
                time: '2d ago',
                title: 'Bakery Loyalty Weekend Promo',
                desc: 'Geo-targeted flash giveaway model generating 420 local leads...'
              },
              {
                type: 'Sound Trends',
                time: '3d ago',
                title: 'EDM Bass Drops for Fast Cuts',
                desc: 'Audio stems with beat detection markers for CapCut export...'
              }
            ].map((hist, idx) => (
              <div
                key={idx}
                onClick={() => setInputPrompt(hist.desc)}
                className="p-3 rounded-2xl bg-[#11172e] hover:bg-[#161f3d] border border-slate-800/80 cursor-pointer transition space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 font-semibold font-mono">
                    {hist.type}
                  </span>
                  <span className="text-slate-500">{hist.time}</span>
                </div>
                <h5 className="text-xs font-bold text-white">{hist.title}</h5>
                <p className="text-[11px] text-slate-400 line-clamp-1">{hist.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Autonomous Copilot Status Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#101730] to-[#0A0D1A] border border-cyan-500/30 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Autonomous Copilot Active</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Zorva syncs real-time viral sound stems directly with your draft studio.
          </p>
          <button className="w-full py-2 text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/60 rounded-xl transition">
            View 12 Saved Scripts
          </button>
        </div>
      </div>
    </div>
  );
};
