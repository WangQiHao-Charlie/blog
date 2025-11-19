import { ProfileCard } from '../widgets/cards/ProfileCard';
import { MainCard } from '../widgets/cards/MainCard';

import CategoryCard from "../widgets/cards/CategoriesCard";
import { useEffect, useState } from "react";
import { fetchUserProfile, type UserProfile } from "../services/UserService";
import TagsCard from "../widgets/cards/TagsCard";
import Footer from "../widgets/footer/Footer";
import { useLocation, useParams } from 'react-router-dom';
import PostListWithPagination from '../widgets/list/PostListWithPagination';
import AboutMe from './default/AboutMe';
import ArchivePage from './default/ArchivePage';

function Home() {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        fetchUserProfile().then(setUser);
    }, []);

    type PageMode = "list" | "archive" | "tag" | "about";

    const { tag } = useParams<{ tag?: string }>();
    const location = useLocation();

    const getPageMode = (pathname: string, tag: string | undefined): PageMode => {
        if (pathname === "/archive") return "archive";
        if (pathname === "/about") return "about";
        if (tag) return "tag";
        return "list";
    };

    const mode: PageMode = getPageMode(location.pathname, tag);

    let title = "All Articles";
    let content: React.ReactNode = null;

    switch (mode) {
        case "list":
            title = "All Articles";
            content = <PostListWithPagination />;
            break;
        case "archive":
            title = "Archive";
            content = <ArchivePage />;
            break;
        // case "tag":
        //     title = `#${tag}`;
        //     content = <FilteredPostList posts={posts.filter(p => p.tags.includes(tag!))} />;
        //     break;
        case "about":
            title = "About Me";
            content = <AboutMe />;
            break;
        default:
            content = <p>UnKnown</p>;
    }

    if (!user) {

        return (
            <div className="px-0 sm:px-0 md:px-12 lg:px-16 xl:px-20 py-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 animate-pulse">
                {/* Left Skeleton */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Skeleton */}
                    <div className="card shadow p-4 space-y-4">
                        <div className="skeleton w-24 h-24 rounded-full mx-auto" />
                        <div className="skeleton h-4 w-3/4 mx-auto" />
                        <div className="skeleton h-3 w-1/2 mx-auto" />
                    </div>

                    {/* Category Skeleton */}
                    <div className="card shadow p-4 space-y-2">
                        <div className="skeleton h-4 w-1/2" />
                        <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="skeleton h-3 w-full" />
                            ))}
                        </div>
                    </div>

                    {/* Tags Skeleton */}
                    <div className="card shadow p-4 space-y-2">
                        <div className="skeleton h-4 w-1/2" />
                        <div className="flex flex-wrap gap-2">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton h-6 w-16 rounded" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="lg:col-span-3 space-y-6">
                    {/* MainCard Skeleton */}
                    <div className="card shadow p-6 space-y-4">
                        <div className="skeleton h-6 w-1/2" />
                        <div className="skeleton h-4 w-full" />
                        <div className="skeleton h-4 w-5/6" />
                        <div className="skeleton h-4 w-2/3" />
                        <div className="skeleton h-48 w-full rounded" />
                    </div>

                    {/* Footer Skeleton */}
                    <div className="skeleton h-6 w-1/3 mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="px-2 sm:px-6 md:px-12 lg:px-16 xl:px-20 py-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left SideBar */}
            <div className="lg:col-span-1 space-y-6 min-w-0 overflow-hidden">
                <ProfileCard {...user} />
                <CategoryCard />
                <TagsCard />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 min-w-0 overflow-hidden">
                <MainCard title={title}>
                    {content}
                </MainCard>

                <Footer />
            </div>
        </div>
    );
}

export default Home;
