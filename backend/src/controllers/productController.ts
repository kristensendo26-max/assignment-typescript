// src/controllers/productController.ts
import { Request, Response } from "express";
import { Product } from "../models/product";

// 📦 Lấy danh sách sản phẩm (phân trang + tìm kiếm)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query._page as string) || 1;
    const limit = parseInt(req.query._limit as string) || 8;
    const skip = (page - 1) * limit;
    const search = (req.query.name_like as string) || "";

    // Tạo filter tìm kiếm
    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    // Lấy tổng số và danh sách sản phẩm
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .select("-__v");

    // Gửi header tổng số
    res.setHeader("X-Total-Count", total.toString());
    res.json(products);
  } catch (error) {
    console.error("❌ Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Tìm sp theo id
export const getProductbyId = async (req: Request, res: Response) =>{
  try {
    const {id} = req.params;

    const product = await Product.findById(
      id
    );

    if(!product){
      return res.json({message: "Không tìm thấy sp"});
    }
    res.json({message: "Tìm ok", product: product});
  } catch (error) {
    console.error("❌ Lỗi khi lấy sản phẩm:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Thêm sp
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {name, price, image, description} = req.body;

    // Chưa dùng Joi
    if (!name || !price) {
      return res.status(400).json({ message: "Tên và giá sản phẩm là bắt buộc" });
    }

    const newProduct = new Product({
      name, price, image, description,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Thêm sp ok",
      product: newProduct,
    })
  } catch (error) {
    console.error("❌ Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}


// Sửa sp
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {name, price, image, description} = req.body;

    const updated = await Product.findByIdAndUpdate(
      id, {name, price, image, description}, {new: true}
    );

    if(!updated){
      return res.status(404).json({message: "Không tìm thấy sản phẩm"});
    }

    res.json({message: "Cập nhật thành công", product: updated});
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}

// Xóa sp
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if(!deleted){
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });      
    }
    res.json({ message: "🗑️ Xóa sản phẩm thành công!" });
  } catch (error) {
    console.error("❌ Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}
