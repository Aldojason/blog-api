import { useEffect, useState } from "react";
import { api } from "./api";
import type { Post } from "./types";

type EditingState = {
  id: number | null;
  title: string;
  content: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState<EditingState>({
    id: null,
    title: "",
    content: "",
  });
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create post
  const createPost = async () => {
    if (!title || !content) return alert("Enter title & content");
    try {
      const res = await api.post("/posts", { title, content });
      setPosts([res.data, ...posts]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  // Delete post
  const deletePost = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  // Start editing
  const startEdit = (post: Post) => {
    setEditing({ id: post.id, title: post.title, content: post.content });
  };

  const cancelEdit = () => {
    setEditing({ id: null, title: "", content: "" });
  };

  // Save edited post
  const saveEdit = async () => {
    if (!editing.title || !editing.content) {
      return alert("Title & content required");
    }
    if (editing.id === null) return;

    try {
      const res = await api.put(`/posts/${editing.id}`, {
        title: editing.title,
        content: editing.content,
      });

      setPosts((prev) =>
        prev.map((p) => (p.id === res.data.id ? res.data : p))
      );
      cancelEdit();
    } catch (err) {
      alert("Failed to update post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // -------------------------------
  // SEARCH + PAGINATION
  // -------------------------------
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const paginatedPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center py-12 px-4">
      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8 drop-shadow">
        Modern Blog App ✨
      </h1>

      {/* CREATE POST CARD */}
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 mb-10 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create a New Post
        </h2>

        <input
          className="w-full mb-3 px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          placeholder="Write your content..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button
          onClick={createPost}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Publish Post 🚀
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white shadow-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
        />
      </div>

      {/* POSTS LIST */}
      <div className="w-full max-w-xl space-y-5">
        {paginatedPosts.length === 0 && (
          <p className="text-gray-600 text-center">No posts found…</p>
        )}

        {paginatedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg hover:shadow-2xl transition rounded-2xl p-6 border border-gray-200 hover:-translate-y-1"
          >
            {editing.id === post.id ? (
              <>
                {/* EDIT MODE */}
                <input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((s) => ({ ...s, title: e.target.value }))
                  }
                  className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                />
                <textarea
                  value={editing.content}
                  onChange={(e) =>
                    setEditing((s) => ({ ...s, content: e.target.value }))
                  }
                  rows={4}
                  className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                />

                <div className="flex gap-3">
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* VIEW MODE */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-700 mb-3">{post.content}</p>

                <small className="text-gray-500 block mb-4">
                  {new Date(post.createdAt).toLocaleString()}
                </small>

                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(post)}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
                  >
                    Edit ✏️
                  </button>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Delete ❌
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentPage === page
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
