import { useState, useEffect } from 'react';
import {
  Settings,
  User,
  LayoutDashboard,
  Crop,
  Type,
  History,
  SunMoon,
  UploadCloud,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeModel, setActiveModel] = useState<'normal' | 'high'>('normal');
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [sections, setSections] = useState({
    segment: false,
    mask: true,
    effects: true,
    output: true
  });
  
  const [maskParams, setMaskParams] = useState({
    feather: 3,
    expand: 0,
    shrink: 0,
  });
  
  const [effectParams, setEffectParams] = useState({
    blockSize: 12,
  });

  const [hasFile, setHasFile] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleSection = (sec: keyof typeof sections) => {
    setSections(prev => ({...prev, [sec]: !prev[sec]}));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setHasFile(true);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-mono overflow-hidden h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b-2 border-slate-900 dark:border-primary flex items-center justify-between px-6 z-20 bg-background-light dark:bg-background-dark">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-display font-bold glitch-text italic tracking-tighter">GLITCH_EDIT.v1</span>
          <div className="hidden md:flex gap-4 text-xs ml-8">
            <span className="text-secondary font-bold text-glow">SYSTEM: ACTIVE</span>
            <span className="opacity-50 text-yellow-500 dark:text-yellow-400">BRIDGE: WAITING...</span>
            <span className="opacity-50">LATENCY: 12ms</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse glow-pink"></span>
            <span className="text-xs uppercase tracking-widest">Live_Feed</span>
          </div>
          <button className="p-2 hover:text-primary transition-colors"><Settings size={20} /></button>
          <button className="p-2 hover:text-secondary transition-colors"><User size={20} /></button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav */}
        <nav className="w-16 md:w-20 border-r-2 border-slate-900 dark:border-primary flex flex-col items-center py-8 gap-10 bg-background-light dark:bg-background-dark">
          <button className="group relative">
            <LayoutDashboard size={24} className="text-primary group-hover:scale-125 transition-transform" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-primary text-black text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">DASHBOARD</span>
          </button>
          <button className="group relative">
            <Crop size={24} className="opacity-50 group-hover:opacity-100 group-hover:text-secondary transition-all" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-secondary text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">CROP</span>
          </button>
          <button className="group relative">
            <Type size={24} className="opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-primary text-black text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">TEXT</span>
          </button>
          <button className="group relative">
            <History size={24} className="opacity-50 group-hover:opacity-100 group-hover:text-secondary transition-all" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-secondary text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">HISTORY</span>
          </button>
          <div className="mt-auto">
            <button 
              className="opacity-50 hover:opacity-100 transition-opacity" 
              onClick={() => setDarkMode(!darkMode)}
            >
              <SunMoon size={24} />
            </button>
          </div>
        </nav>

        {/* Main Canvas */}
        <main className="flex-1 relative grid-bg flex items-center justify-center p-8 md:p-16 overflow-auto">
          <div 
            className="relative w-full max-w-5xl aspect-video rounded-large border-4 border-slate-900 dark:border-white bg-background-light/80 dark:bg-black/80 flex flex-col items-center justify-center gap-6 group transition-all hover:border-secondary dark:hover:border-secondary"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-large">
              <img 
                alt="abstract tech background pattern" 
                className="w-full h-full object-cover grayscale brightness-150 dark:brightness-50" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuLkQ2YBCPP0T3SeA07B4Q4qa1XQ3Phh8SvVA4BlOeMexxNZzHIeGUcfgz33y_JSWdJsw3IvejkX-Qwfj-B9PkAohDRPNVyB8P7wgPk2DojVHP3F8zjF8UEewqxwr_2qKEiZRAbexQUCkRMT0t21shIiTkh7AK6dzMPovb0yRLpObThb30fexdwvP4pydD3ppu3BYZt1zVfVKsJDp9jmnqtESwycBYcOngEuHH75DKa0PG47cUTRlvjosYZOOEqSziib_eYRads7o"
              />
            </div>

            {hasFile ? (
               <div className="z-10 text-center flex flex-col items-center">
                 <p className="text-secondary font-bold text-xl uppercase tracking-widest text-glow dropzone-glitch">File Loaded</p>
               </div>
            ) : (
              <div className="z-10 text-center flex flex-col items-center">
                <UploadCloud className="w-16 h-16 md:w-20 md:h-20 text-secondary mb-4 drop-shadow-[4px_4px_0px_rgba(255,45,149,0.5)] dropzone-glitch" />
                <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-2 glitch-text dropzone-glitch">
                  Drag and drop
                </h2>
                <p className="text-sm md:text-base opacity-70 tracking-[0.2em] font-bold dropzone-glitch">
                  OR <button className="text-primary hover:underline underline-offset-4 decoration-2">BROWSE FILES</button>
                </p>
                <input type="file" className="hidden" />
              </div>
            )}

            {/* Corner accents */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-secondary"></div>
            <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-secondary"></div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l-2 border-slate-900 dark:border-primary bg-background-light dark:bg-background-dark flex flex-col shrink-0">
          
          {/* Tabs */}
          <div className="flex border-b-2 border-slate-900 dark:border-primary shrink-0">
            <button className="flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest bg-primary text-black transition-colors">image</button>
            <button className="flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest border-l-2 border-slate-900 dark:border-primary dark:text-white hover:bg-secondary hover:text-white transition-colors">video</button>
          </div>

          {/* Scrollable Panel */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            
            {/* 01 SEGMENT */}
            <div className={`border-b border-slate-900 dark:border-primary/30 ${sections.segment ? 'section-collapsed' : ''}`}>
              <div 
                className="flex justify-between items-center p-4 cursor-pointer select-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors" 
                onClick={() => toggleSection('segment')}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary text-glow-cyan">01_segment</h3>
                <ChevronDown size={16} className="opacity-50 chevron" />
              </div>
              <div className="section-body">
                <div className="section-inner px-4 pb-4">
                  <div className="flex bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/20 rounded p-1 mb-3">
                    <button 
                      className={`flex-1 py-2 text-[10px] font-bold rounded transition-colors ${activeModel === 'normal' ? 'bg-secondary text-white' : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'}`}
                      onClick={() => setActiveModel('normal')}
                    >
                      Normal
                    </button>
                    <button 
                      className={`flex-1 py-2 text-[10px] font-bold rounded transition-colors ${activeModel === 'high' ? 'bg-secondary text-white' : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'}`}
                      onClick={() => setActiveModel('high')}
                    >
                      High Quality
                    </button>
                  </div>
                  <button className="w-full py-3 bg-primary text-black font-display text-xs font-bold uppercase tracking-widest italic glitch-border-cyan hover:brightness-110 transition-all active:translate-x-[2px] active:translate-y-[2px] glow-cyan-strong">
                    Generate Skin Mask
                  </button>
                </div>
              </div>
            </div>

            {/* 02 MASK EDIT */}
            <div className={`border-b border-slate-900 dark:border-primary/30 ${sections.mask ? 'section-collapsed' : ''}`}>
              <div 
                className="flex justify-between items-center p-4 cursor-pointer select-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors" 
                onClick={() => toggleSection('mask')}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary text-glow">02_mask_edit</h3>
                <ChevronDown size={16} className="opacity-50 chevron" />
              </div>
              <div className="section-body">
                <div className="section-inner px-4 pb-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-white/70">FEATHER_EDGE</span>
                        <span className="text-primary font-bold">{maskParams.feather}</span>
                      </div>
                      <div className="h-1 bg-black/10 dark:bg-white/10 relative">
                        <div className="absolute top-0 left-0 h-full bg-primary pointer-events-none" style={{width: `${(maskParams.feather / 20) * 100}%`}}></div>
                        <input 
                          type="range" min="0" max="20" value={maskParams.feather} 
                          onChange={e => setMaskParams({...maskParams, feather: parseInt(e.target.value)})}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-white/70">EXPAND_MASK</span>
                        <span className="text-secondary font-bold">{maskParams.expand}</span>
                      </div>
                      <div className="h-1 bg-black/10 dark:bg-white/10 relative">
                        <div className="absolute top-0 left-0 h-full bg-secondary pointer-events-none" style={{width: `${(maskParams.expand / 10) * 100}%`}}></div>
                        <input 
                          type="range" min="0" max="10" value={maskParams.expand}
                          onChange={e => setMaskParams({...maskParams, expand: parseInt(e.target.value)})} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-white/70">SHRINK_MASK</span>
                        <span className="text-primary font-bold">{maskParams.shrink}</span>
                      </div>
                      <div className="h-1 bg-black/10 dark:bg-white/10 relative">
                        <div className="absolute top-0 left-0 h-full bg-primary pointer-events-none" style={{width: `${(maskParams.shrink / 10) * 100}%`}}></div>
                        <input 
                          type="range" min="0" max="10" value={maskParams.shrink}
                          onChange={e => setMaskParams({...maskParams, shrink: parseInt(e.target.value)})} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 EFFECTS */}
            <div className={`border-b border-slate-900 dark:border-primary/30 ${sections.effects ? 'section-collapsed' : ''}`}>
              <div 
                className="flex justify-between items-center p-4 cursor-pointer select-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors" 
                onClick={() => toggleSection('effects')}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary text-glow-cyan">03_effects</h3>
                <ChevronDown size={16} className="opacity-50 chevron" />
              </div>
              <div className="section-body">
                <div className="section-inner px-4 pb-4">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button 
                      className={`p-3 border text-[10px] font-bold transition-all ${
                        activeEffect === 'mosaic' 
                          ? 'bg-secondary text-white border-secondary' 
                          : 'border-black/20 dark:border-white/20 text-slate-600 dark:text-white/70 hover:bg-secondary hover:text-white hover:border-secondary'
                      }`}
                      onClick={() => setActiveEffect('mosaic')}
                    >PIXELATE</button>
                    <button 
                      className={`p-3 border text-[10px] font-bold transition-all ${
                        activeEffect === 'blur' 
                          ? 'bg-primary text-black border-primary' 
                          : 'border-black/20 dark:border-white/20 text-slate-600 dark:text-white/70 hover:bg-primary hover:text-black hover:border-primary'
                      }`}
                      onClick={() => setActiveEffect('blur')}
                    >BLUR</button>
                    <button 
                      className={`p-3 border text-[10px] font-bold transition-all ${
                        activeEffect === 'grayscale' 
                          ? 'bg-secondary text-white border-secondary' 
                          : 'border-black/20 dark:border-white/20 text-slate-600 dark:text-white/70 hover:bg-secondary hover:text-white hover:border-secondary'
                      }`}
                      onClick={() => setActiveEffect('grayscale')}
                    >B&amp;W</button>
                    <button 
                      className={`p-3 border text-[10px] font-bold transition-all ${
                        activeEffect === 'tint' 
                          ? 'bg-primary text-black border-primary' 
                          : 'border-black/20 dark:border-white/20 text-slate-600 dark:text-white/70 hover:bg-primary hover:text-black hover:border-primary'
                      }`}
                      onClick={() => setActiveEffect('tint')}
                    >TINT</button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-white/70">BLOCK_SIZE</span>
                        <span className="text-secondary font-bold">{effectParams.blockSize}</span>
                      </div>
                      <div className="h-1 bg-black/10 dark:bg-white/10 relative">
                        <div className="absolute top-0 left-0 h-full bg-secondary pointer-events-none" style={{width: `${(effectParams.blockSize / 50) * 100}%`}}></div>
                        <input 
                          type="range" min="3" max="50" value={effectParams.blockSize} 
                          onChange={e => setEffectParams({...effectParams, blockSize: parseInt(e.target.value)})}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        />
                      </div>
                    </div>
                    
                    {activeEffect === 'tint' && (
                      <div id="tint-color-row" className="animate-in fade-in zoom-in duration-200">
                        <span className="text-xs text-primary">TINT_COLOR</span>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <div className="w-6 h-6 rounded-full bg-[#FF2D95] border-2 border-slate-400 dark:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                          <div className="w-6 h-6 rounded-full bg-[#00FFFF] border-2 border-transparent hover:border-slate-400 dark:hover:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                          <div className="w-6 h-6 rounded-full bg-[#EF4444] border-2 border-transparent hover:border-slate-400 dark:hover:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                          <div className="w-6 h-6 rounded-full bg-[#EAB308] border-2 border-transparent hover:border-slate-400 dark:hover:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                          <div className="w-6 h-6 rounded-full bg-[#A855F7] border-2 border-transparent hover:border-slate-400 dark:hover:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                          <div className="w-6 h-6 rounded-full bg-[#EC4899] border-2 border-transparent hover:border-slate-400 dark:hover:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                          <div className="w-6 h-6 rounded-full bg-[#F97316] border-2 border-transparent hover:border-slate-400 dark:hover:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                          <div className="w-6 h-6 rounded-full bg-[#06B6D4] border-2 border-transparent hover:border-slate-400 dark:hover:border-white cursor-pointer hover:scale-110 transition-transform"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 04 OUTPUT */}
            <div className={`border-b border-slate-900 dark:border-primary/30 ${sections.output ? 'section-collapsed' : ''}`}>
              <div 
                className="flex justify-between items-center p-4 cursor-pointer select-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors" 
                onClick={() => toggleSection('output')}
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary text-glow">04_output</h3>
                <ChevronDown size={16} className="opacity-50 chevron" />
              </div>
              <div className="section-body">
                <div className="section-inner px-4 pb-4">
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="text-xs text-slate-600 dark:text-white/70 block mb-1">DESTINATION</span>
                      <div className="flex gap-2">
                        <input type="text" value="~/exports/" readOnly className="flex-1 bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 text-xs p-2 text-slate-900 dark:text-white/50 outline-none" />
                        <button className="px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 text-[10px] font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all">BROWSE</button>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-600 dark:text-white/70 block mb-1">FORMAT</span>
                      <select className="w-full bg-white dark:bg-black border-2 border-slate-900 dark:border-primary text-slate-900 dark:text-white text-xs p-2 focus:ring-0 focus:border-primary outline-none">
                        <option className="bg-white dark:bg-black text-slate-900 dark:text-white">.MP4 // H.264</option>
                        <option className="bg-white dark:bg-black text-slate-900 dark:text-white">.MOV // PRORES</option>
                        <option className="bg-white dark:bg-black text-slate-900 dark:text-white">.PNG // SEQUENCE</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Render Button */}
          <div className="p-4 border-t-2 border-slate-900 dark:border-primary bg-background-light dark:bg-background-dark shrink-0">
            <button className="w-full bg-secondary text-white font-display py-3 uppercase italic tracking-widest glitch-border-cyan active:translate-x-1 active:translate-y-1 transition-all hover:brightness-110 glow-pink-strong">
              Render_Final
            </button>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="h-8 border-t-2 border-slate-900 dark:border-primary bg-background-light dark:bg-background-dark flex items-center px-4 justify-between z-20">
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-bold tracking-widest text-primary uppercase">Ready</span>
          <span className="text-[9px] font-bold tracking-widest opacity-50 uppercase">Canvas: 1920 x 1080</span>
        </div>
        <div className="flex items-center gap-4 text-[9px]">
          <span className="opacity-50">CPU: 42%</span>
          <span className="opacity-50">RAM: 4.8GB</span>
          <div className="flex gap-1 items-end h-3">
            <div className="w-1 h-2 bg-secondary"></div>
            <div className="w-1 h-3 bg-secondary"></div>
            <div className="w-1 h-1 bg-secondary opacity-30"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
