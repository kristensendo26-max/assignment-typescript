// src/schemas/productSchema.ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Tên không được bỏ trống"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
  image: z.string().min(1, "Hình ảnh không được bỏ trống"),
  description: z.string().min(1, "Mô tả không được bỏ trống"),
});

export type ProductFormData = z.infer<typeof productSchema>;
