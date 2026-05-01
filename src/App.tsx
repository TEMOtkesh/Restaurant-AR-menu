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
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  const isAndroid = /android/i.test(userAgent);
  
  // We prioritize Premium SLAM if on mobile
  if (isIOS || isAndroid) {
    return <Navigate to="/ar-premium" replace />;
  }
  
  // Desktop or legacy devices go to Universal
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
