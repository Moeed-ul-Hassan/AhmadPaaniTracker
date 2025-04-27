import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const contactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
});

export type InsertContact = z.infer<typeof contactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Order schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  products: jsonb("products").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  contactNumber: text("contact_number").notNull(),
  totalAmount: integer("total_amount").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const orderSchema = z.object({
  products: z.object({
    smallBottle: z.number().min(0),
    bigBottle: z.number().min(0),
    truck: z.number().min(0)
  }),
  deliveryAddress: z.string().min(5),
  contactNumber: z.string().min(10),
  totalAmount: z.number().min(0)
});

export type InsertOrder = z.infer<typeof orderSchema>;
export type Order = typeof orders.$inferSelect;

// User schema (existing)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
