import { renderBlogs } from "./components/blogs-card.js";
import { initAddNewBlog } from "./components/add-new-blog.js";
import { initEditBlog } from "./components/edit-blog.js";

const addNewBlogButton = document.getElementById("add-new-blog");

if (addNewBlogButton) {
    addNewBlogButton.addEventListener("click", () => {
        window.location.href = "add-blog.html";
    });
}

renderBlogs();
initAddNewBlog();
initEditBlog();