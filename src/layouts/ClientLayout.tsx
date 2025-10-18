import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function ClientLayout(){
    const [search, setSearch] = useState("");
    return (
        <>
            <header className="navbar">
                <div className="left-menu">
                <nav>
                    <a href="/" className="active">Trang chủ</a>
                    <a href="/users">Người dùng</a>
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
            <main>
                {/* Truyền search xuống cho trang con */}
                <Outlet context={{ search }} />
            </main>
        </>
    )
}