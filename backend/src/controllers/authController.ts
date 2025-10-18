import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = "your_secret_key"; // 👈 nên để trong .env

// Đăng ký
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username hoặc email đã tồn tại" });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Đăng nhập
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
