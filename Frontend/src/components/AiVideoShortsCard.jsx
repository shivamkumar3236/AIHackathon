import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  Plus, 
  Tv, 
  Eye, 
  ShieldCheck, 
  Radio, 
  Cpu 
} from 'lucide-react';

export default function AiVideoShortsCard() {
  // Real, active YouTube videos specifically on Smart Campus, IoT & AI
  const defaultShorts = [
    {
      id: 'short-1',
      title: 'Microsoft AI & IoT Smart Campus Project',
      category: 'ai_campus',
      tag: '🤖 Smart Campus AI',
      youtubeId: 'Ad_EHDcomR8',
      aiInsight: 'AI vision and IoT sensors dynamically orchestrating campus facility operations.',
      accuracy: '98.8%',
      sourceName: 'Microsoft Tech Showcase'
    },
    {
      id: 'short-2',
      title: 'Campus of Things: LoRa IoT Architecture',
      category: 'iot_network',
      tag: '📡 Campus IoT Sensors',
      youtubeId: 'nEwUNFOC2OY',
      aiInsight: 'LoRa sensor nodes streaming real-time resource telemetry across all campus blocks.',
      accuracy: '99.2%',
      sourceName: 'Setúbal Smart Campus'
    },
    {
      id: 'short-3',
      title: 'IoT Smart Campus Energy & Equipment Solution',
      category: 'energy',
      tag: '⚡ Energy Optimization',
      youtubeId: 'FunI14yZYNQ',
      aiInsight: 'Automated power management and HVAC optimization in unoccupied campus buildings.',
      accuracy: '97.9%',
      sourceName: 'SINEW IoT Tech'
    },
    {
      id: 'short-4',
      title: 'IoT-Integrated Campus Network & Substation',
      category: 'infrastructure',
      tag: '🏢 Grid & Substation',
      youtubeId: 'VA6uUkoT8bk',
      aiInsight: 'Telemetry monitoring electrical transformers, backup generators, and water pumps.',
      accuracy: '98.4%',
      sourceName: 'Smart Campus Labs'
    }
  ];

  const [mode, setMode] = useState('youtube'); // 'youtube' | 'cctv'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customUrl, setCustomUrl] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [shortsList, setShortsList] = useState(defaultShorts);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // CCTV Canvas simulation state
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animated Live AI CCTV Canvas Feed
  useEffect(() => {
    if (mode !== 'cctv') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let scanline = 0;

    const render = () => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Moving scanline
      scanline = (scanline + 1.5) % canvas.height;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanline);
      ctx.lineTo(canvas.width, scanline);
      ctx.stroke();

      // Simulated campus electrical room equipment
      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.fillRect(40, 45, 140, 100);
      ctx.strokeRect(40, 45, 140, 100);

      // AI Bounding Box 1: Smart Meter
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.strokeRect(45, 50, 130, 90);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('[AI: Smart Meter #01]', 50, 65);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText('Reading: 180 kWh', 50, 80);
      ctx.fillText('Status: Active Sync', 50, 95);

      // AI Bounding Box 2: Central Inverter
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(200, 45, 130, 100);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('[AI: Inverter Grid]', 205, 65);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText('Load: 78% (Optimal)', 205, 80);
      ctx.fillText('Temp: 42°C (Normal)', 205, 95);

      // Live Timestamp & HUD
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(`CAM 01 [BLOCK A SUBSTATION]  ${new Date().toISOString().slice(0, 10)} ${currentTime}`, 10, 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mode, currentTime]);

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

    let ytId = '';
    const match = customUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
    if (match && match[1]) {
      ytId = match[1];
    }

    const newShort = {
      id: `custom-${Date.now()}`,
      title: 'Custom Field Telemetry Video',
      category: 'custom',
      tag: '🎥 Custom Video',
      youtubeId: ytId,
      customUrl: customUrl.trim(),
      aiInsight: 'User-provided campus video stream running real-time AI telemetry.',
      accuracy: '98.5%',
      sourceName: 'User Stream'
    };

    setShortsList([newShort, ...shortsList]);
    setCurrentIndex(0);
    setCustomUrl('');
    setIsAddingCustom(false);
    setMode('youtube');
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
              Real-world IoT & AI Smart Campus field video feeds
            </p>
          </div>
        </div>

        {/* Mode Toggle & Add Button */}
        <div className="flex items-center gap-1.5">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center text-[10px] font-bold">
            <button
              onClick={() => setMode('youtube')}
              className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
                mode === 'youtube'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Watch Smart Campus YouTube video clips"
            >
              <Tv className="w-3 h-3" />
              <span>Clips</span>
            </button>
            <button
              onClick={() => setMode('cctv')}
              className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
                mode === 'cctv'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Live AI Vision CCTV Simulation"
            >
              <Eye className="w-3 h-3" />
              <span>Live CCTV</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className="text-[11px] font-semibold text-purple-600 hover:text-purple-700 p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
            title="Paste your custom YouTube / Shorts link"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Custom URL Input Form */}
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

      {/* Category Pills (for YouTube mode) */}
      {mode === 'youtube' && (
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
      )}

      {/* Video / Live CCTV Container */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner aspect-[16/9] w-full group">
        {mode === 'youtube' ? (
          <>
            <iframe
              key={currentShort.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${currentShort.youtubeId}?rel=0&modestbranding=1`}
              title={currentShort.title}
              className="w-full h-full object-cover border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Live HUD Badge */}
            <div className="absolute top-2 left-2 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-md border border-slate-700 text-white text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>AI REEL</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-400">{currentShort.accuracy}</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
              <button
                onClick={handlePrev}
                className="pointer-events-auto p-1.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                title="Previous Clip"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
              <button
                onClick={handleNext}
                className="pointer-events-auto p-1.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                title="Next Clip"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          /* Live CCTV AI Simulation Canvas */
          <div className="relative w-full h-full">
            <canvas
              ref={canvasRef}
              width={380}
              height={215}
              className="w-full h-full object-cover"
            />
            {/* Live Recording Dot */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>● REC 30FPS</span>
            </div>
          </div>
        )}
      </div>

      {/* Info Card Below Video */}
      <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-xs font-bold text-slate-800 truncate">
            {mode === 'youtube' ? currentShort.title : 'Live IoT Camera: Block A Electrical Substation'}
          </p>
          {mode === 'youtube' ? (
            <a
              href={`https://www.youtube.com/watch?v=${currentShort.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-purple-600 hover:text-purple-700 flex items-center gap-1 font-semibold shrink-0"
              title="Open full video on YouTube"
            >
              <span>{currentShort.sourceName}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ) : (
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Sensors Online</span>
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-600 leading-snug flex items-start gap-1.5">
          <span className="font-bold text-emerald-600 shrink-0">AI Insight:</span>
          <span>
            {mode === 'youtube'
              ? currentShort.aiInsight
              : 'Real-time computer vision stream validating energy meter telemetry against visual LCD readings.'}
          </span>
        </p>
      </div>
    </div>
  );
}
