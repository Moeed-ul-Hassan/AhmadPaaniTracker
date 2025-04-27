import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MedalIcon, 
  MountainIcon, 
  BadgeCheckIcon, 
  TruckIcon, 
  HeartIcon 
} from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Image animation
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      x: -50,
      opacity: 0,
      duration: 0.8
    });
    
    // Content animation
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      x: 50,
      opacity: 0,
      duration: 0.8
    });
    
    // Features animation
    const features = featuresRef.current?.children;
    if (features) {
      gsap.from(features, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
      });
    }
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-[#0F172A] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <img 
              src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Pure Kashmir water source" 
              className="rounded-xl shadow-lg z-10 relative" 
            />
            <div className="absolute -bottom-4 -right-4 bg-[#1E293B] p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#38BDF8] text-2xl">
                  <MedalIcon className="h-6 w-6" />
                </span>
                <h4 className="font-poppins font-bold">Premium Quality</h4>
              </div>
              <p className="text-sm text-gray-400">Our water comes from the highest peaks of Kashmir, ensuring purity and freshness.</p>
            </div>
          </div>
          
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">About <span className="text-[#38BDF8]">Ahmad Paani Waala</span></h2>
            <p className="text-gray-300 mb-6">
              Ahmad has been providing the freshest water to the people of Kashmir for over 15 years. What started as a small family business has grown into a trusted water delivery service that maintains the highest standards of quality.
            </p>
            <p className="text-gray-300 mb-8">
              Our water comes directly from the pristine mountain springs of Kashmir, known for their mineral-rich composition and refreshing taste. Every bottle is carefully processed and sealed to maintain its natural properties.
            </p>
            
            <div 
              ref={featuresRef}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="bg-[#1E293B] p-4 rounded-lg">
                <div className="text-[#38BDF8] text-2xl mb-2">
                  <MountainIcon className="h-6 w-6" />
                </div>
                <h4 className="font-poppins font-medium mb-1">Mountain Sourced</h4>
                <p className="text-sm text-gray-400">Direct from natural springs</p>
              </div>
              <div className="bg-[#1E293B] p-4 rounded-lg">
                <div className="text-[#38BDF8] text-2xl mb-2">
                  <BadgeCheckIcon className="h-6 w-6" />
                </div>
                <h4 className="font-poppins font-medium mb-1">100% Pure</h4>
                <p className="text-sm text-gray-400">No chemicals or additives</p>
              </div>
              <div className="bg-[#1E293B] p-4 rounded-lg">
                <div className="text-[#38BDF8] text-2xl mb-2">
                  <TruckIcon className="h-6 w-6" />
                </div>
                <h4 className="font-poppins font-medium mb-1">Quick Delivery</h4>
                <p className="text-sm text-gray-400">Same day across Kashmir</p>
              </div>
              <div className="bg-[#1E293B] p-4 rounded-lg">
                <div className="text-[#38BDF8] text-2xl mb-2">
                  <HeartIcon className="h-6 w-6" />
                </div>
                <h4 className="font-poppins font-medium mb-1">Customer Trust</h4>
                <p className="text-sm text-gray-400">Serving thousands daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
