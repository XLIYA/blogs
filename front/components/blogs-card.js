const BASE_API = "http://localhost:3000";

const blogsCard = document.getElementById("blogs-card");

export const renderBlogs = () => {
    fetch(`${BASE_API}/blogs`)
        .then(response => response.json())
        .then(result => {

            let blogsHTML = "";

            result.forEach(blog => {
                blogsHTML += `
                    <div class="
                        bg-slate-700/80 border border-slate-600 rounded-3xl p-6 min-h-[260px] flex flex-col justify-between shadow-lg">

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

                                <button
                                    class="px-5 py-2 rounded-xl bg-slate-500  text-white font-semibold hover:bg-slate-400 transition"
                                > 
                                    Read More
                                </button>

                                <button
                                    class="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold hover:scale-105 transition"
                                >
                                    Edit
                                </button>

                            </div>

                        </div>

                    </div>
                `;
            });

            blogsCard.innerHTML = blogsHTML;
        })
        .catch(err => console.error(err));
};

renderBlogs()