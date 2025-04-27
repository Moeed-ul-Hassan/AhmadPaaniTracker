export interface Testimonial {
  name: string;
  location: string;
  content: string;
  rating: number;
}

export const testimonialData: Testimonial[] = [
  {
    name: "Farooq Ahmad",
    location: "Srinagar Resident",
    content: "Ahmad's water delivery service has been a blessing for my family. The water is always fresh and delivered on time, even during harsh winter months.",
    rating: 5
  },
  {
    name: "Mehreen Khan",
    location: "Business Owner",
    content: "For my cafe, I order the full truck delivery weekly. The consistency and quality of service Ahmad provides is unmatched in the region.",
    rating: 4.5
  },
  {
    name: "Bilal Shah",
    location: "Tourist Guide",
    content: "I recommend Ahmad's water to all my tourists. The small bottles are perfect for day trips around Kashmir's beautiful landscapes.",
    rating: 5
  },
  {
    name: "Sameera Bhat",
    location: "Hotel Manager",
    content: "We've been using Ahmad's water delivery for our hotel guests for years. The quality and reliability have never disappointed us.",
    rating: 5
  },
  {
    name: "Irfan Lone",
    location: "Local Resident",
    content: "The delivery is always prompt and the water tastes so pure. It's definitely better than any other bottled water in the market.",
    rating: 4
  }
];
