import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../schemas/productSchema";
import type { ProductFormData } from "../../schemas/productSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditProduct() {
  const { id } = useParams(); // 👈 lấy id từ URL
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // 🔹 Lấy thông tin sản phẩm theo ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/products/${id}`);
        reset(data.product); // Đổ dữ liệu vào form
      } catch (error) {
        toast.error("Không tìm thấy sản phẩm!");
      }
    };
    fetchProduct();
  }, [id, reset]);

  // 🔹 Gửi dữ liệu cập nhật
  const onSubmit = async (data: ProductFormData) => {
    try {

     // ✅ Tự động thêm prefix nếu người dùng chưa nhập "assets/img/"
      const imagePath = data.image.startsWith("assets")
        ? data.image
        : `assets/${data.image}`;
    
      await axios.put(`http://localhost:3001/products/${id}`, {...data, image: imagePath});
      toast.success("Cập nhật sản phẩm thành công!");
      navigate("/admin");
    } catch (error) {
      toast.error("Lỗi khi cập nhật sản phẩm!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      <h2 className="form-title">Cập nhật sản phẩm</h2>

      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label>Giá</label>
        <input type="number" {...register("price", { valueAsNumber: true })} />
        {errors.price && <p className="error">{errors.price.message}</p>}
      </div>

      <div className="form-group">
        <label>Hình ảnh</label>
        <input {...register("image")} />
        {errors.image && <p className="error">{errors.image.message}</p>}
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea {...register("description")} />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
      </div>

      <button type="submit" className="btn-add">
        Cập nhật sản phẩm
      </button>
    </form>
  );
}
