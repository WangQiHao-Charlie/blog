import { useEffect, useState } from "react";
import { fetchTags, type Tag } from "../../services/TagService";
import { Link } from "react-router-dom";

const TagsCard = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        fetchTags().then(setTags);
    }, []);

    return (
        <div className="card bg-base-100 shadow w-full">
            <div className="card-body">
                <h2 className="card-title text-lg">Tags</h2>
                <div className="flex flex-wrap gap-2">

                    {tags.map((tag) => (
                        <Link
                            key={tag.name}
                            to={`/archive?tag=${encodeURIComponent(tag.name)}`}
                            className={`badge badge-soft ${tag.color_class} cursor-pointer`}
                        >
                            {tag.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagsCard;
