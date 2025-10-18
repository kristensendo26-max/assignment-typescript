import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../schemas/productSchema";
import type { ProductFormData } from "../../schemas/productSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function AddProduct() {

const navigate = useNavigate();

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<ProductFormData>({
  resolver: zodResolver(productSchema),
});

const onSubmit = async (data: ProductFormData) => {
    try {

       // ✅ Tự động thêm prefix nếu người dùng chưa nhập "assets/img/"
      const imagePath = data.image.startsWith("assets")
        ? data.image
        : `assets/${data.image}`;

      await axios.post("http://localhost:3001/products",{...data, image: imagePath});
      toast.success(" Thêm sản phẩm thành công!");
      navigate("/admin");
      reset();
    } catch (error) {
      toast.error(" Lỗi khi thêm sản phẩm!");
    }
  };

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
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
        Thêm sản phẩm
      </button>
    </form>
  );
}
