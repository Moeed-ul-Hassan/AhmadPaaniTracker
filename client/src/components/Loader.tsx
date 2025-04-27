import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DropletIcon } from "lucide-react";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]"
    >
      <div className="relative flex items-center justify-center">
        <div className="droplet absolute w-8 h-8 bg-[#38BDF8] rounded-full"></div>
        <div className="droplet absolute w-8 h-8 bg-[#38BDF8] rounded-full"></div>
        <div className="droplet absolute w-8 h-8 bg-[#38BDF8] rounded-full"></div>
        <div className="text-2xl font-poppins font-bold mt-16">Ahmad Paani Waala</div>
      </div>
    </div>
  );
}
