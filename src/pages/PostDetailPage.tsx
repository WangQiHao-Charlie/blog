import { useParams } from "react-router-dom";
import type { PostDetail } from "../types/Post";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css/github-markdown-light.css";

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

    const formatted_date = new Date(post.date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            {/* Meta */}
            <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-4 items-center">
                <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatted_date}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.read_time} Minutes · {post.word_count} Words
                </span>
            </div>

            {/* Content markdown */}
            <section className="markdown-body mt-6">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {post.content}
                </ReactMarkdown>
            </section>
        </div>
    );
}

export default PostDetailPage;