export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const productData: Product[] = [
  {
    id: "small",
    name: "Small Bottle",
    price: 10,
    description: "500ml of pure Kashmir mountain water, perfect for individual consumption.",
    image: "https://images.unsplash.com/photo-1606168094336-48f8b53f0486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "big",
    name: "Big Bottle",
    price: 20,
    description: "1.5L bottle ideal for families or daily hydration needs with mineral benefits.",
    image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "truck",
    name: "Full Truck",
    price: 30,
    description: "Bulk water delivery service for events, businesses or large households.",
    image: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];
