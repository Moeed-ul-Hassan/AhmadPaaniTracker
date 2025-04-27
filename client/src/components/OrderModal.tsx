import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { XIcon, CheckIcon, PlusIcon, MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: 'small' | 'big' | 'truck';
}

export default function OrderModal({ isOpen, onClose, selectedProduct }: OrderModalProps) {
  const [smallBottleQuantity, setSmallBottleQuantity] = useState(1);
  const [bigBottleQuantity, setBigBottleQuantity] = useState(1);
  const [truckQuantity, setTruckQuantity] = useState(1);

  const [smallBottleSelected, setSmallBottleSelected] = useState(false);
  const [bigBottleSelected, setBigBottleSelected] = useState(false);
  const [truckSelected, setTruckSelected] = useState(false);

  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProduct) {
      setSmallBottleSelected(selectedProduct === 'small');
      setBigBottleSelected(selectedProduct === 'big');
      setTruckSelected(selectedProduct === 'truck');
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (isOpen) {
      // Show modal with animation
      gsap.to(modalRef.current, { 
        opacity: 1, 
        duration: 0.3,
        ease: "power2.out",
        onStart: () => {
          if (modalRef.current) {
            modalRef.current.style.pointerEvents = 'auto';
          }
        }
      });
      gsap.to(contentRef.current, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.4,
        delay: 0.1,
        ease: "back.out(1.2)"
      });
    } else {
      // Hide modal with animation
      gsap.to(contentRef.current, { 
        scale: 0.95, 
        opacity: 0, 
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(modalRef.current, { 
        opacity: 0, 
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => {
          if (modalRef.current) {
            modalRef.current.style.pointerEvents = 'none';
          }
        }
      });
    }
  }, [isOpen]);

  const calculateTotal = () => {
    let total = 0;
    if (smallBottleSelected) total += 10 * smallBottleQuantity;
    if (bigBottleSelected) total += 20 * bigBottleQuantity;
    if (truckSelected) total += 30 * truckQuantity;
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!smallBottleSelected && !bigBottleSelected && !truckSelected) {
      toast({
        title: "No products selected",
        description: "Please select at least one product",
        variant: "destructive",
      });
      return;
    }

    if (!address.trim()) {
      toast({
        title: "Address is required",
        description: "Please enter your delivery address",
        variant: "destructive",
      });
      return;
    }

    if (!contact.trim()) {
      toast({
        title: "Contact number is required",
        description: "Please enter your contact number",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const orderData = {
        products: {
          smallBottle: smallBottleSelected ? smallBottleQuantity : 0,
          bigBottle: bigBottleSelected ? bigBottleQuantity : 0,
          truck: truckSelected ? truckQuantity : 0
        },
        deliveryAddress: address,
        contactNumber: contact,
        totalAmount: calculateTotal()
      };

      await apiRequest("POST", "/api/orders", orderData);
      
      toast({
        title: "Order placed successfully!",
        description: "We will contact you shortly to confirm your order.",
      });

      // Reset form
      setSmallBottleSelected(false);
      setBigBottleSelected(false);
      setTruckSelected(false);
      setSmallBottleQuantity(1);
      setBigBottleQuantity(1);
      setTruckQuantity(1);
      setAddress("");
      setContact("");
      
      onClose();
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300"
    >
      <div 
        ref={contentRef}
        className="bg-[#1E293B] p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto transform scale-95 transition-transform duration-300"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-poppins font-bold">Place Your Order</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-400 mb-1">Select Products</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="small-bottle" 
                    checked={smallBottleSelected}
                    onCheckedChange={(checked) => setSmallBottleSelected(!!checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="small-bottle" className="text-sm font-medium">Small Bottle (10 Rs)</Label>
                </div>
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    onClick={() => setSmallBottleQuantity(Math.max(1, smallBottleQuantity - 1))}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white w-8 h-8 rounded-l-lg border border-gray-700 p-0"
                    disabled={smallBottleQuantity <= 1}
                  >
                    <MinusIcon className="h-3 w-3" />
                  </Button>
                  <Input 
                    type="number" 
                    value={smallBottleQuantity}
                    onChange={(e) => setSmallBottleQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-12 h-8 bg-[#0F172A] border-t border-b border-gray-700 text-center text-white"
                  />
                  <Button 
                    type="button"
                    onClick={() => setSmallBottleQuantity(smallBottleQuantity + 1)}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white w-8 h-8 rounded-r-lg border border-gray-700 p-0"
                  >
                    <PlusIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="big-bottle"
                    checked={bigBottleSelected}
                    onCheckedChange={(checked) => setBigBottleSelected(!!checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="big-bottle" className="text-sm font-medium">Big Bottle (20 Rs)</Label>
                </div>
                <div className="flex items-center">
                  <Button 
                    type="button"
                    onClick={() => setBigBottleQuantity(Math.max(1, bigBottleQuantity - 1))}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white w-8 h-8 rounded-l-lg border border-gray-700 p-0"
                    disabled={bigBottleQuantity <= 1}
                  >
                    <MinusIcon className="h-3 w-3" />
                  </Button>
                  <Input 
                    type="number"
                    value={bigBottleQuantity}
                    onChange={(e) => setBigBottleQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-12 h-8 bg-[#0F172A] border-t border-b border-gray-700 text-center text-white"
                  />
                  <Button 
                    type="button"
                    onClick={() => setBigBottleQuantity(bigBottleQuantity + 1)}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white w-8 h-8 rounded-r-lg border border-gray-700 p-0"
                  >
                    <PlusIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="full-truck"
                    checked={truckSelected}
                    onCheckedChange={(checked) => setTruckSelected(!!checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="full-truck" className="text-sm font-medium">Full Truck (30 Rs)</Label>
                </div>
                <div className="flex items-center">
                  <Button 
                    type="button"
                    onClick={() => setTruckQuantity(Math.max(1, truckQuantity - 1))}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white w-8 h-8 rounded-l-lg border border-gray-700 p-0"
                    disabled={truckQuantity <= 1}
                  >
                    <MinusIcon className="h-3 w-3" />
                  </Button>
                  <Input 
                    type="number"
                    value={truckQuantity}
                    onChange={(e) => setTruckQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-12 h-8 bg-[#0F172A] border-t border-b border-gray-700 text-center text-white"
                  />
                  <Button 
                    type="button"
                    onClick={() => setTruckQuantity(truckQuantity + 1)}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white w-8 h-8 rounded-r-lg border border-gray-700 p-0"
                  >
                    <PlusIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-1">Delivery Address</Label>
            <Textarea 
              id="address" 
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent outline-none transition-all" 
              placeholder="Enter your delivery address"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="contact" className="block text-sm font-medium text-gray-400 mb-1">Contact Number</Label>
            <Input 
              type="tel" 
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent outline-none transition-all" 
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="flex justify-between items-center p-4 bg-[#0F172A] rounded-lg mb-6">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-[#38BDF8]">{calculateTotal()} Rs</span>
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="water-btn w-full bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0F172A] font-medium py-3 px-4 rounded-lg transition-all"
          >
            {isSubmitting ? "Processing..." : "Confirm Order"} 
            {!isSubmitting && <CheckIcon className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
