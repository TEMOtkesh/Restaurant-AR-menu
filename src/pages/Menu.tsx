import { motion } from 'motion/react';
import { ChevronRight, Camera, Info, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MENU_ITEMS = [
  {
    id: 'wagyu-steak',
    name: 'Wagyu A5 Striploin',
    description: 'Black garlic reduction, truffle potato mousseline, seasonal microgreens.',
    price: '$85',
    image: 'https://picsum.photos/seed/steak/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', // Placeholder GLB
  },
  {
    id: 'lobster-risotto',
    name: 'Maine Lobster Risotto',
    description: 'Saffron-infused carnaroli rice, butter-poached lobster, citrus foam.',
    price: '$62',
    image: 'https://picsum.photos/seed/lobster/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  },
  {
    id: 'chocolate-dome',
    name: 'Grand Cru Chocolate Dome',
    description: 'Valrhona chocolate, gold leaf, raspberry coulis center.',
    price: '$24',
    image: 'https://picsum.photos/seed/dessert/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  }
];

export function Menu() {
  const navigate = useNavigate();

  const handleAROpen = (itemId: string) => {
    // Traffic Cop Logic
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS || isAndroid) {
      // Modern devices go to Premium (Model-Viewer)
      navigate(`/ar-premium/${itemId}`);
    } else {
      // Fallback for others
      navigate(`/ar-universal/${itemId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26] selection:text-white">
      {/* Hero Section */}
      <header className="relative h-[60vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="https://picsum.photos/seed/restaurant-hero/1920/1080" 
          alt="Luxury Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-[#F27D26] font-mono text-sm tracking-[0.3em] uppercase mb-4">The Dining Experience</p>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter uppercase leading-[0.85]">
              L'éminence <br />
              <span className="text-[#F27D26]">Digitale</span>
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Intro Message */}
      <section className="px-8 py-20 md:px-20 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light text-gray-400 leading-relaxed"
        >
          Welcome to the future of gastronomy. Scan the physical markers or click below to view our seasonal offerings in <span className="text-white">high-fidelity Augmented Reality</span>. 
          No app required.
        </motion.p>
      </section>

      {/* Menu List */}
      <main className="px-8 md:px-20 pb-32">
        <div className="grid grid-cols-1 gap-12">
          {MENU_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12 items-center"
            >
              <div className="md:col-span-5 overflow-hidden rounded-sm aspect-[4/3] relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => handleAROpen(item.id)}
                  className="absolute bottom-4 right-4 bg-white text-black p-4 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2 hover:bg-[#F27D26] hover:text-white"
                >
                  <Camera size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">View in 3D</span>
                </button>
              </div>

              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight uppercase">{item.name}</h2>
                  <span className="text-xl font-mono text-[#F27D26]">{item.price}</span>
                </div>
                <p className="text-gray-500 text-lg mb-8 max-w-lg leading-relaxed">
                  {item.description}
                </p>
                <div className="flex gap-4">
                   <button 
                    onClick={() => handleAROpen(item.id)}
                    className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] group/btn"
                  >
                    <span>Visualize Dish</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <div className="h-4 w-[1px] bg-white/20 self-center" />
                  <button className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest hover:text-white transition-colors">
                    <Info size={14} />
                    <span>Ingredients</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="px-8 md:px-20 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <Star size={12} className="text-[#F27D26]" />
          <span>Curated by Chef de Cuisine</span>
        </div>
        <div className="text-[10px] text-gray-600 uppercase tracking-[0.4em]">
          Powered by Instant WebAR Technology
        </div>
      </footer>
    </div>
  );
}
