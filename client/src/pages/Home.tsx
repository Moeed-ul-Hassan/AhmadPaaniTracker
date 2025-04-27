import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import OrderModal from "@/components/OrderModal";
import HeroSection from "./sections/HeroSection";
import ProductsSection from "./sections/ProductsSection";
import AboutSection from "./sections/AboutSection";
import LocationSection from "./sections/LocationSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";
import { ArrowUpIcon } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<'small' | 'big' | 'truck' | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const pageContentRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Show page content with animation
    gsap.to(pageContentRef.current, { opacity: 1, duration: 0.8 });

    // Back to top button visibility
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
        gsap.to(backToTopRef.current, { 
          opacity: 1, 
          visibility: "visible", 
          duration: 0.3 
        });
      } else {
        setShowBackToTop(false);
        gsap.to(backToTopRef.current, { 
          opacity: 0, 
          visibility: "hidden", 
          duration: 0.3 
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProductOrder = (product: 'small' | 'big' | 'truck') => {
    setSelectedProduct(product);
    setOrderModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="water-pattern">
      <div ref={pageContentRef} className="page-content">
        <Navbar setMobileMenuOpen={setMobileMenuOpen} />
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <OrderModal 
          isOpen={orderModalOpen} 
          onClose={() => setOrderModalOpen(false)} 
          selectedProduct={selectedProduct}
        />
        
        <HeroSection onOrderClick={() => setOrderModalOpen(true)} />
        <ProductsSection onProductSelect={handleProductOrder} />
        <AboutSection />
        <LocationSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        
        <button 
          ref={backToTopRef}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-[#38BDF8] text-[#0F172A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-20 ${
            showBackToTop ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
