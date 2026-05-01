import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ARPremium } from './pages/ARPremium';
import { ARUniversal } from './pages/ARUniversal';

/**
 * ENTRY LOGIC:
 * Scanning the QR code lands the user here. 
 * We check capabilities and redirect to the best available experience.
 */
function EntryPoint() {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobile = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  const isAndroid = /android/i.test(userAgent);
  
  console.log("Device detection:", { isMobile, isAndroid });

  if (isMobile || isAndroid) {
    return <Navigate to="/ar-premium" replace />;
  }
  
  return <Navigate to="/ar-universal" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPoint />} />
        <Route path="/ar-premium" element={<ARPremium />} />
        <Route path="/ar-universal" element={<ARUniversal />} />
      </Routes>
    </Router>
  );
}
