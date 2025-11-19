import { Github, Tv } from "lucide-react";
import type { UserProfile } from "../../services/UserService";

export const ProfileCard = ({ name, bio, avatar_url, github_url, bilibili_url }: UserProfile) => {
    return (
        <div className="card bg-base-100 shadow w-full">
            <figure className="px-5 pt-3">
                <img src={avatar_url} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{bio}</p>
                <div className="card-actions items-center">
                    {bilibili_url && (
                        <button className="btn btn-soft btn-info" onClick={() => window.open(bilibili_url, "_blank", "noopener,noreferrer")}>
                            <Tv size={20} />
                        </button>
                    )}
                    {github_url && (
                        <button className="btn btn-soft" onClick={() => window.open(github_url, "_blank", "noopener,noreferrer")}>
                            <Github size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
