// components/Preloader.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import LoadingScreen from './LoadingScreen';

const Preloader = ({ children }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let completed = 0;
    const total = 6; // Adjust based on how many things you're loading

    const handleProgress = () => {
      completed++;
      const newProgress = Math.round((completed / total) * 100);
      setLoadingProgress(newProgress);
      if (completed === total) {
        setTimeout(() => setIsReady(true), 500); // Small delay for smooth transition
      }
    };

    // Simulate loading (replace with actual asset loading)
    const interval = setInterval(() => {
      handleProgress();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isReady) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return children;
};

// ✅ Add PropTypes validation
Preloader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Preloader;
