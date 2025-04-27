import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom hook for common animations
export const useAnimations = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Back to top button animation
    const showBackToTop = () => {
      const backToTop = document.getElementById("back-to-top");
      if (!backToTop) return;
      
      if (window.scrollY > 300) {
        gsap.to(backToTop, { 
          opacity: 1, 
          visibility: "visible", 
          duration: 0.3 
        });
      } else {
        gsap.to(backToTop, { 
          opacity: 0, 
          visibility: "hidden", 
          duration: 0.3 
        });
      }
    };
    
    window.addEventListener("scroll", showBackToTop);
    
    // Water button hover animations
    const waterBtns = document.querySelectorAll(".water-btn");
    
    waterBtns.forEach(btn => {
      btn.addEventListener("mouseenter", function() {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.3,
          ease: "power1.out"
        });
      });
      
      btn.addEventListener("mouseleave", function() {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power1.in"
        });
      });
    });
    
    return () => {
      window.removeEventListener("scroll", showBackToTop);
    };
  }, []);
  
  // Function to animate elements on scroll
  const animateOnScroll = (element: HTMLElement, options = {}) => {
    const defaultOptions = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0,
      start: "top bottom-=100",
      toggleActions: "play none none none"
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    gsap.from(element, {
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
  };
  
  return { animateOnScroll };
};
