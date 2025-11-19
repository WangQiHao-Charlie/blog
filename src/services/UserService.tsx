import http from "../utils/HttpClient";

export interface UserProfile {
  name: string;
  bio: string;
  avatar_url: string;
  github_url?: string;
  bilibili_url?: string;
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
  return await http.get<UserProfile>("/user");
};
