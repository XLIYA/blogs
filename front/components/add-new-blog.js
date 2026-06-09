const BASE_API = "http://localhost:3000";

const addBlogForm = document.getElementById("add-blog-form");

// add blog inputs
const blogTitle = document.getElementById("blog-title");
const blogImageUrl = document.getElementById("blog-image-url");
const blogDescription = document.getElementById("blog-description");

// create blog api
export const createBlog = async (blogData) => {
    const response = await fetch(`${BASE_API}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
    });

    if (!response.ok) {
        throw new Error("Failed to create blog");
    }

    return response.json();
};

export const initAddNewBlog = () => {
    if (!addBlogForm) return;

    addBlogForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = blogTitle.value.trim();
        const image_url = blogImageUrl.value.trim();
        const description = blogDescription.value.trim();

        if (!title || !image_url || !description) {
            alert("Please fill all fields");
            return;
        }

        const newBlog = {
            title,
            description,
            image_url,
            published_at: new Date().toISOString()
        };

        try {
            await createBlog(newBlog);

            window.location.href = "index.html";

        } catch (error) {
            console.error(error);
            alert("Failed to save blog");
        }
    });
};