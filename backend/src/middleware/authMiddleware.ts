import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_secret_key";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Thiếu token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
};

// Chỉ cho phép admin
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin được phép thực hiện" });
  }
  next();
};
