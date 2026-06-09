import { renderBlogs } from "./blogs-card.js";

const searchBlogInput = document.getElementById("search-blog-input");

let searchTimer = null;

export const initSearchBlog = () => {
    if (!searchBlogInput) return;

    searchBlogInput.addEventListener("input", () => {
        clearTimeout(searchTimer);

        searchTimer = setTimeout(() => {
            const query = searchBlogInput.value;
            renderBlogs(query);
        }, 300);
    });
};