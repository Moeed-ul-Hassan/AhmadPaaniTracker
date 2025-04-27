import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { TruckIcon } from "lucide-react";

interface HeroSectionProps {
  onOrderClick: () => void;
}

export default function HeroSection({ onOrderClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Hero animations
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
      .from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      })
      .from(paragraphRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, "-=0.5")
      .from(buttonsRef.current?.children, {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6
      }, "-=0.5")
      .from(imageContainerRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8
      }, "-=0.8");
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1602471615287-d733c59b79c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Kashmir landscape with water" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 mt-16 md:mt-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-4 leading-tight"
            >
              Pure <span className="text-[#38BDF8]">Kashmir Water</span> Delivered to You
            </h1>
            <p 
              ref={paragraphRef}
              className="text-lg text-gray-300 mb-8 max-w-md mx-auto md:mx-0"
            >
              Ahmad Paani Waala provides premium water delivery services across Kashmir with quality and reliability.
            </p>
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button 
                onClick={onOrderClick}
                className="water-btn bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0F172A] px-8 py-6 rounded-lg font-medium text-lg transition-colors"
              >
                Order Now
              </Button>
              <Button 
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="water-btn bg-transparent border-2 border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 px-8 py-6 rounded-lg font-medium text-lg transition-colors"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div ref={imageContainerRef} className="hidden md:block relative">
            <div className="relative animate-float w-3/4 mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Premium bottled water" 
                className="rounded-xl shadow-lg" 
              />
              <div className="absolute -bottom-4 -right-4 bg-[#1E293B] p-3 rounded-lg">
                <div className="text-[#38BDF8] text-xl flex justify-center">
                  <TruckIcon className="h-5 w-5" />
                </div>
                <p className="text-white font-bold">Fast Delivery</p>
                <p className="text-sm text-gray-400">Across Kashmir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
