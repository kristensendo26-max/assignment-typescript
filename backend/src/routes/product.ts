import express from "express";
import { Product } from "../models/product";
import { createProduct, deleteProduct, getProductbyId, getProducts, updateProduct } from "../controllers/productController";
import { verifyToken, requireAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// GET /products?_page=1&_limit=8&name_like=abc
// router.get("/", async (req, res) => {
//   try {
//     const page = parseInt(req.query._page as string) || 1;
//     const limit = parseInt(req.query._limit as string) || 8;
//     const skip = (page - 1) * limit;
//     const search = (req.query.name_like as string) || "";

//     // Tạo filter cho MongoDB
//     const filter = search
//       ? { name: { $regex: search, $options: "i" } } // không phân biệt hoa thường
//       : {};

//     const total = await Product.countDocuments(filter);
//     const products = await Product.find(filter)
//       .skip(skip)
//       .limit(limit)
//       .select("-__v");

//     // Gửi header tổng số sản phẩm (giống json-server)
//     res.setHeader("X-Total-Count", total.toString());
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/", getProducts);
router.get("/:id", getProductbyId);
router.post("/", verifyToken, requireAdmin, createProduct);
router.put("/:id", verifyToken, requireAdmin, updateProduct);
router.delete("/:id", verifyToken, requireAdmin, deleteProduct);

export default router;
