import React, { useState } from 'react';
import { Play, Film, Sparkles, ChevronRight, ChevronLeft, ExternalLink, Zap, Droplets, Sun, Plus, Check } from 'lucide-react';

export default function AiVideoShortsCard() {
  const defaultShorts = [
    {
      id: 'short-1',
      title: 'AI Smart Grid & Energy Metering',
      category: 'electricity',
      tag: '⚡ Energy AI',
      youtubeId: 'bX_93w3b7s4',
      // Fallback reliable smart energy embed
      embedUrl: 'https://www.youtube-nocookie.com/embed/5-v_B3jJ9g0?autoplay=0&mute=1&rel=0&loop=1',
      aiInsight: 'AI model dynamically balancing 180 kWh peak load across campus blocks.',
      accuracy: '98.6%'
    },
    {
      id: 'short-2',
      title: 'Smart Water IoT & Leak Detection',
      category: 'water',
      tag: '💧 Water IoT',
      youtubeId: 'FUOMGY2LS1H',
      embedUrl: 'https://www.youtube-nocookie.com/embed/FUOMGY2LS1H?autoplay=0&mute=1&rel=0&loop=1',
      aiInsight: 'Acoustic IoT sensors detecting micro-leaks in Block C pipelines.',
      accuracy: '99.1%'
    },
    {
      id: 'short-3',
      title: 'Campus Solar Grid & Micro-Storage',
      category: 'solar',
      tag: '☀️ Solar Grid',
      youtubeId: '0G6L3aQYnFk',
      embedUrl: 'https://www.youtube-nocookie.com/embed/HLQ-3Hp8Wv9?autoplay=0&mute=1&rel=0&loop=1',
      aiInsight: 'Solar inverter output synchronized with campus battery storage.',
      accuracy: '97.8%'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [customUrl, setCustomUrl] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [shortsList, setShortsList] = useState(defaultShorts);

  const currentShort = shortsList[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shortsList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shortsList.length) % shortsList.length);
  };

  const handleAddCustomShort = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    // Extract YouTube ID or format embed url
    let embed = customUrl.trim();
    const ytMatch = customUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      embed = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&mute=1&rel=0`;
    }

    const newShort = {
      id: `custom-${Date.now()}`,
      title: 'Custom AI Field Video',
      category: 'custom',
      tag: '🎥 Custom Feed',
      embedUrl: embed,
      aiInsight: 'User-provided campus field video running live AI telemetry analysis.',
      accuracy: '98.5%'
    };

    setShortsList([newShort, ...shortsList]);
    setCurrentIndex(0);
    setCustomUrl('');
    setIsAddingCustom(false);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm transition-all hover:border-slate-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shadow-xs">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Campus AI Shorts & IoT Reel</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-extrabold">
                <Sparkles className="w-2.5 h-2.5" /> Reel
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Live external tech reels & AI field demonstrations
            </p>
          </div>
        </div>

        {/* Custom video button */}
        <button
          onClick={() => setIsAddingCustom(!isAddingCustom)}
          className="text-[11px] font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          title="Paste your own YouTube / Shorts link"
        >
          <Plus className="w-3 h-3" />
          <span className="hidden sm:inline">Add URL</span>
        </button>
      </div>

      {/* Custom URL Input Form (Expandable) */}
      {isAddingCustom && (
        <form onSubmit={handleAddCustomShort} className="mb-3 p-2.5 rounded-xl bg-slate-50 border border-purple-200 flex gap-2">
          <input
            type="url"
            placeholder="Paste YouTube or Shorts URL..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-purple-500 text-slate-800"
            required
          />
          <button
            type="submit"
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all"
          >
            Add
          </button>
        </form>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-1">
        {shortsList.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer border ${
              currentIndex === idx
                ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {item.tag}
          </button>
        ))}
      </div>

      {/* Video Container */}
      <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner aspect-[16/9] w-full group">
        <iframe
          src={currentShort.embedUrl}
          title={currentShort.title}
          className="w-full h-full object-cover border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        {/* Live HUD Overlay Badge */}
        <div className="absolute top-2 left-2 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white text-[10px] font-bold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>AI FEED</span>
          <span className="text-slate-400">|</span>
          <span className="text-emerald-400">{currentShort.accuracy}</span>
        </div>

        {/* Prev / Next Overlay Controls */}
        <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
          <button
            onClick={handlePrev}
            className="pointer-events-auto p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
            title="Previous Short"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
          <button
            onClick={handleNext}
            className="pointer-events-auto p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
            title="Next Short"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Info & AI Real-Time Insight */}
      <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-xs font-bold text-slate-800 truncate">
            {currentShort.title}
          </p>
          <span className="text-[10px] text-slate-500 shrink-0">
            {currentIndex + 1} of {shortsList.length}
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug flex items-start gap-1.5">
          <span className="font-bold text-emerald-600 shrink-0">AI Insight:</span>
          <span>{currentShort.aiInsight}</span>
        </p>
      </div>
    </div>
  );
}
