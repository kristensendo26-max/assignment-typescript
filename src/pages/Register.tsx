import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema} from "../schemas/authSchema";
import type { RegisterFormData } from "../schemas/authSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post("http://localhost:3001/auth/register", data);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch {
      toast.error("Lỗi khi đăng ký!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Đăng ký</h2>
      <input {...register("username")} placeholder="Tên người dùng" />
      {errors.username && <p className="error">{errors.username.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input type="password" {...register("password")} placeholder="Mật khẩu" />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">Đăng ký</button>
    </form>
  );
}
