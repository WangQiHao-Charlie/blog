
// types/Post.ts
export interface PostPreview {
    _id?: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    tags: string[];
    cover_image: string;
    word_count: number;
    read_time: number;
}

export interface PostDetail extends PostPreview {
    content: string;
    author: string;
}

export interface Paginated<T> {
    data: T[];
    meta: {
        page: number;
        page_size: number;
        total: number;
        total_pages: number;
    };
}
