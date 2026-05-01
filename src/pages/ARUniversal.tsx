import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { DISHES } from '../constants';

export function ARUniversal() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const sceneRef = useRef<any>(null);

  const currentDish = DISHES[index];

  // Custom tags to bypass JSX
  const AScene = 'a-scene' as any;
  const AAssets = 'a-assets' as any;
  const AAssetItem = 'a-asset-item' as any;
  const ACamera = 'a-camera' as any;
  const AEntity = 'a-entity' as any;
  const AGltfModel = 'a-gltf-model' as any;

  const nextDish = () => setIndex((prev) => (prev + 1) % DISHES.length);
  const prevDish = () => setIndex((prev) => (prev - 1 + DISHES.length) % DISHES.length);

  useEffect(() => {
    return () => {
      const scene = document.querySelector('a-scene') as any;
      if (scene) {
        scene.parentElement?.removeChild(scene);
        const video = document.querySelector('video');
        if (video) video.parentElement?.removeChild(video);
      }
    };
  }, []);

  const mindFileUrl = 'targets/menu-marker.mind';

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden select-none">
      {/* HUD Layers */}
      <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-start pointer-events-auto">
          <button 
            onClick={() => navigate('/')}
            className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-full text-white"
          >
            <X size={24} />
          </button>
          
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl text-white max-w-[200px]">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F27D26] mb-1">{currentDish.name}</h3>
             <p className="text-[9px] text-gray-400 leading-tight">Focus camera on menu marker to overlay model.</p>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center px-4 pointer-events-auto">
           <button 
            onClick={prevDish}
            className="bg-black/40 backdrop-blur-md p-4 rounded-full text-white/50"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
             onClick={nextDish}
             className="bg-black/40 backdrop-blur-md p-4 rounded-full text-white/50"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 pointer-events-auto">
           <div className="w-48 h-32 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <Camera size={24} className="text-[#F27D26] animate-pulse" />
           </div>
           <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">Universal Fallback Mode</p>
        </div>
      </div>

      <style>{`
        .a-canvas { z-index: 0; }
        .mindar-ui-overlay { display: none !important; }
        .mindar-ui-scanning { display: none !important; }
      `}</style>
      
      <div className="w-full h-full" id="scene-container">
        <AScene 
          ref={sceneRef}
          mindar-image={`imageTargetSrc: ${mindFileUrl}; showStats: false; uiScanning: no; uiLoading: no;`} 
          color-space="sRGB" 
          renderer="colorManagement: true, physicallyCorrectLights" 
          vr-mode-ui="enabled: false" 
          device-orientation-permission-ui="enabled: false"
        >
          <AAssets>
            <AAssetItem id="foodModel" src={currentDish.modelUrl}></AAssetItem>
          </AAssets>

          <ACamera position="0 0 0" look-controls="enabled: false"></ACamera>

          <AEntity mindar-image-target="targetIndex: 0">
            <AGltfModel 
              src="#foodModel" 
              position="0 0 0" 
              rotation="0 0 0" 
              scale="0.1 0.1 0.1"
              animation="property: rotation; to: 0 360 0; dur: 20000; easing: linear; loop: true"
            ></AGltfModel>
          </AEntity>
        </AScene>
      </div>
    </div>
  );
}
