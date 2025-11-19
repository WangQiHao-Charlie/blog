import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ThemeColorMap } from "../../utils/ThemeMap";
import { fetchCategories, type Category } from "../../services/CategoryService";
import { Link } from "react-router-dom";

const CategoryCard = () => {
    const { colorTheme } = useTheme();
    const { badge } = ThemeColorMap[colorTheme];
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    return (
        <div className="card bg-base-100 w-full shadow">
            <div className="card-body p-4">
                <h2 className="card-title text-lg">Categories</h2>
                <ul className="menu bg-base-100 rounded-box">
                    {categories.map((cat) => (
                        <li key={cat.name}>
                            <Link
                                to={`/archive?category=${encodeURIComponent(cat.name)}`}
                                className="flex justify-between items-center"
                            >
                                <span>{cat.name}</span>
                                <span className="w-full" />
                                <span className={`badge badge-sm ${badge}`}>{cat.post_count}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryCard;
