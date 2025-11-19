import { useNavigate } from "react-router-dom";
import type { PostPreview } from "../../types/Post";

interface Props {
    posts: PostPreview[];
}

const ArchiveTimeline = ({ posts }: Props) => {
    // 按年份分组
    const grouped = posts.reduce((acc, post) => {
        const year = post.date.split("-")[0];
        acc[year] = acc[year] || [];
        acc[year].push(post);
        return acc;
    }, {} as Record<string, PostPreview[]>);

    const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
    const navigate = useNavigate();
    return (
        <div className="timeline timeline-vertical">
            {sortedYears.map((year) => (
                <div key={year} className="timeline-item">
                    <div className="timeline-start text-lg font-bold">{year}</div>
                    <div className="timeline-middle bg-primary"></div>
                    <div className="timeline-end space-y-2">
                        {grouped[year].map((post) => (
                            <div key={post._id} className="card bg-base-200 shadow-sm p-4" onClick={() => navigate(`/post/${post._id}`)}>
                                <h3 className="font-semibold">{post.title}</h3>
                                <p className="text-sm text-gray-500">{post.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArchiveTimeline;
