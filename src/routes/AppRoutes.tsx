import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PostDetailPage from "../pages/PostDetailPage";
import DefaultLayout from "../layout/DefaultLayout";
import AdminLayout from "../layout/AdminLayout";
import PostList from "../pages/admin/PostList";
import PostEdit from "../pages/admin/PostEdit";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (

        <Routes>
            <Route element={<DefaultLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/archive" element={<Home />} />
                <Route path="/about" element={<Home />} />
                <Route path="/post/:id" element={<PostDetailPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<></>} />
                    <Route path="/post-list" element={<PostList />} />
                    <Route path="/post-edit" element={<PostEdit />} />
                </Route>
            </Route>
        </Routes>

    );
}
