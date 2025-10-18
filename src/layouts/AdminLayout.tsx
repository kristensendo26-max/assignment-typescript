import { Outlet, Link } from "react-router-dom";

export default function AdminLayout(){
    return(
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <Link to="/admin/">Danh sách</Link>
                    <Link to="/admin/add">Thêm mới</Link>
                </nav>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    )
}