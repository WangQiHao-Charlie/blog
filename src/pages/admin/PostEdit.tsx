import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPostById, insertPost, updatePost } from '../../services/PostService';
import type { PostDetail } from '../../types/Post';
import toast from 'react-hot-toast';
import { fetchCategories, type Category } from '../../services/CategoryService';

export default function PostEdit() {

    const location = useLocation();
    const id = location.state?.id;

    const [post, setPost] = useState<PostDetail | null>(null);
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        if (!id) {
            setPost({
                title: "",
                category: "",
                tags: [],
                cover_image: "",
                author: "",
                date: "",
                excerpt: "",
                _id: "",
                word_count: 0,
                read_time: 0,
                content: "",
            }
            );
        }
        else {
            fetchPostById(id).then(setPost);
        }
    }, [id]);

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    const [tagInput, setTagInput] = useState("");


    const addTag = (e: { key: string }) => {
        if (e.key === "Enter" && tagInput.trim()) {
            setPost(prev =>
                prev ? { ...prev, tags: [...(prev.tags ?? []), tagInput.trim()] } : prev
            );
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setPost(prev =>
            prev ? { ...prev, tags: (prev.tags ?? []).filter(t => t !== tag) } : prev
        );
    };

    const savePost = async () => {
        if (!post) return;

        const toSave: PostDetail = {
            ...post,
            word_count: wordCount,
            read_time: Math.floor(wordCount / 200),
        };

        try {
            if (!id) {
                await insertPost(toSave);
                toast.success("Post created successfully!");
            } else {
                await updatePost(toSave);
                toast.success("Post updated!");
            }
        } catch (err) {
            toast.error("Failed to save post");
        }
    }

    return <div className="bg-base-100 text-base-content">

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

            <div className="bg-base-200 border border-base-300 rounded-xl p-4">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Post Metadata</legend>

                    <label className="label">Title</label>
                    <input type="text"
                        className="input"
                        placeholder="Enter title here"
                        value={post?.title ?? ""}
                        onChange={(e) =>
                            setPost(prev => prev ? { ...prev, title: e.target.value } : prev)
                        }
                    />

                    <label className="label">Excerpt</label>
                    <input type="text"
                        className="input"
                        placeholder="Excerpt"
                        value={post?.excerpt}
                        onChange={(e) =>
                            setPost(prev => prev ? { ...prev, excerpt: e.target.value } : prev)
                        } />

                    <label className="label">Author</label>
                    <input type="text" className="input" placeholder="Name" />

                    <label className="label">Category</label>
                    <select
                        className="select"
                        value={post?.category || ""}
                        onChange={(e) =>
                            setPost(prev => prev ? { ...prev, category: e.target.value } : prev)
                        }
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option key={cat.name} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>


                    <label className="label">Tags</label>

                    <input
                        className="input input-bordered w-full"
                        value={tagInput}
                        placeholder='Press enter to add tag'
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={addTag}
                    />

                    <div className="flex gap-2 flex-wrap mt-2">
                        {(post?.tags ?? []).map(tag => (
                            <div key={tag} className="badge badge-info gap-1 cursor-pointer">
                                {tag}
                                <span onClick={() => removeTag(tag)}>✕</span>
                            </div>
                        ))}
                    </div>

                </fieldset>
            </div>


            <div className="bg-base-100 border border-base-300 rounded-xl p-4">

                <div>
                    <label className="label">
                        <span className="label-text">Cover Image URL</span>
                    </label>
                    <input
                        className="input input-bordered w-full"
                        value={post?.cover_image}
                        onChange={(e) =>
                            setPost(prev => prev ? { ...prev, cover_image: e.target.value } : prev)
                        }
                    />

                    {/* Preview */}
                    {post?.cover_image && (
                        <img
                            src={post?.cover_image}
                            className="mt-3 h-40 rounded-lg object-cover"
                        />
                    )}
                </div>
            </div>

        </div>

        <div className='divider' />
        <div className="container" data-color-mode="light">
            <MDEditor
                value={post?.content}
                onChange={(value) => {
                    const content = value || "";
                    const plain = content.replace(/[#>*`\[\]\(\)!-]/g, "");
                    setWordCount(plain.trim().split(/\s+/).length);

                    setPost(prev => prev ? { ...prev, content } : prev);
                }}

            />
        </div>

        <div className='divider' />
        <div className="flex">
            <button className="btn btn-primary ml-auto" onClick={savePost}>Save</button>
        </div>
        <div id="toast-root" className="toast toast-end"></div>

    </div>
}