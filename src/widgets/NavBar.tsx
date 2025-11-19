import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ThemeColorMap } from "../utils/ThemeMap";
import ThemeSwitcher from "./button/ThemeSwitcher";
import { useState, useEffect } from "react";
import type { PostDetail } from "../types/Post";
import http from "../utils/HttpClient";
import logo from "../assets/logo/Logo_dark.svg"
const Navbar = () => {

    const { colorTheme } = useTheme();
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState<PostDetail[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (keyword.trim()) {
                http
                    .get<PostDetail[]>(`/search/${keyword}`)
                    .then(setSuggestions);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 200);

        return () => clearTimeout(handler);
    }, [keyword]);

    const { text } = ThemeColorMap[colorTheme];
    return (

        <div className="navbar bg-base-150 shadow-sm px-5">
            <div className="navbar-start">

                <a className="btn btn-ghost" onClick={() => {
                    navigate("/");
                }}>  <img src={logo} alt="Icon" className="w-45 h-45" />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className={`${text}`}
                        onClick={() => navigate("/")}>Home</a></li>
                    <li><a className={`${text}`}
                        onClick={() => navigate("/archive")}>Archive</a></li>
                    <li><a className={`${text}`}
                        onClick={() => navigate("/about")}>About Me</a></li>
                </ul>
            </div>

            <div className="navbar-end relative">
                <div className="flex gap-2 items-center">
                    {<ThemeSwitcher />
                    }
                    <label className="input flex items-center gap-2">
                        <svg className="h-[1em]" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21L16.65 16.65" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search"
                            className="grow"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        />
                    </label>

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute top-full right-0 mt-1 w-72 bg-base-100 shadow-lg rounded-box p-2 z-50">
                            {suggestions.map((sug) => (
                                <li
                                    key={sug._id}
                                    className="p-2 hover:bg-base-200 cursor-pointer rounded"
                                    onMouseDown={() => {
                                        setShowSuggestions(false);
                                        setKeyword("");
                                        navigate(`/post/${sug._id}`);
                                    }}

                                >
                                    <div className="font-medium text-sm truncate">{sug.title}</div>
                                    <div className="text-xs text-base-content/60 truncate">{sug.excerpt}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Navbar;

