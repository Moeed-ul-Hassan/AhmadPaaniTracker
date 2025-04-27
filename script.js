/*
 * Ahmad Paani Waala - Water Delivery Service
 * JavaScript functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Show loader
  const loader = document.getElementById('loader');
  const pageContent = document.getElementById('page-content');
  
  // Variables
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const orderBtn = document.getElementById('order-btn');
  const orderModal = document.getElementById('order-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const backToTop = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const orderForm = document.getElementById('order-form');
  const testimonialPrev = document.getElementById('testimonial-prev');
  const testimonialNext = document.getElementById('testimonial-next');
  const testimonialSlider = document.getElementById('testimonial-slider');
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Load the page after a brief delay
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    pageContent.style.opacity = '1';
    
    // Run initial animations
    runHeroAnimation();
  }, 1500);
  
  // Navbar scroll event
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  
  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  
  // Order button click
  if (orderBtn) {
    orderBtn.addEventListener('click', function() {
      openModal();
    });
  }
  
  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', function() {
      closeModal();
    });
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function() {
      closeModal();
    });
  }
  
  // Back to top button click
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = {};
      
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Show success toast
      showToast('Message Sent!', 'We will get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Order form submission
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(orderForm);
      const formDataObj = {};
      
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Show success toast
      showToast('Order Placed!', 'Your water will be delivered soon.', 'success');
      
      // Close modal and reset form
      closeModal();
      orderForm.reset();
      resetQuantities();
      updateOrderTotal();
    });
  }
  
  // Testimonial slider navigation
  if (testimonialPrev && testimonialNext && testimonialSlider) {
    testimonialPrev.addEventListener('click', function() {
      testimonialSlider.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    });
    
    testimonialNext.addEventListener('click', function() {
      testimonialSlider.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    });
  }
  
  // Quantity buttons in order modal
  const minusBtns = document.querySelectorAll('.minus-btn');
  const plusBtns = document.querySelectorAll('.plus-btn');
  
  minusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const product = this.dataset.product;
      const input = document.getElementById(`${product}-quantity`);
      const currentValue = parseInt(input.value);
      
      if (currentValue > 0) {
        input.value = currentValue - 1;
        updateOrderTotal();
      }
    });
  });
  
  plusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const product = this.dataset.product;
      const input = document.getElementById(`${product}-quantity`);
      const currentValue = parseInt(input.value);
      
      input.value = currentValue + 1;
      updateOrderTotal();
    });
  });
  
  // Set up scroll animations
  setupScrollAnimations();
});

// Function to open order modal
function openOrderModal(product = null) {
  const orderModal = document.getElementById('order-modal');
  const modalContainer = document.querySelector('.modal-container');
  const selectedProductName = document.getElementById('selected-product-name');
  
  if (product) {
    // Reset quantities
    resetQuantities();
    
    // Set the selected product
    const productInput = document.getElementById(`${product}-quantity`);
    productInput.value = 1;
    
    // Update product name
    switch (product) {
      case 'small':
        selectedProductName.textContent = 'Small Bottle (10 Rs)';
        break;
      case 'big':
        selectedProductName.textContent = 'Big Bottle (20 Rs)';
        break;
      case 'truck':
        selectedProductName.textContent = 'Full Truck (30 Rs)';
        break;
      default:
        selectedProductName.textContent = 'Select Your Order';
    }
    
    // Update the total
    updateOrderTotal();
  }
  
  // Show the modal
  orderModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  // Animate the modal
  gsap.to(modalContainer, {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: 'back.out(1.2)'
  });
}

// Function to close modal
function closeModal() {
  const orderModal = document.getElementById('order-modal');
  const modalContainer = document.querySelector('.modal-container');
  
  // Animate the modal
  gsap.to(modalContainer, {
    scale: 0.95,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      orderModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Function to reset quantities
function resetQuantities() {
  document.getElementById('small-quantity').value = 0;
  document.getElementById('big-quantity').value = 0;
  document.getElementById('truck-quantity').value = 0;
}

// Function to update order total
function updateOrderTotal() {
  const smallQuantity = parseInt(document.getElementById('small-quantity').value) || 0;
  const bigQuantity = parseInt(document.getElementById('big-quantity').value) || 0;
  const truckQuantity = parseInt(document.getElementById('truck-quantity').value) || 0;
  
  const smallPrice = 10;
  const bigPrice = 20;
  const truckPrice = 30;
  
  const total = (smallQuantity * smallPrice) + (bigQuantity * bigPrice) + (truckQuantity * truckPrice);
  
  document.getElementById('order-total-amount').textContent = total;
}

// Function to show toast notification
function showToast(title, message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  const toastClose = document.getElementById('toast-close');
  
  // Set toast content
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  // Set toast type
  if (type === 'success') {
    toast.classList.remove('error');
    toastIcon.className = 'lucide-check-circle';
  } else {
    toast.classList.add('error');
    toastIcon.className = 'lucide-alert-circle';
  }
  
  // Show the toast
  toast.classList.add('show');
  
  // Auto-hide after 4 seconds
  const toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
  
  // Close button
  toastClose.addEventListener('click', function() {
    toast.classList.remove('show');
    clearTimeout(toastTimeout);
  });
}

// Hero Animation
function runHeroAnimation() {
  const heroHeading = document.getElementById('hero-heading');
  const heroText = document.getElementById('hero-text');
  const heroButtons = document.getElementById('hero-buttons');
  const heroImage = document.getElementById('hero-image');
  
  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  timeline
    .from(heroHeading, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    })
    .from(heroText, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from(heroButtons.children, {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6
    }, '-=0.5')
    .from(heroImage, {
      x: 100,
      opacity: 0,
      duration: 0.8
    }, '-=0.8');
}

// Setup scroll animations
function setupScrollAnimations() {
  // Products section
  gsap.from('.section-heading', {
    scrollTrigger: {
      trigger: '.section-heading',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8
  });
  
  // Product cards
  gsap.from('.water-card', {
    scrollTrigger: {
      trigger: '.products-grid',
      start: 'top bottom-=50',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
  });
  
  // About section
  gsap.from('.about-image', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    x: -50,
    opacity: 0,
    duration: 0.8
  });
  
  gsap.from('.about-content', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    x: 50,
    opacity: 0,
    duration: 0.8
  });
  
  gsap.from('.feature-box', {
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top bottom-=50',
      toggleActions: 'play none none none'
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6
  });
  
  // Location section
  gsap.from('.info-card', {
    scrollTrigger: {
      trigger: '.location-grid',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
  });
  
  gsap.from('.location-image', {
    scrollTrigger: {
      trigger: '.location-grid',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    x: 50,
    opacity: 0,
    duration: 0.8
  });
  
  // Testimonial cards
  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonial-slider',
      start: 'top bottom-=50',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
  });
  
  // Contact section
  gsap.from('.contact-form-container', {
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    x: -50,
    opacity: 0,
    duration: 0.8
  });
  
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    x: 50,
    opacity: 0,
    duration: 0.8
  });
  
  // Footer
  gsap.from('.footer-grid', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom-=100',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8
  });
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});