import { PanelBottom, Pen } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {

    const menu = [
        { to: "/dashboard", label: "Dashboard", icon: PanelBottom },
        { to: "/post-list", label: "Posts", icon: Pen },
    ];

    return (
        <div className="bg-base-100 text-base-content">

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-60 bg-base-200 text-base-content transform transition-transform duration-300 z-50`}
            >
                {/* Logo */}
                <div className="flex items-center mb-6 px-4 py-5 border-b border-base-300">
                    <span className="text-lg font-semibold">Blog Admin Panel</span>
                </div>

                {/* Nav Group */}
                <div className="text-xs opacity-60 mb-2 px-6">Overview</div>

                <ul className="space-y-1 px-2 flex-1">
                    {menu.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center px-3 h-10 rounded-lg gap-3 transition-colors
                ${isActive
                                        ? "bg-primary text-primary-content"
                                        : "hover:bg-base-300"
                                    }`
                                }
                            >
                                <item.icon size={18} />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Footer */}
                {/* <div className="mt-auto border-t border-base-300 p-3">
                    <a className="flex items-center px-3 h-10 rounded-lg hover:bg-base-300 gap-3 cursor-pointer">
                        <span className="w-5 h-5 bg-base-content/40 rounded"></span>
                        Settings
                    </a>
                </div> */}
            </div>

        </div >
    );
};

export default AdminSideBar;
