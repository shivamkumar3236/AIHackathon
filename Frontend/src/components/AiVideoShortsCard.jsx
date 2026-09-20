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
  Play, 
  Cpu, 
  Zap, 
  Radio, 
  CheckCircle2 
} from 'lucide-react';

export default function AiVideoShortsCard() {
  const defaultShorts = [
    {
      id: 'short-1',
      title: 'Microsoft AI & IoT Smart Campus',
      category: 'ai_campus',
      tag: 'Smart Campus AI',
      youtubeId: 'Ad_EHDcomR8',
      aiInsight: 'AI vision and IoT sensors dynamically orchestrating facility operations and energy loads.',
      accuracy: '98.8%',
      sourceName: 'Microsoft Tech Showcase',
      icon: Cpu
    },
    {
      id: 'short-2',
      title: 'Campus of Things: LoRa IoT Architecture',
      category: 'iot_network',
      tag: 'IoT Sensor Network',
      youtubeId: 'nEwUNFOC2OY',
      aiInsight: 'LoRa sensor nodes streaming real-time resource telemetry across all campus blocks.',
      accuracy: '99.2%',
      sourceName: 'Setúbal Smart Campus',
      icon: Radio
    },
    {
      id: 'short-3',
      title: 'IoT Smart Campus Energy Optimization',
      category: 'energy',
      tag: 'Energy Optimization',
      youtubeId: 'FunI14yZYNQ',
      aiInsight: 'Automated power management and HVAC optimization in unoccupied campus buildings.',
      accuracy: '97.9%',
      sourceName: 'SINEW IoT Tech',
      icon: Zap
    },
    {
      id: 'short-4',
      title: 'IoT-Integrated Campus Network & Substation',
      category: 'infrastructure',
      tag: 'Substation Telemetry',
      youtubeId: 'VA6uUkoT8bk',
      aiInsight: 'Telemetry monitoring electrical transformers, backup generators, and water pumps.',
      accuracy: '98.4%',
      sourceName: 'Smart Campus Labs',
      icon: ShieldCheck
    }
  ];

  const [mode, setMode] = useState('youtube'); // 'youtube' | 'cctv'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customUrl, setCustomUrl] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [shortsList, setShortsList] = useState(defaultShorts);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

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

      // Grid
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

      // Scanline
      scanline = (scanline + 1.5) % canvas.height;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanline);
      ctx.lineTo(canvas.width, scanline);
      ctx.stroke();

      // Equipment boxes
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

      // Live Timestamp
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(`CAM 01 [BLOCK A SUBSTATION]  ${new Date().toISOString().slice(0, 10)} ${currentTime}`, 10, 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mode, currentTime]);

  const currentShort = shortsList[currentIndex];

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
      tag: 'Custom Feed',
      youtubeId: ytId,
      customUrl: customUrl.trim(),
      aiInsight: 'User-provided campus video stream running real-time AI telemetry.',
      accuracy: '98.5%',
      sourceName: 'User Stream',
      icon: Film
    };

    setShortsList([newShort, ...shortsList]);
    setCurrentIndex(0);
    setCustomUrl('');
    setIsAddingCustom(false);
    setMode('youtube');
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all hover:border-slate-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shadow-xs">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Campus AI Shorts & IoT Video Reel</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-extrabold">
                <Sparkles className="w-2.5 h-2.5" /> Live Reel
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Real-world IoT & AI Smart Campus field video demonstrations
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center text-xs font-bold">
            <button
              onClick={() => setMode('youtube')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                mode === 'youtube'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Video Clips</span>
            </button>
            <button
              onClick={() => setMode('cctv')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                mode === 'cctv'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live CCTV</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center gap-1"
            title="Paste custom YouTube link"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add URL</span>
          </button>
        </div>
      </div>

      {/* Custom URL Form */}
      {isAddingCustom && (
        <form onSubmit={handleAddCustomShort} className="my-3 p-3 rounded-xl bg-slate-50 border border-purple-200 flex gap-2">
          <input
            type="url"
            placeholder="Paste YouTube or Shorts URL..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-purple-500 text-slate-800"
            required
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all"
          >
            Add
          </button>
        </form>
      )}

      {/* Main Content Layout: Left 60% Video, Right 40% Clips & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 items-stretch">
        
        {/* Left: Video Player / CCTV Container (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col">
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

                {/* HUD Live Badge */}
                <div className="absolute top-2.5 left-2.5 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md border border-slate-700 text-white text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>AI FEED</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-emerald-400">{currentShort.accuracy}</span>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={215}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>● REC 30FPS</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Selectable Clips & AI Telemetry Insights (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          
          {/* Selectable Clips List */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Select Video Clip
            </p>
            {shortsList.map((item, idx) => {
              const Icon = item.icon || Film;
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setMode('youtube');
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      isSelected ? 'bg-purple-200 text-purple-800' : 'bg-white text-slate-500 border border-slate-200'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        {item.tag} • {item.sourceName}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* AI Live Insight Note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Live Insight</span>
              </span>
              {mode === 'youtube' && (
                <a
                  href={`https://www.youtube.com/watch?v=${currentShort.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-purple-600 hover:text-purple-700 font-bold flex items-center gap-1"
                >
                  <span>Watch on YT</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {mode === 'youtube'
                ? currentShort.aiInsight
                : 'Computer vision camera stream validating energy meter LCD readings against IoT telemetry in real-time.'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
