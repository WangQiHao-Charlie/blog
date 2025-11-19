import http from "../utils/HttpClient";
import type { PostPreview, PostDetail, Paginated } from "../types/Post";

export const fetchPostList = (page = 1, page_size = 10) => {
    return http.get<Paginated<PostPreview>>("/posts", {
        params: { page, page_size },
    });
};

export const fetchPostById = (id: string) => {
    return http.get<PostDetail>(`/post/${id}`);
};

export const deletePostById = (id: string) => {
    return http.delete<String>(`/protected/post/${id}`);
}

export const insertPost = (post: PostDetail) => {
    return http.post<string>("/protected/post", post);
}

export const updatePost = (post: PostDetail) => {
    return http.put<string>("/protected/post", post);
}