import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/product";

dotenv.config();

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ Missing MONGO_URI in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Xóa dữ liệu cũ
    await Product.deleteMany({});

    // Thêm 10 sản phẩm mẫu
    const products = [
      { name: "iPhone 15", price: 25000000, description: "Apple smartphone mới nhất", image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif"},
      { name: "Samsung Galaxy S23", price: 20000000, description: "Flagship Android cao cấp",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "MacBook Air M2", price: 30000000, description: "Laptop siêu mỏng nhẹ",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "Dell XPS 13", price: 28000000, description: "Laptop Windows cao cấp",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "Sony WH-1000XM5", price: 8000000, description: "Tai nghe chống ồn tốt nhất",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "iPad Pro 12.9", price: 32000000, description: "Máy tính bảng mạnh mẽ",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "Apple Watch Series 9", price: 12000000, description: "Đồng hồ thông minh",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "Asus ROG Phone 7", price: 22000000, description: "Điện thoại gaming",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "Logitech MX Master 3S", price: 2500000, description: "Chuột productivity đỉnh",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
      { name: "LG UltraFine 5K", price: 15000000, description: "Màn hình độ phân giải cao",  image: "assets/iphone-card-40-17pro-202509_FMT_WHH.jfif" },
    ];

    await Product.insertMany(products);
    console.log("✅ Seed thành công 10 sản phẩm mẫu!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed thất bại:", err);
    process.exit(1);
  }
}

seed();
