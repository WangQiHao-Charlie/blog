
import http from "../utils/HttpClient";

export interface Tag {
    name: string;
    color_class: string; // e.g. badge-info
    description?: string;
}
export const fetchTags = () => http.get<Tag[]>("/tags");
