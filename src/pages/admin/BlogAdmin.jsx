import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "/api";

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

const BlogAdmin = ({ token, onSuccess }) => {
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    imageUrl: "",
    altText: "",
    category: "",
  });

  const [editingBlog, setEditingBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`https://dc-premier-limousine-backend-api.vercel.app/api/blogs`,{
        headers: getHeaders(token),
      });
      console.log(response.data);
      setBlogs(response.data);
    } catch (err) {
      setError("Failed to fetch blogs");
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://dc-premier-limousine-backend-api.vercel.app/api/blogs`, blogForm, {
        headers: getHeaders(token),
      });
      setBlogForm({
        title: "",
        content: "",
        imageUrl: "",
        altText: "",
        category: "",
      });
      onSuccess("Blog post added successfully!");
    } catch (err) {
      setError("Failed to add blog post");
    }
  };

  const handleEditBlog = (index) => {
    setEditingBlog(index);
    setBlogForm(blogs[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://dc-premier-limousine-backend-api.vercel.app/api/blogs/${blogs[editingBlog]._id}`,
        blogForm,
        { headers: getHeaders(token) }
      );
      setEditingBlog(null);
      setBlogForm({
        title: "",
        content: "",
        imageUrl: "",
        altText: "",
        category: "",
      });
      onSuccess("Blog post updated successfully!");
    } catch (err) {
      setError("Failed to update blog post");
    }
  };

  const handleDeleteBlog = async (index) => {
    try {
      await axios.delete(`https://dc-premier-limousine-backend-api.vercel.app/api/blogs/${blogs[index]._id}`, {
        headers: getHeaders(token),
      });
      onSuccess("Blog post deleted successfully!");
    } catch (err) {
      setError("Failed to delete blog post");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          {editingBlog !== null ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>
        <form
          onSubmit={editingBlog !== null ? handleUpdateBlog : handleAddBlog}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
              <div>
                <label
                  htmlFor="blog-title"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="blog-title"
                  value={blogForm.title}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="blog-image"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="blog-image"
                  value={blogForm.imageUrl}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
              <div>
                <label
                  htmlFor="blog-altText"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Alt Text
                </label>
                <input
                  type="text"
                  id="blog-altText"
                  value={blogForm.altText}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, altText: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="blog-category"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Category
                </label>
                <select
                  id="blog-category"
                  value={blogForm.category}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Weddings">Weddings</option>
                  <option value="Business">Business</option>
                  <option value="Travel">Travel</option>
                  <option value="Guide">Guide</option>
                  <option value="Trends">Trends</option>
                  <option value="Insider">Insider</option>
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="blog-content"
                className="block text-[#AAAAAA] mb-2"
              >
                Description
              </label>
              <textarea
                id="blog-content"
                value={blogForm.content}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, content: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                rows="6"
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            {editingBlog !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingBlog(null);
                  setBlogForm({
                    title: "",
                    content: "",
                    imageUrl: "",
                    altText: "",
                    category: "",
                  });
                }}
                className="mr-2 bg-[#626262] text-white py-2 px-4 rounded-md hover:bg-[#AAAAAA] transition duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
            >
              {editingBlog !== null ? "Update Post" : "Add Post"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          Current Blog Posts
        </h2>
        <div className="space-y-6">
  {Array.isArray(blogs) && blogs.map((blog, index) => (
    <div key={blog._id} className="flex flex-col sm:flex-row gap-4 bg-[#1A1A1A] p-4 rounded-lg border border-[#626262] hover:bg-[#262626] transition-colors">
      {/* Blog Thumbnail - Using imageUrl from your data */}
      <div className="w-full sm:w-1/3 lg:w-1/4 relative">
        <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-[#262626]">
          <img 
            src={blog.imageUrl} 
            alt={blog.altText || blog.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyNjI2MjYiLz48dGV4dCB4PSIwLjUiIHk9IjAuNSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMC4yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI0FBQUFBQSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+'
            }}
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {blog.category}
          </div>
        </div>
      </div>

      {/* Blog Content - Using only provided fields */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[#FFD700] font-medium text-lg mb-1 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-400 text-sm mb-2">
          {blog.date}
        </p>
        <p className="text-[#AAAAAA] text-sm line-clamp-3 mb-4">
          {blog.content}
        </p>
        
        {/* Static Admin Info (since author isn't in your data) */}
        <div className="flex items-center mt-auto">
          <div className="w-8 h-8 rounded-full bg-[#626262] mr-2 flex items-center justify-center text-xs text-white">
            A
          </div>
          <span className="text-gray-300 text-sm">
            Admin
          </span>
        </div>
      </div>

      {/* Action Buttons (unchanged from your original) */}
      <div className="flex sm:flex-col justify-end gap-2 sm:w-20">
        <button
          onClick={() => handleEditBlog(index)}
          className="text-[#FFD700] hover:text-[#FFE657] text-sm px-3 py-1 sm:px-2 sm:py-1 rounded bg-[#262626]"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteBlog(index)}
          className="text-red-500 hover:text-red-400 text-sm px-3 py-1 sm:px-2 sm:py-1 rounded bg-[#262626]"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default BlogAdmin;
