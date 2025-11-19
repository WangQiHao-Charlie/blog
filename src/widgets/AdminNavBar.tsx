type BreadcrumbItem = {
    label: string;
    path: string;
};

import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
    "/dashboard": [
        { label: "Home", path: "/" },
        { label: "Dashboard", path: "/dashboard" },
    ],
    "/post-list": [
        { label: "Home", path: "/" },
        { label: "Dashboard", path: "/dashboard" },
        { label: "Post List", path: "/post-list" },
    ],
    "/post-edit": [
        { label: "Home", path: "/" },
        { label: "Control Plane", path: "/dashboard" },
        { label: "Post Edit", path: "/post-edit" },
    ],
};

const AdminNavBar = () => {
    const { authenticated, login, logout } = useAuth();
    const location = useLocation();

    const path = location.pathname;
    const items = breadcrumbMap[path] ?? [
        { label: "Home", path: "/" },
    ];

    return (
        <div className="flex items-center justify-between">
            <div className="breadcrumbs text-sm text-base-content">
                <ul>
                    {items.map((item, i) => (
                        <li key={i}><a href={item.path}>{item.label}</a></li>
                    ))}
                </ul>
            </div>
            <div>
                {authenticated ? (
                    <button
                        className="btn btn-xs sm:btn-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="btn btn-xs sm:btn-sm"
                        onClick={login}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminNavBar;
