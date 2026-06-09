import { getBlogById } from "./blogs-card.js";

const BASE_API = "http://localhost:3000";

const editBlogForm = document.getElementById("edit-blog-form");

const blogTitle = document.getElementById("blog-title");
const blogImageUrl = document.getElementById("blog-image-url");
const blogDescription = document.getElementById("blog-description");

const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

let currentBlog = null;

export const updateBlog = async (id, blogData) => {
    const response = await fetch(`${BASE_API}/blogs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
    });

    if (!response.ok) {
        throw new Error("Failed to update blog");
    }

    return response.json();
};

export const initEditBlog = async () => {
    if (!editBlogForm) return;

    if (!blogId) {
        alert("Blog id is missing");
        window.location.href = "index.html";
        return;
    }

    try {
        currentBlog = await getBlogById(blogId);

        blogTitle.value = currentBlog.title;
        blogImageUrl.value = currentBlog.image_url;
        blogDescription.value = currentBlog.description;

    } catch (error) {
        console.error(error);
        alert("Blog not found");
        window.location.href = "index.html";
        return;
    }

    editBlogForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = blogTitle.value.trim();
        const image_url = blogImageUrl.value.trim();
        const description = blogDescription.value.trim();

        if (!title || !image_url || !description) {
            alert("Please fill all fields");
            return;
        }

        const updatedBlog = {
            ...currentBlog,
            title,
            image_url,
            description,
        };

        try {
            await updateBlog(blogId, updatedBlog);

            window.location.href = "index.html";

        } catch (error) {
            console.error(error);
            alert("Failed to update blog");
        }
    });
};