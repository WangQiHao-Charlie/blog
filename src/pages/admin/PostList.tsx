import { useEffect, useState } from "react";
import type { Paginated, PostPreview } from "../../types/Post";
import { deletePostById, fetchPostList } from "../../services/PostService";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";


const PostList = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState<Paginated<PostPreview> | null>(null);

    useEffect(() => {
        fetchPostList().then(setPosts);
    }, []);


    const handleEdit = (id: String) => {
        navigate("/post-edit", {
            state: { id }
        });
    };

    const handleAdd = () => {
        navigate("/post-edit");
    };

    const handleDelete = (id: string) => {
        deletePostById(id);

    }

    return (
        <div className="bg-base-100 text-base-content">
            <div className="overflow-x-auto">
                <table className="table">

                    {/* head */}
                    <thead className="overflow-x-auto text-base-content">
                        <div className="flex items-center justify-between gap-2">
                            <label className="input flex items-center gap-2 w-full max-w-xs">
                                <svg
                                    className="h-[1em]"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21L16.65 16.65" />
                                </svg>
                                <input type="search" placeholder="Search" className="grow" />
                            </label>

                            <button className="btn"
                                onClick={handleAdd}>+ Add Post</button>
                        </div>

                        <tr >

                            <th>Title</th>
                            <th>Tag</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.data.map((post => (

                            <tr>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">

                                                <img
                                                    src={post.cover_image}
                                                    alt="Posts Cover Image" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold"> {post.title}</div>
                                            <div className="text-sm opacity-50">{post.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.map(tag => (
                                            <div className="badge badge-soft badge-info cursor-pointer">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                <td>{
                                    new Date(post.date).toLocaleDateString("en-us", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                }</td>
                                <th>
                                    <div className="dropdown dropdown-end dropdown-hover">
                                        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                                            <Edit />
                                        </div>
                                        <ul
                                            className="dropdown-content menu bg-base-100 rounded-box z-[999] w-20 p-2 shadow absolute right-0"
                                            style={{ position: 'fixed' }}
                                        >
                                            <li><a className="text-black" onClick={() => handleEdit(post._id || "")}>Edit</a></li>
                                            <li><a className="text-red-500" onClick={() => handleDelete(post._id || "")}>Delete</a></li>
                                        </ul>
                                    </div>

                                </th>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default PostList;