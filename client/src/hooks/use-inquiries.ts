import { useMutation } from "@tanstack/react-query";
import { api, type InquiryInput, type InquiryResponse } from "@shared/routes";

export function useCreateInquiry() {
  return useMutation<InquiryResponse, Error, InquiryInput>({
    mutationFn: async (data) => {
      const validated = api.inquiries.create.input.parse(data);
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        throw new Error("Backend unavailable");
      }

      return api.inquiries.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      console.info("[Inquiry] Backend save skipped:", error.message);
    }
  });
}
