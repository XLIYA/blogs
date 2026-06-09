const BASE_API = "http://localhost:3000";

const blogsCard = document.getElementById("blogs-card");


// to get te right fomat eof date in the design
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
};

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

export const renderBlogs = async () => {
    if (!blogsCard) return;

    try {
        const blogs = await getBlogs();

        let blogsHTML = "";

        blogs.forEach((blog) => {
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
                            ${formatDate(blog.published_at)}
                        </p>

                        <div class="flex gap-3">

                            <button
                                class="px-5 py-2 rounded-xl bg-slate-500 text-white font-semibold hover:bg-slate-400 transition"
                            >
                                Read More
                            </button>

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