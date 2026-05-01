import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DISHES } from '../constants';

export function ARPremium() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const modelRef = useRef<any>(null);
  const ModelViewer = 'model-viewer' as any;

  const currentDish = DISHES[index];

  const nextDish = () => setIndex((prev) => (prev + 1) % DISHES.length);
  const prevDish = () => setIndex((prev) => (prev - 1 + DISHES.length) % DISHES.length);

  useEffect(() => {
    const checkAR = async () => {
      await new Promise(r => setTimeout(r, 600));
      if (modelRef.current) {
        if (modelRef.current.canActivateAR === false) {
           navigate('/ar-universal', { replace: true });
        }
      }
    };
    checkAR();
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col font-sans overflow-hidden select-none">
      {/* HUD: Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
        <button 
          onClick={() => navigate('/')} 
          className="bg-white/10 backdrop-blur-xl p-3 rounded-full text-white"
        >
          <ChevronLeft size={24} />
        </button>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentDish.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center"
          >
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">
              {currentDish.name}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
               <div className="h-[1px] w-4 bg-[#F27D26]" />
               <p className="text-[10px] text-[#F27D26] font-mono tracking-widest">{currentDish.price}</p>
               <div className="h-[1px] w-4 bg-[#F27D26]" />
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="bg-white/10 backdrop-blur-xl p-3 rounded-full text-white">
          <Info size={20} />
        </button>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative touch-none">
        <ModelViewer
          ref={modelRef}
          src={currentDish.modelUrl}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          interaction-prompt="none"
          loading="eager"
          style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
        >
          <div slot="progress-bar" className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-white/10 border-t-[#F27D26] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Loading Digital Plate</p>
            </div>
          </div>
        </ModelViewer>

        {/* Interaction Layer */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4">
           <button 
            onClick={prevDish}
            className="pointer-events-auto bg-white/5 backdrop-blur-sm p-4 rounded-full text-white/30 hover:text-white transition-all active:scale-90"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
             onClick={nextDish}
             className="pointer-events-auto bg-white/5 backdrop-blur-sm p-4 rounded-full text-white/30 hover:text-white transition-all active:scale-90"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="h-40 bg-black flex flex-col items-center justify-center px-8 gap-6 border-t border-white/5">
        <button 
          onClick={() => modelRef.current?.activateAR()}
          className="w-full max-w-xs bg-white text-black py-4 rounded-full font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-transform"
        >
          PROJECT IN SPACE
        </button>
        
        <div className="flex gap-3">
          {DISHES.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-[#F27D26]' : 'w-2 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
