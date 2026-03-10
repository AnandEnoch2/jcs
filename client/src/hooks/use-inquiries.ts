import { useMutation } from "@tanstack/react-query";
import { api, type InquiryInput, type InquiryResponse, type ValidationError } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateInquiry() {
  const { toast } = useToast();

  return useMutation<InquiryResponse, Error, InquiryInput>({
    mutationFn: async (data) => {
      const validated = api.inquiries.create.input.parse(data);
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          // Attempt to parse standard validation error
          try {
            const parsedError = api.inquiries.create.responses[400].parse(errorData) as ValidationError;
            throw new Error(parsedError.message);
          } catch {
            throw new Error("Invalid form data submitted.");
          }
        }
        throw new Error("Failed to submit inquiry. Please try again later.");
      }

      return api.inquiries.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent Successfully!",
        description: "Thank you for reaching out. We will get back to you shortly.",
        style: {
          backgroundColor: "hsl(var(--card))",
          borderColor: "hsl(var(--primary))",
          color: "hsl(var(--primary))"
        }
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.error("[Zod/API] Inquiry submission failed:", error);
    }
  });
}
