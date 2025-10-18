import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function List() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch("http://localhost:3001/products?_page=1&_limit=100")
    .then((res) => res.json())
    .then((data)=>{
        setProducts(data);
        setLoading(false)
    })
    .catch((err)=>{
        console.log("Lỗi khi tải dữ liệu", err);
        setLoading(false);
    });
  },[])

  if (loading) return <p>Đang tải dữ liệu</p>

  const handleDelete = async (id: string) => {
  if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
    try {
        
      await axios.delete(`http://localhost:3001/products/${id}`);
      toast.success("Xóa sản phẩm thành công!");
      // Nếu có state lưu danh sách, cập nhật lại:
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm!");
    }
  }
};

  return (
    <div className="admin-container">
        <h2>Danh sách</h2>
        <table className="admin-table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p,index)=>(
                    <tr key ={p._id || index}>
                        <td>{index + 1}</td>
                        <td>{p.name}</td>
                        <td>{p.price.toLocaleString()}</td>
                        <td>{p.description}</td>
                        <td><img src={`/${p.image}`} alt={p.name} width="60" /></td>
                        <td>
                            <Link to={`/admin/edit/${p._id}`} className="btn-edit">Sửa</Link>
                            <button onClick={() => handleDelete(p._id)} className="btn-delete">Xóa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
