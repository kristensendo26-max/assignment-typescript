import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types/product";

interface Props {
  search: string;
}

export default function ProductList({ search }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1); // trang hiện tại
  const [totalPages, setTotalPages] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetch(
      `http://localhost:3001/products?_page=${page}&_limit=${limit}&name_like=${search}`
    )
    .then((res) => {
  const totalCount = res.headers.get("X-Total-Count");
  console.log("📦 Total count:", totalCount);
  if (totalCount) {
    setTotalPages(Math.ceil(Number(totalCount) / limit));
  }
  return res.json();
})

      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [page, search]);

  return (
    <div>
      {/* Hiển thị danh sách sản phẩm */}
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
