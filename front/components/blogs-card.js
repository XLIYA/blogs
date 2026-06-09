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
                        <div class="col-span-full flex min-h-[500px] items-center justify-center">
                            <div class="w-full max-w-xl rounded-3xl border border-slate-600 bg-slate-700/70 p-10 text-center shadow-2xl">

                                <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-600/80">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 text-cyan-400">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                        <path d="M8 11h6"></path>
                                    </svg>
                                </div>

                                <h2 class="mb-3 text-3xl font-extrabold text-white">
                                    No blogs found
                                </h2>

                                <p class="mx-auto max-w-md text-lg leading-8 text-slate-300">
                                    We couldn’t find any blog matching your search. Try another keyword.
                                </p>

                            </div>
                        </div>
                `;
            return;
        }

        let blogsHTML = "";

        filteredBlogs.forEach((blog) => {
            blogsHTML += `
                        <div
                            class=" bg-slate-700/80 border border-slate-600  rounded-3xl p-6  min-h-[260px] flex flex-col justify-between shadow-lg">

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

                                <div class="flex flex-col gap-3 sm:flex-row">

                                    <a href="blog-details.html?id=${blog.id}"
                                        class="w-full rounded-xl bg-slate-500 px-5 py-2 text-center font-semibold text-white transition hover:bg-slate-400 sm:w-auto">
                                        Read More
                                    </a>

                                    <a href="edit-blog.html?id=${blog.id}"
                                        class="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 px-5 py-2 text-center font-semibold text-white transition hover:scale-105 sm:w-auto">
                                        Edit
                                    </a>

                                    <button type="button" data-blog-id="${blog.id}"
                                        class="delete-blog-btn w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-2 text-center font-semibold text-white transition hover:scale-105 sm:w-auto">
                                        Delete
                                    </button>

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