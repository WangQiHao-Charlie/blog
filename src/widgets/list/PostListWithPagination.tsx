import { useEffect, useState } from "react";
import PostCard from "../../pages/default/PostCard";
import type { PostPreview } from "../../types/Post";
import { fetchPostList } from "../../services/PostService";

const PostListWithPagination = () => {
    const [page, setPage] = useState(1);
    const page_size = 10;

    const [posts, setPosts] = useState<PostPreview[]>([]);
    const [meta, setMeta] = useState({
        page: 1,
        page_size,
    });

    useEffect(() => {
        fetchPostList(page, page_size).then((res) => {
            setPosts(res.data);
            setMeta(res.meta);
        });
    }, [page]);

    return (
        <div className="space-y-4">
            {/* Article List */}
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}

            {/* Pagniation Button */}
            <div className="join">
                <button
                    className="join-item btn btn-sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button className="join-item btn btn-sm">Page {meta.page}</button>
                <button
                    className="join-item btn btn-sm"
                    onClick={() => setPage((p) => Math.max(1, p + 1))}
                    disabled={page === 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostListWithPagination;
