import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema} from "../schemas/authSchema";
import type { LoginFormData } from "../schemas/authSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post("http://localhost:3001/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      toast.success("Đăng nhập thành công!");
      navigate(res.data.user.role === "admin" ? "/admin" : "/");
    } catch {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Đăng nhập</h2>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input type="password" {...register("password")} placeholder="Mật khẩu" />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">Đăng nhập</button>
    </form>
  );
}
