import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Movie Detail Page Animations
 */
export const movieDetailAnimations = {
  // Backdrop fade in animation
  animateBackdrop: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      ...options,
    });
  },

  // Poster slide in animation
  animatePoster: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "back.out(1.7)",
      ...options,
    });
  },

  // Title stagger animation
  animateTitle: (element, options = {}) => {
    if (!element || !element.children) return null;
    
    return gsap.from(element.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      ...options,
    });
  },

  // Stats stagger animation
  animateStats: (element, options = {}) => {
    if (!element || !element.children) return null;
    
    return gsap.from(element.children, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.7,
      stagger: 0.05,
      ease: "back.out(1.7)",
      ...options,
    });
  },

  // Overview scroll-triggered animation
  animateOverview: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        ...options.scrollTrigger,
      },
      ...options,
    });
  },

  // Genres scale animation
  animateGenres: (element, options = {}) => {
    if (!element || !element.children) return null;
    
    return gsap.from(element.children, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 1.1,
      stagger: 0.05,
      ease: "back.out(1.7)",
      ...options,
    });
  },

  // Additional info scroll-triggered animation
  animateAdditionalInfo: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        ...options.scrollTrigger,
      },
      ...options,
    });
  },

  // Production companies animation
  animateProduction: (element, options = {}) => {
    if (!element || !element.children) return null;
    
    return gsap.from(element.children, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      delay: 1.4,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        ...options.scrollTrigger,
      },
      ...options,
    });
  },

  // Complete movie detail animation sequence
  animateMovieDetail: (refs, options = {}) => {
    const animations = [];
    
    if (refs.backdropRef?.current) {
      animations.push(movieDetailAnimations.animateBackdrop(refs.backdropRef.current, options.backdrop));
    }
    
    if (refs.posterRef?.current) {
      animations.push(movieDetailAnimations.animatePoster(refs.posterRef.current, options.poster));
    }
    
    if (refs.titleRef?.current) {
      animations.push(movieDetailAnimations.animateTitle(refs.titleRef.current, options.title));
    }
    
    if (refs.statsRef?.current) {
      animations.push(movieDetailAnimations.animateStats(refs.statsRef.current, options.stats));
    }
    
    if (refs.overviewRef?.current) {
      animations.push(movieDetailAnimations.animateOverview(refs.overviewRef.current, options.overview));
    }
    
    if (refs.genresRef?.current) {
      animations.push(movieDetailAnimations.animateGenres(refs.genresRef.current, options.genres));
    }
    
    if (refs.additionalInfoRef?.current) {
      animations.push(movieDetailAnimations.animateAdditionalInfo(refs.additionalInfoRef.current, options.additionalInfo));
    }
    
    if (refs.productionRef?.current) {
      animations.push(movieDetailAnimations.animateProduction(refs.productionRef.current, options.production));
    }
    
    return animations;
  },
};

/**
 * Common Card Animations
 */
export const cardAnimations = {
  // Fade in from bottom
  fadeInUp: (elements, options = {}) => {
    if (!elements) return null;
    
    return gsap.from(elements, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      ...options,
    });
  },

  // Scale in animation
  scaleIn: (elements, options = {}) => {
    if (!elements) return null;
    
    return gsap.from(elements, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "back.out(1.7)",
      ...options,
    });
  },

  // Slide in from left
  slideInLeft: (elements, options = {}) => {
    if (!elements) return null;
    
    return gsap.from(elements, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      ...options,
    });
  },

  // Slide in from right
  slideInRight: (elements, options = {}) => {
    if (!elements) return null;
    
    return gsap.from(elements, {
      x: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      ...options,
    });
  },

  // Hover animations
  hoverScale: (element, options = {}) => {
    if (!element) return null;
    
    const hoverIn = () => gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      ...options.hoverIn,
    });
    
    const hoverOut = () => gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      ...options.hoverOut,
    });
    
    return { hoverIn, hoverOut };
  },
};

/**
 * Page Transition Animations
 */
export const pageTransitions = {
  // Page fade in
  fadeIn: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      ...options,
    });
  },

  // Page slide in from bottom
  slideUp: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      ...options,
    });
  },

  // Stagger animation for multiple elements
  staggerIn: (elements, options = {}) => {
    if (!elements) return null;
    
    return gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      ...options,
    });
  },
};

/**
 * Loading Animations
 */
export const loadingAnimations = {
  // Spinner rotation
  spinner: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.to(element, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "none",
      ...options,
    });
  },

  // Pulse animation
  pulse: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.to(element, {
      scale: 1.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      ...options,
    });
  },

  // Loading dots
  loadingDots: (elements, options = {}) => {
    if (!elements) return null;
    
    return gsap.to(elements, {
      y: -10,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: "power2.inOut",
      ...options,
    });
  },
};

/**
 * Utility Functions
 */
export const animationUtils = {
  // Create GSAP context for cleanup
  createContext: (scope) => {
    return gsap.context(() => {}, scope);
  },

  // Kill all animations in an element
  killAnimations: (element) => {
    if (element) {
      gsap.killTweensOf(element);
    }
  },

  // Refresh ScrollTrigger (useful after content changes)
  refreshScrollTrigger: () => {
    ScrollTrigger.refresh();
  },

  // Set default GSAP settings
  setDefaults: (config) => {
    gsap.defaults(config);
  },

  // Timeline creation helper
  createTimeline: (options = {}) => {
    return gsap.timeline(options);
  },
};

/**
 * Scroll Trigger Helpers
 */
export const scrollAnimations = {
  // Fade in on scroll
  fadeInOnScroll: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...options.scrollTrigger,
      },
      ...options,
    });
  },

  // Parallax effect
  parallax: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.to(element, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        ...options.scrollTrigger,
      },
      ...options,
    });
  },

  // Scale on scroll
  scaleOnScroll: (element, options = {}) => {
    if (!element) return null;
    
    return gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
        ...options.scrollTrigger,
      },
      ...options,
    });
  },
};

// Export default object with all animations
export default {
  movieDetailAnimations,
  cardAnimations,
  pageTransitions,
  loadingAnimations,
  animationUtils,
  scrollAnimations,
};