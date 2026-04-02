import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().optional(),
});

export const feedbackSchema = z.object({
  projectId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export const supportTicketSchema = z.object({
  projectId: z.string().min(1),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number");

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  name: z.string().min(2, "Name is required"),
  role: z.enum(["ADMIN", "CLIENT"]),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().optional(),
  clientId: z.string().min(1, "Client is required"),
  status: z.enum(["DISCOVERY", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  totalValue: z.number().min(0, "Total value cannot be negative").optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z.enum(["DISCOVERY", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  totalValue: z.number().min(0).optional(),
});

export const createMilestoneSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  order: z.number().int().min(1),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
});

export const updateMilestoneSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
  dueDate: z.string().optional(),
  completedAt: z.string().optional(),
  notes: z.string().optional(),
});

export const createPaymentSchema = z.object({
  label: z.string().min(2, "Label is required"),
  amount: z.number().positive("Amount must be positive"),
  percent: z.number().int().min(1).max(100),
  status: z.enum(["PENDING", "PAID", "OVERDUE"]).optional(),
  dueDate: z.string().optional(),
  invoiceUrl: z.string().optional(),
});

export const updatePaymentSchema = z.object({
  status: z.enum(["PENDING", "PAID", "OVERDUE"]).optional(),
  paidDate: z.string().optional(),
  dueDate: z.string().optional(),
  invoiceUrl: z.string().optional(),
});

export const createDocumentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1),
  url: z.string().url("Valid URL is required"),
  size: z.number().optional(),
});

export const updateLeadSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "DISCOVERY", "PROPOSAL", "NEGOTIATION", "WON", "LOST", "NURTURE"]).optional(),
  notes: z.string().optional(),
  assignedTo: z.string().optional().nullable(),
  followUpDate: z.string().optional().nullable(),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema,
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(["ADMIN", "CLIENT"]).optional(),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  active: z.boolean().optional(),
});
