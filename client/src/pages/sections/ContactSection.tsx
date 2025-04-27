import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  PhoneIcon, 
  MailIcon, 
  MapPinIcon, 
  FacebookIcon, 
  InstagramIcon, 
  TwitterIcon, 
  Send 
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

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
    
    // Form animation
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    });
    
    // Info animation
    gsap.from(infoRef.current, {
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    });
  }, []);

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent successfully!",
        description: "We will get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-[#1E293B] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={headingRef}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Contact <span className="text-[#38BDF8]">Us</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions or want to place an order? Reach out to us through any of these channels.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            ref={formRef}
            className="bg-[#0F172A] p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-poppins font-bold mb-6">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Your Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          className="bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          type="email"
                          className="bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your phone number" 
                          type="tel"
                          className="bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-400">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here..." 
                          rows={4}
                          className="bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="water-btn w-full bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0F172A] font-medium py-3 px-4 rounded-lg transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} 
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </Form>
          </div>
          
          <div ref={infoRef}>
            <div className="bg-[#0F172A] p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-xl font-poppins font-bold mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-[#38BDF8] text-xl mt-1">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-gray-300">+91 12345 67890</p>
                    <p className="text-gray-300">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-[#38BDF8] text-xl mt-1">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-gray-300">ahmad@paaniwaala.com</p>
                    <p className="text-gray-300">orders@paaniwaala.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-[#38BDF8] text-xl mt-1">
                    <MapPinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-gray-300">123 Dal Lake Road, Srinagar,</p>
                    <p className="text-gray-300">Jammu & Kashmir, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0F172A] p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-poppins font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="bg-[#1E293B] hover:bg-[#38BDF8]/20 w-12 h-12 rounded-full flex items-center justify-center text-[#38BDF8] transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#1E293B] hover:bg-[#38BDF8]/20 w-12 h-12 rounded-full flex items-center justify-center text-[#38BDF8] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#1E293B] hover:bg-[#38BDF8]/20 w-12 h-12 rounded-full flex items-center justify-center text-[#38BDF8] transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#1E293B] hover:bg-[#38BDF8]/20 w-12 h-12 rounded-full flex items-center justify-center text-[#38BDF8] transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.285-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
                    <path d="M20.499 3.75c-3.546-3.55-9.452-3.55-13.001 0-3.55 3.545-3.55 9.45 0 13a8.74 8.74 0 0 0 1.091.9l.186 2.35c.036.463.356.85.78.997.075.025.15.037.224.037a1.12 1.12 0 0 0 .728-.27l2.105-1.5c.365-.259.643-.523.811-.796.514.263 1.092.45 1.547.609 5.625 1.629 11.216-1.784 12.847-7.411 1.5-5.139-1.029-10.592-5.553-12.916zM12 21.75c-1.792 0-3.584-.47-5.163-1.418l-.354-.21-2.296 1.837.577-2.831.172-.821-.47-.411a9.308 9.308 0 0 1-1.127-1.211c-3.095-3.875-2.958-10.024.306-13.284 3.26-3.265 9.006-3.402 12.34-.306 4.152 3.885 4.152 10.503 0 14.394A8.72 8.72 0 0 1 12 21.75z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
