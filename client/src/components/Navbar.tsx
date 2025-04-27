import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useLocation } from "wouter";
import { gsap } from "gsap";
import { DropletIcon } from "lucide-react";

interface NavbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ setMobileMenuOpen }: NavbarProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Animate navbar on load
    gsap.from(".navbar", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 py-3 ${
      scrolled ? "bg-[#0F172A]/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#38BDF8] text-3xl">
            <DropletIcon className="h-7 w-7" />
          </span>
          <h1 className="text-lg sm:text-xl font-poppins font-bold text-white">
            Ahmad Paani Waala
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#products" 
            className="text-white hover:text-[#38BDF8] transition-colors font-medium"
          >
            Products
          </a>
          <a 
            href="#about" 
            className="text-white hover:text-[#38BDF8] transition-colors font-medium"
          >
            About
          </a>
          <a 
            href="#location" 
            className="text-white hover:text-[#38BDF8] transition-colors font-medium"
          >
            Location
          </a>
          <a 
            href="#contact" 
            className="text-white hover:text-[#38BDF8] transition-colors font-medium"
          >
            Contact
          </a>
        </div>
        
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-white text-2xl"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
