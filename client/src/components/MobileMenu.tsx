import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { XIcon } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Animate menu opening
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      // Animate menu closing
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 z-50 bg-[#0F172A] transform translate-x-full transition-transform duration-300 md:hidden"
    >
      <div className="h-full flex flex-col p-5 pt-16">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="flex flex-col gap-6 text-lg">
          <a 
            href="#products" 
            className="text-white hover:text-[#38BDF8] transition-colors py-2 font-medium"
            onClick={handleLinkClick}
          >
            Products
          </a>
          <a 
            href="#about" 
            className="text-white hover:text-[#38BDF8] transition-colors py-2 font-medium"
            onClick={handleLinkClick}
          >
            About
          </a>
          <a 
            href="#location" 
            className="text-white hover:text-[#38BDF8] transition-colors py-2 font-medium"
            onClick={handleLinkClick}
          >
            Location
          </a>
          <a 
            href="#contact" 
            className="text-white hover:text-[#38BDF8] transition-colors py-2 font-medium"
            onClick={handleLinkClick}
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
