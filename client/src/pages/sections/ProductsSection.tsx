import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { productData } from "@/data/productData";

interface ProductsSectionProps {
  onProductSelect: (product: 'small' | 'big' | 'truck') => void;
}

export default function ProductsSection({ onProductSelect }: ProductsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Heading animation
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });
    
    // Products animation
    const productCards = productsRef.current?.children;
    if (productCards) {
      gsap.from(productCards, {
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
      });
    }
    
    // CTA animation
    gsap.from(ctaRef.current, {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.5
    });
  }, []);

  return (
    <section 
      id="products" 
      ref={sectionRef}
      className="py-20 bg-[#1E293B] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0F172A] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div 
          ref={headingRef}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Our <span className="text-[#38BDF8]">Products</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our range of premium water products sourced from the pristine mountains of Kashmir.
          </p>
        </div>
        
        <div 
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {productData.map((product) => (
            <div 
              key={product.id}
              className="water-card bg-[#1E293B] rounded-xl overflow-hidden shadow-lg" 
              data-product={product.id}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-poppins font-bold">{product.name}</h3>
                  <span className="bg-[#38BDF8]/20 text-[#38BDF8] px-3 py-1 rounded-full text-sm font-medium">{product.price} Rs</span>
                </div>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <Button 
                  onClick={() => onProductSelect(product.id as 'small' | 'big' | 'truck')}
                  className="water-btn w-full bg-[#0F172A] hover:bg-[#1E293B] border border-[#38BDF8]/50 text-white py-2 rounded-lg transition-colors"
                >
                  Add to Order <PlusIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          ref={ctaRef}
          className="text-center"
        >
          <Button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="water-btn inline-block bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0F172A] px-8 py-3 rounded-lg font-medium text-lg transition-colors"
          >
            Place Bulk Order 
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
