import { Outlet } from "react-router-dom";
import Navbar from "../widgets/NavBar";


const DefaultLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-base-100 text-base-content">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
