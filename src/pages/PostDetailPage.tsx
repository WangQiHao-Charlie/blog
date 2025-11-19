import { useParams } from "react-router-dom";
import type { PostDetail } from "../types/Post";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import { Calendar, Clock } from "lucide-react";
import { fetchPostById } from "../services/PostService";
import { useState, useEffect } from "react";

function PostDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostDetail | null>(null);

    useEffect(() => {
        if (id) {
            fetchPostById(id).then(setPost);
        }
    }, [id]);

    if (!post) {
        return <div className="p-8 text-error">No Such Article</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* 标题 */}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            {/* 元信息 */}
            <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-4 items-center">
                <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.read_time} Minutes · {post.word_count} Words
                </span>
            </div>

            {/* 标签
            <div className="mb-6 flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                    <span key={tag} className="badge badge-outline">
                        #{tag}
                    </span>
                ))}
            </div> */}

            {/* 正文 markdown */}
            <div className="prose max-w-none">
                <ReactMarkdown
                    children={post.content}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                />
            </div>
        </div>
    );
}

export default PostDetailPage;
