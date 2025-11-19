import { Calendar, BookOpen, Hash } from "lucide-react";
import { ThemeColorMap } from "../../utils/ThemeMap";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import type { PostPreview } from "../../types/Post";




const PostCard = ({ post }: { post: PostPreview }) => {
    const { colorTheme } = useTheme();
    const { bg, text } = ThemeColorMap[colorTheme];
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${post._id}`);
    };

    const hasCover = Boolean(post.cover_image);

    const formatted_date = new Date(post.date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="card w-full bg-base-100 shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row group"
            onClick={handleClick}>
            {/* Text content */}
            <div className="flex flex-col gap-3 p-5 flex-1">
                <h2 className="text-xl font-semibold">{post.title}</h2>

                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span className={`inline-flex items-center gap-1 ${bg} ${text} px-2 py-1 rounded`}>
                        <Calendar className="w-4 h-4" />
                        {formatted_date}
                    </span>

                    <span className={`inline-flex items-center gap-1 ${bg} ${text} px-2 py-1 rounded`}>
                        <BookOpen className="w-4 h-4" />
                        {post.category}
                    </span>

                    <span className={`inline-flex items-center gap-1 ${bg} ${text} px-2 py-1 rounded`}>
                        <Hash className="w-4 h-4" />
                        {post.tags.join(" / ")}
                    </span>
                </div>

                <p className="text-gray-700 text-sm">{post.excerpt}</p>

                <div className="text-gray-400 text-xs">
                    {post.word_count} words &nbsp;|&nbsp; {post.read_time} minutes
                </div>
            </div>

            {/* Cover image with hover arrow */}
            {hasCover && (
                <div className="relative md:w-1/3 w-full overflow-hidden group-hover:cursor-pointer">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-none md:rounded-r-xl rounded-b-xl"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/fallback.jpg";
                        }}
                    />
                    {/* Hover Arrow */}
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-black ${bg} rounded-full p-1 shadow-lg`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
