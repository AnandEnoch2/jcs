import {
  type CreateInquiryRequest,
  type InquiryResponse
} from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: CreateInquiryRequest): Promise<InquiryResponse>;
  getInquiries(): Promise<InquiryResponse[]>;
}

export class MemoryStorage implements IStorage {
  private inquiries: InquiryResponse[] = [];
  private nextId = 1;

  async createInquiry(inquiry: CreateInquiryRequest): Promise<InquiryResponse> {
    const created: InquiryResponse = {
      ...inquiry,
      id: this.nextId++,
      createdAt: new Date(),
    };
    this.inquiries.push(created);
    return created;
  }

  async getInquiries(): Promise<InquiryResponse[]> {
    return [...this.inquiries].reverse();
  }
}

export const storage = new MemoryStorage();
