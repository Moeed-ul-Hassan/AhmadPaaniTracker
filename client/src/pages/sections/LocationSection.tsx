import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircleIcon, MapPinIcon } from "lucide-react";

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
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
    
    // Info animation
    gsap.from(infoRef.current, {
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    });
    
    // Image animation
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    });
  }, []);

  return (
    <section 
      id="location" 
      ref={sectionRef}
      className="py-20 bg-[#1E293B] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={headingRef}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Our <span className="text-[#38BDF8]">Location</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Based in the heart of Kashmir, we deliver across the region with speed and reliability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={infoRef}>
            <div className="bg-[#0F172A] p-6 rounded-xl shadow-lg mb-8">
              <h3 className="text-xl font-poppins font-bold mb-4">Delivery Areas</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-[#38BDF8]">
                    <CheckCircleIcon className="h-5 w-5" />
                  </span>
                  <span>Srinagar City - 30 minute delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#38BDF8]">
                    <CheckCircleIcon className="h-5 w-5" />
                  </span>
                  <span>Gulmarg - Same day delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#38BDF8]">
                    <CheckCircleIcon className="h-5 w-5" />
                  </span>
                  <span>Pahalgam - Same day delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#38BDF8]">
                    <CheckCircleIcon className="h-5 w-5" />
                  </span>
                  <span>Sonamarg - Next day delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#38BDF8]">
                    <CheckCircleIcon className="h-5 w-5" />
                  </span>
                  <span>Other regions - Contact for details</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0F172A] p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-poppins font-bold mb-4">Business Hours</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-[#38BDF8] mb-2">Weekdays</h4>
                  <p className="text-gray-300">8:00 AM - 8:00 PM</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#38BDF8] mb-2">Weekends</h4>
                  <p className="text-gray-300">9:00 AM - 6:00 PM</p>
                </div>
                <div className="col-span-2 mt-4">
                  <h4 className="font-medium text-[#38BDF8] mb-2">Emergency Delivery</h4>
                  <p className="text-gray-300">Available 24/7 (Additional charges apply)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <img 
              src="https://images.unsplash.com/photo-1566837469429-89f83e7a51ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Beautiful landscape of Kashmir" 
              className="rounded-xl shadow-lg" 
            />
            <div className="absolute -bottom-4 -left-4 bg-[#0F172A] p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#38BDF8] text-2xl">
                  <MapPinIcon className="h-6 w-6" />
                </span>
                <h4 className="font-poppins font-bold">Main Office</h4>
              </div>
              <p className="text-sm text-gray-400">123 Dal Lake Road, Srinagar, Kashmir</p>
              <p className="text-sm text-gray-400 mt-2">Phone: +91 12345 67890</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
