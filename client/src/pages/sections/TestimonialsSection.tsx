import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, UserIcon } from "lucide-react";
import { testimonialData } from "@/data/testimonialData";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  
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
    
    // Testimonials animation
    const testimonials = sliderRef.current?.children;
    if (testimonials) {
      gsap.from(testimonials, {
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        },
        x: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.3
      });
    }
  }, []);

  const slideNext = () => {
    const container = sliderRef.current;
    if (!container) return;
    
    const cardWidth = 350 + 24; // card width + gap
    const maxPosition = (testimonialData.length * cardWidth) - container.clientWidth;
    const newPosition = Math.min(sliderPosition + cardWidth, maxPosition);
    
    gsap.to(container, {
      scrollLeft: newPosition,
      duration: 0.5,
      ease: "power2.out"
    });
    
    setSliderPosition(newPosition);
  };

  const slidePrev = () => {
    const container = sliderRef.current;
    if (!container) return;
    
    const cardWidth = 350 + 24; // card width + gap
    const newPosition = Math.max(sliderPosition - cardWidth, 0);
    
    gsap.to(container, {
      scrollLeft: newPosition,
      duration: 0.5,
      ease: "power2.out"
    });
    
    setSliderPosition(newPosition);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-[#0F172A] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={headingRef}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Customer <span className="text-[#38BDF8]">Feedback</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What our satisfied customers say about Ahmad Paani Waala services.
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="testimonial-slider overflow-x-auto no-scrollbar pb-8 flex gap-6 snap-x"
          >
            {testimonialData.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-[#1E293B] p-6 rounded-xl shadow-lg min-w-[300px] max-w-[350px] flex-shrink-0 snap-start"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8]">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div className="flex text-[#38BDF8]">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i}
                      className="h-5 w-5" 
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={slidePrev}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 testimonial-prev cursor-pointer bg-[#1E293B] p-3 rounded-full shadow-lg hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="h-5 w-5 text-[#38BDF8]" />
          </button>
          <button 
            onClick={slideNext}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 testimonial-next cursor-pointer bg-[#1E293B] p-3 rounded-full shadow-lg hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="h-5 w-5 text-[#38BDF8]" />
          </button>
        </div>
      </div>
    </section>
  );
}
