import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, orderSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      const savedContact = await storage.createContact(contactData);
      res.status(201).json(savedContact);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save contact" });
      }
    }
  });

  // API routes for orders
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = orderSchema.parse(req.body);
      const savedOrder = await storage.createOrder(orderData);
      res.status(201).json(savedOrder);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid order data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save order" });
      }
    }
  });

  // Get all contacts (admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Get all orders (admin purposes)
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
