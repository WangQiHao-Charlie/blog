
import http from "../utils/HttpClient";

export interface Category {
    name: string;
    post_count: number;
    description?: string;
}

export const fetchCategories = () => http.get<Category[]>("/category");
