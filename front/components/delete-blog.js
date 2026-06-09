import { renderBlogs } from "./blogs-card.js";

const BASE_API = "http://localhost:3000";

const blogsCard = document.getElementById("blogs-card");

export const deleteBlog = async (id) => {
    const response = await fetch(`${BASE_API}/blogs/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete blog");
    }

    return response.json();
};

export const initDeleteBlog = () => {
    if (!blogsCard) return;

    blogsCard.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest(".delete-blog-btn");

        if (!deleteButton) return;

        const blogId = deleteButton.dataset.blogId;

        if (!blogId) return;

        try {
            await deleteBlog(blogId);
            await renderBlogs();
        } catch (error) {
            console.error(error);
        }
    });
};