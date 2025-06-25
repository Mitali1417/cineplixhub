// src/components/SmoothScroll.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';

const SmoothScroll = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  // Optimized RAF loop with throttling
  const raf = useCallback((time) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
    }
    rafRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Don't initialize smooth scroll if user prefers reduced motion
      return;
    }

    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.0, // Reduced from 1.2 for better performance
      easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler easing function
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8, // Reduced for less aggressive scrolling
      smoothTouch: false, // Disabled for better mobile performance
      touchMultiplier: 1.5, // Reduced from 2
      infinite: false,
      wrapper: document.body,
      content: document.documentElement,
      // Performance optimizations
      lerp: 0.1, // Lower lerp for smoother animation
      class: 'lenis',
      smoothWheel: true,
      normalizeWheel: true,
    });

    // Store reference globally for other components
    window.lenis = lenisRef.current;

    // Start RAF loop
    rafRef.current = requestAnimationFrame(raf);

    // Add scroll event listener for debugging (optional)
    const handleScroll = (e) => {
      // You can add custom scroll handling here if needed
      // console.log('Scroll event:', e);
    };

    lenisRef.current.on('scroll', handleScroll);

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleScroll);
        lenisRef.current.destroy();
      }
      
      if (window.lenis) {
        delete window.lenis;
      }
    };
  }, [raf]);

  // Handle route changes - scroll to top when navigating to different pages
  useEffect(() => {
    const scrollToTop = () => {
      if (lenisRef.current) {
        // Option 1: Smooth scroll to top (recommended)
        lenisRef.current.scrollTo(0, {
          duration: 0.8,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          immediate: false,
        });
        
        // Option 2: Instant scroll to top (uncomment if you prefer instant)
        // lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        // Fallback for when Lenis isn't available
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Instant fallback (uncomment if you prefer instant)
        // window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    // Execute immediately when route changes
    scrollToTop();
    
    // Also add a small delay as backup in case of timing issues
    const timeoutId = setTimeout(scrollToTop, 50);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Handle visibility changes to pause/resume RAF
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause RAF when tab is not visible
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      } else {
        // Resume RAF when tab becomes visible
        if (lenisRef.current && !rafRef.current) {
          rafRef.current = requestAnimationFrame(raf);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [raf]);

  return <>{children}</>;
};

export default SmoothScroll;