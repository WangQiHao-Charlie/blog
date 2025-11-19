import { Outlet } from "react-router-dom";
import AdminSideBar from "../widgets/sidebar/AdminSideBar";
import AdminNavBar from "../widgets/AdminNavBar";
import { Toaster } from "react-hot-toast";


export default function AdminLayout() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-60 bg-base-100 text-base-content">
                <AdminSideBar />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 bg-base-100 overflow-auto">
                <div className="sticky top-0 z-10 bg-base-100 p-2 border-b border-base-300">
                    <AdminNavBar />
                </div>

                {/* Subpages */}
                <div className="flex-1 overflow-auto p-4">
                    <Outlet />
                    <Toaster />
                </div>
            </div>
        </div >
    );
}
