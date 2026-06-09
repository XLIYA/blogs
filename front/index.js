import { renderBlogs } from "./components/blogs-card.js";
import { initAddNewBlog } from "./components/add-new-blog.js";
import { initEditBlog } from "./components/edit-blog.js";
import { initBlogDetails, initBackButton } from "./components/blog-details.js";
import { initSearchBlog } from "./components/search-blog.js";

const addNewBlogButton = document.getElementById("add-new-blog");

if (addNewBlogButton) {
    addNewBlogButton.addEventListener("click", () => {
        window.location.href = "add-blog.html";
    });
}

renderBlogs();
initAddNewBlog();
initEditBlog();
initBlogDetails();
initBackButton();
initSearchBlog();