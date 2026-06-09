import { getBlogById } from "./blogs-card.js";

const backButton = document.getElementById("back-button");

const blogDetailTitle = document.getElementById("blog-detail-title");
const blogDetailDate = document.getElementById("blog-detail-date");
const blogDetailImage = document.getElementById("blog-detail-image");
const blogDetailDescription = document.getElementById("blog-detail-description");

const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

export const initBlogDetails = async () => {
    if (!blogDetailTitle) return;

    if (!blogId) {
        alert("Blog id is missing");
        window.location.href = "index.html";
        return;
    }

    try {
        const blog = await getBlogById(blogId);

        blogDetailTitle.textContent = blog.title;
        blogDetailDate.textContent = `Published: ${blog.published_at}`;
        blogDetailImage.src = blog.image_url;
        blogDetailImage.alt = blog.title;
        blogDetailDescription.textContent = blog.description;

    } catch (error) {
        console.error(error);
        alert("Blog not found");
        window.location.href = "index.html";
    }
};

export const initBackButton = () => {
    if (!backButton) return;

    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
};