import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Users from "./components/User";
import List from "./pages/admin/List";
import Add from "./pages/admin/Add";
import EditProduct from "./pages/admin/Edit";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ClientLayout from "./layouts/ClientLayout";
import "./style.css";

function App() {


  return (
    <>
      <Routes>
        {/* Client Layout */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="users" element={<Users />}></Route> */}
        </Route>

        {/* Trang đăng ký / đăng nhập */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Layout */}
        <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
          <Route index element={<List />} />
          <Route path="add" element={<Add />}></Route>
          <Route path="edit/:id" element={<EditProduct />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

    // <div>
    //   {/* Navbar */}
    //   <header className="navbar">
    //     <div className="left-menu">
    //       <nav>
    //         <a href="#" className="active">Trang chủ</a>
    //         <a href="#">Sản phẩm</a>
    //         <a href="#">Tin tức</a>
    //       </nav>
    //     </div>
    //     <div className="search-box">
    //       <input
    //         type="text"
    //         placeholder="Search"
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //       />
    //     </div>
    //   </header>

    //   {/* Danh sách sản phẩm */}
    //   <ProductList search={search} />
    // </div>
