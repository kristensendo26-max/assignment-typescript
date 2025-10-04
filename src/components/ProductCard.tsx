// Các component tái sử dụng

import type { Product } from "../types/product";


interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="actions">
        <button className="buy">Mua ngay</button>
        <button className="cart">Add cart</button>
      </div>
    </div>
  );
}
