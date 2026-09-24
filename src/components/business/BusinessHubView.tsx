import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Eye,
  MousePointerClick,
  Sparkles,
  PlusCircle,
  ExternalLink,
  CheckCircle,
  Play,
  ShieldCheck,
  Percent,
  Sliders,
  ArrowUpRight
} from 'lucide-react';
import { User, BusinessCampaign } from '../../types';
import { MOCK_CAMPAIGNS } from '../../data/mockData';

interface BusinessHubViewProps {
  currentUser: User;
  onNavigateToUpload: () => void;
  onOpenAI: () => void;
}

export const BusinessHubView: React.FC<BusinessHubViewProps> = ({
  currentUser,
  onNavigateToUpload,
  onOpenAI
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'marketplace'>('dashboard');
  const [campaigns, setCampaigns] = useState<BusinessCampaign[]>(MOCK_CAMPAIGNS);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  // New Campaign Form State
  const [newTitle, setNewTitle] = useState('');
  const [newBudget, setNewBudget] = useState(1500);
  const [newCta, setNewCta] = useState<'Shop Now' | 'Learn More' | 'Install App' | 'Book Demo' | 'Get Started'>('Shop Now');
  const [newUrl, setNewUrl] = useState('');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const created: BusinessCampaign = {
      id: `camp_${Date.now()}`,
      brandName: currentUser.businessDetails?.companyName || 'Creative Studio Global',
      title: newTitle,
      description: 'Zorva Algorithmic Growth Campaign optimized for high-conversion vertical video feeds.',
      budgetTotal: newBudget,
      budgetSpent: 0,
      impressions: 12000,
      clicks: 840,
      conversions: 45,
      status: 'active',
      ctaText: newCta,
      ctaUrl: newUrl || 'https://zorva.io',
      thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      targetCategory: 'Technology',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-11-01',
      roi: '+185%'
    };

    setCampaigns([created, ...campaigns]);
    setShowCreateCampaign(false);
    setNewTitle('');
  };

  const totalSpent = campaigns.reduce((acc, c) => acc + c.budgetSpent, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 select-none">
      {/* Header & Brand Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5 uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            ENTERPRISE COMMERCE // COMMERCIAL ENGINE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Zorva Business Hub & Growth Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Launch frictionless vertical video ads, pin buyable products, and track real-time pixel attribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateCampaign(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-600/30 transition transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch New Campaign</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'dashboard'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Performance Dashboard
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'campaigns'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Active Campaigns ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'marketplace'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Featured Promo Cards
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Video Impressions</span>
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {(totalImpressions / 1000000).toFixed(2)}M
              </p>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
                ↗ +24.8% vs last month
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Clicks & CTA Taps</span>
                <MousePointerClick className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {(totalClicks / 1000).toFixed(1)}K
              </p>
              <span className="text-[11px] text-cyan-400 font-semibold mt-1 inline-block">
                Avg. CTR: 4.6%
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Ad Spend</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                ${totalSpent.toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 inline-block">
                Budget allocated: $15,500
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Average ROI</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                +314%
              </p>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
                Verified high velocity
              </span>
            </div>
          </div>

          {/* AI Growth Copilot Recommendation */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0E152F] to-cyan-950/30 border border-purple-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Zorva AI Autonomous Ad Advisor</h3>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                "Videos pairing the 144 BPM synth stem with tactile product unboxing hooks generate
                48% higher checkout completions. Schedule your next push for Friday 19:45 EST."
              </p>
            </div>

            <button
              onClick={onOpenAI}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 shadow-md transition shrink-0"
            >
              Generate Ad Script Hook →
            </button>
          </div>

          {/* Campaigns Overview Table */}
          <div className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Live Campaign Attribution Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 text-slate-400 font-semibold">
                  <tr>
                    <th className="pb-3">Campaign</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Budget Spent</th>
                    <th className="pb-3">Impressions</th>
                    <th className="pb-3">Clicks</th>
                    <th className="pb-3">ROI</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 flex items-center gap-3">
                        <img
                          src={camp.thumbnailUrl}
                          alt="Camp"
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-bold text-white">{camp.title}</p>
                          <p className="text-[10px] text-slate-500">{camp.brandName}</p>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            camp.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {camp.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono">
                        ${camp.budgetSpent} / ${camp.budgetTotal}
                      </td>
                      <td className="py-3.5 font-mono">
                        {(camp.impressions / 1000).toFixed(0)}K
                      </td>
                      <td className="py-3.5 font-mono">{camp.clicks.toLocaleString()}</td>
                      <td className="py-3.5 text-emerald-400 font-bold font-mono">{camp.roi}</td>
                      <td className="py-3.5 text-right">
                        <a
                          href={camp.ctaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          <span>{camp.ctaText}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-3xl bg-[#0D1224] border border-slate-800 hover:border-cyan-500/40 shadow-xl space-y-4 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={camp.thumbnailUrl}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-cyan-400">
                    {camp.status.toUpperCase()}
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                    ROI {camp.roi}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{camp.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#11172e] border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">Budget</span>
                    <p className="font-bold text-white font-mono mt-0.5">${camp.budgetTotal}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Impressions</span>
                    <p className="font-bold text-cyan-400 font-mono mt-0.5">
                      {(camp.impressions / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Conversions</span>
                    <p className="font-bold text-emerald-400 font-mono mt-0.5">
                      {camp.conversions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500">CTA: {camp.ctaText}</span>
                <button className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition">
                  Manage Ads
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Acoustic AI Binaural Headphones',
              brand: 'CyberAudio Labs',
              price: '$249',
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
              cta: 'Shop Now'
            },
            {
              title: 'Matte Ceramic 65% Mechanical Board',
              brand: 'Nexus Tech Lab',
              price: '$189',
              image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
              cta: 'Order Now'
            },
            {
              title: 'Reflective Cyberpunk Trench Coat',
              brand: 'Sofia Vogue',
              price: '$320',
              image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
              cta: 'Pre-Order'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-[#0D1224] border border-slate-800 hover:border-cyan-400 shadow-xl space-y-3 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="aspect-square rounded-2xl overflow-hidden border border-slate-800 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 text-xs font-black px-2.5 py-1 rounded-full bg-cyan-400 text-black">
                    {item.price}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-cyan-400 font-semibold">{item.brand}</p>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition shadow-md">
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0E1324] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                Launch Self-Serve Video Campaign
              </h3>
              <button
                onClick={() => setShowCreateCampaign(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Summer Spatial Audio Drop"
                  className="w-full bg-[#141B32] text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-semibold text-slate-300">Total Campaign Budget ($)</label>
                  <span className="font-mono text-cyan-400 font-bold">${newBudget}</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={10000}
                  step={100}
                  value={newBudget}
                  onChange={(e) => setNewBudget(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>$200</span>
                  <span>Est. Reach: {(newBudget * 280).toLocaleString()} users</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Call To Action (CTA)</label>
                  <select
                    value={newCta}
                    onChange={(e) => setNewCta(e.target.value as any)}
                    className="w-full bg-[#141B32] text-white p-3 rounded-xl border border-slate-700"
                  >
                    <option value="Shop Now">Shop Now</option>
                    <option value="Learn More">Learn More</option>
                    <option value="Install App">Install App</option>
                    <option value="Book Demo">Book Demo</option>
                    <option value="Get Started">Get Started</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Destination URL</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://yourstore.com"
                    className="w-full bg-[#141B32] text-white p-3 rounded-xl border border-slate-700"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-300 text-[11px] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Zorva Pixel automatically attributes purchases with 0% transaction fee.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateCampaign(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl shadow-lg transition"
                >
                  Confirm & Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
