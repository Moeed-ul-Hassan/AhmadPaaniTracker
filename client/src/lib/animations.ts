import { gsap } from "gsap";

// Common animation timelines

// Page transition animation
export const pageTransition = (pageContent: HTMLElement, delay = 0.3) => {
  gsap.to(pageContent, { 
    opacity: 1, 
    duration: 0.8, 
    delay 
  });
};

// Hero section animation
export const heroAnimation = (
  heading: HTMLElement, 
  paragraph: HTMLElement, 
  buttons: HTMLElement, 
  image: HTMLElement
) => {
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  timeline
    .from(heading, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    })
    .from(paragraph, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, "-=0.5")
    .from(buttons.children, {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6
    }, "-=0.5")
    .from(image, {
      x: 100,
      opacity: 0,
      duration: 0.8
    }, "-=0.8");
    
  return timeline;
};

// Section heading animation
export const headingAnimation = (heading: HTMLElement) => {
  return gsap.from(heading, {
    y: 50,
    opacity: 0,
    duration: 0.8
  });
};

// Products grid animation
export const productsAnimation = (products: HTMLElement[]) => {
  return gsap.from(products, {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
  });
};

// Navbar animation
export const navbarAnimation = (navbar: HTMLElement) => {
  return gsap.from(navbar, {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.3
  });
};

// Modal animations
export const showModal = (modal: HTMLElement, content: HTMLElement) => {
  gsap.to(modal, { 
    opacity: 1, 
    duration: 0.3,
    ease: "power2.out",
    onStart: () => {
      modal.style.pointerEvents = 'auto';
    }
  });
  
  gsap.to(content, { 
    scale: 1, 
    opacity: 1, 
    duration: 0.4,
    delay: 0.1,
    ease: "back.out(1.2)"
  });
};

export const hideModal = (modal: HTMLElement, content: HTMLElement) => {
  gsap.to(content, { 
    scale: 0.95, 
    opacity: 0, 
    duration: 0.3,
    ease: "power2.in"
  });
  
  gsap.to(modal, { 
    opacity: 0, 
    duration: 0.3,
    delay: 0.1,
    ease: "power2.in",
    onComplete: () => {
      modal.style.pointerEvents = 'none';
    }
  });
};
