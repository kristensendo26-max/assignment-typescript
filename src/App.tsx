import { useState } from "react";
import ProductList from "./components/ProductList";
import "./style.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="left-menu">
          <nav>
            <a href="#" className="active">Trang chủ</a>
            <a href="#">Sản phẩm</a>
            <a href="#">Tin tức</a>
          </nav>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Danh sách sản phẩm */}
      <ProductList search={search} />
    </div>
  );
}

export default App;
