import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

// Default easing
gsap.defaults({
  ease: "power3.out",
});

// Common animations for reuse
export const animations = {
  fadeIn: (element: HTMLElement, delay = 0, duration = 0.8) => {
    return gsap.from(element, {
      opacity: 0,
      duration,
      delay
    });
  },
  
  fadeInUp: (element: HTMLElement, delay = 0, duration = 0.8, y = 50) => {
    return gsap.from(element, {
      y,
      opacity: 0,
      duration,
      delay
    });
  },
  
  fadeInDown: (element: HTMLElement, delay = 0, duration = 0.8, y = -50) => {
    return gsap.from(element, {
      y,
      opacity: 0,
      duration,
      delay
    });
  },
  
  fadeInLeft: (element: HTMLElement, delay = 0, duration = 0.8, x = -50) => {
    return gsap.from(element, {
      x,
      opacity: 0,
      duration,
      delay
    });
  },
  
  fadeInRight: (element: HTMLElement, delay = 0, duration = 0.8, x = 50) => {
    return gsap.from(element, {
      x,
      opacity: 0,
      duration,
      delay
    });
  },
  
  // Scroll trigger animations
  scrollFadeIn: (element: HTMLElement, options = {}) => {
    const defaultOptions = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0,
      start: "top bottom-=100",
      toggleActions: "play none none none"
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: mergedOptions.start,
        toggleActions: mergedOptions.toggleActions
      },
      y: mergedOptions.y,
      opacity: mergedOptions.opacity,
      duration: mergedOptions.duration,
      delay: mergedOptions.delay
    });
  }
};

export default gsap;
