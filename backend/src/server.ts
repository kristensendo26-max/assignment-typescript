import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { Product } from "./models/product";
import router from "./routes/product";
import authRouter from "./routes/auth";


dotenv.config();
console.log("🔍 MONGO_URI =", process.env.MONGO_URI);
const app = express();

// app.use(cors());
app.use(cors({
  exposedHeaders: ["X-Total-Count"],
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/products", router);
app.use("/auth", authRouter);

// Kết nối DB
connectDB();

// // GET /products?_page=1&_limit=8&name_like=abc
// app.get("/products", async (req, res) => {
//   const { _page = 1, _limit = 8, name_like = "" } = req.query;

//   const filter = name_like
//     ? { name: { $regex: name_like, $options: "i" } }
//     : {};

//   const skip = (Number(_page) - 1) * Number(_limit);

//   const [products, total] = await Promise.all([
//     Product.find(filter).skip(skip).limit(Number(_limit)),
//     Product.countDocuments(filter),
//   ]);

//   res.set("X-Total-Count", total.toString());
//   res.json(products);
// });

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
