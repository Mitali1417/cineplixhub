import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { WifiOffIcon } from 'lucide-react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(undefined);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial state
    setIsOnline(navigator.onLine);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useGSAP(() => {
    if (isOnline === false && overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isOnline]);

  if (isOnline !== false) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center gap-6 p-6"
    >
      <div className="flex flex-col justify-center items-center text-center">
        <WifiOffIcon className="self-center w-16 h-16 text-destructive mb-2" />
        <h2 className="text-2xl font-bold text-white mb-2">No Internet Connection</h2>
        <p className="text-gray-300 max-w-md">
          You are currently offline. Please check your network connection and try again.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-destructive hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
        Reload Page
      </button>
    </div>
  );
};

export default NetworkStatus;