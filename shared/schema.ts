import { z } from "zod";

export const insertInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  eventType: z.string().min(1, "Event type is required"),
  guests: z.coerce.number().int().min(1, "Guests must be at least 1"),
  message: z.string().min(1, "Message is required"),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type CreateInquiryRequest = InsertInquiry;

export type Inquiry = InsertInquiry & {
  id: number;
  createdAt: Date;
};

export type InquiryResponse = Inquiry;
