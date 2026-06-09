const BASE_API = "http://localhost:3000";

const blogsCard = document.getElementById("blogs-card");

export const getBlogs = async () => {
    const response = await fetch(`${BASE_API}/blogs`);

    if (!response.ok) {
        throw new Error("Failed to get blogs");
    }

    return response.json();
};

export const getBlogById = async (id) => {
    const response = await fetch(`${BASE_API}/blogs/${id}`);

    if (!response.ok) {
        throw new Error("Blog not found");
    }

    return response.json();
};

const filterBlogs = (blogs, query) => {
    const searchValue = query.trim().toLowerCase();

    if (!searchValue) {
        return blogs;
    }

    return blogs.filter((blog) => {
        const title = blog.title.toLowerCase();
        const description = blog.description.toLowerCase();
        const publishedAt = blog.published_at.toLowerCase();

        return (
            title.includes(searchValue) ||
            description.includes(searchValue) ||
            publishedAt.includes(searchValue)
        );
    });
};

export const renderBlogs = async (query = "") => {
    if (!blogsCard) return;

    try {
        const blogs = await getBlogs();

        const filteredBlogs = filterBlogs(blogs, query);

        if (filteredBlogs.length === 0) {
            blogsCard.innerHTML = `
                <p class="text-slate-300 text-2xl font-bold col-span-full">
                    No blogs found.
                </p>
            `;
            return;
        }

        let blogsHTML = "";

        filteredBlogs.forEach((blog) => {
            blogsHTML += `
                <div class="
                    bg-slate-700/80 
                    border border-slate-600 
                    rounded-3xl 
                    p-6 
                    min-h-[260px] 
                    flex 
                    flex-col 
                    justify-between 
                    shadow-lg
                ">

                    <div class="space-y-4">

                        <h2 class="text-3xl font-bold text-white">
                            ${blog.title}
                        </h2>

                        <p class="text-slate-300 text-lg line-clamp-2">
                            ${blog.description}
                        </p>

                    </div>

                    <div class="space-y-4 mt-8">

                        <p class="text-slate-400 font-semibold">
                            ${blog.published_at}
                        </p>

                        <div class="flex gap-3">

                            <a
                                href="blog-details.html?id=${blog.id}"
                                class="px-5 py-2 rounded-xl bg-slate-500 text-white font-semibold hover:bg-slate-400 transition"
                            >
                                Read More
                            </a>

                            <a
                                href="edit-blog.html?id=${blog.id}"
                                class="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold hover:scale-105 transition"
                            >
                                Edit
                            </a>

                        </div>

                    </div>

                </div>
            `;
        });

        blogsCard.innerHTML = blogsHTML;

    } catch (error) {
        console.error(error);
    }
};