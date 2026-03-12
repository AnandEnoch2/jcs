import { z } from 'zod';
import { insertInquirySchema, type Inquiry } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries' as const,
      input: insertInquirySchema,
      responses: {
        201: z.custom<Inquiry>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/inquiries' as const,
      responses: {
        200: z.array(z.custom<Inquiry>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type InquiryInput = z.infer<typeof api.inquiries.create.input>;
export type InquiryResponse = Inquiry;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
