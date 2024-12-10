import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(6).max(225).trim(),
  price: z.number().min(0),
  description: z.string().optional(),
});
