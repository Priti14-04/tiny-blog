import { useLocation, Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

function ReadBlog() {
  const { state } = useLocation();
  const blog = state?.blog || JSON.parse(localStorage.getItem("selectedBlog"));

  // Save blog in localStorage for refresh persistence
  if (blog) {
    localStorage.setItem("selectedBlog", JSON.stringify(blog));
  }

  if (!blog) {
    return (
      <div className="p-6 text-center text-red-500">
        No blog data found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>

      <div className="flex items-center gap-4 mb-6">
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-400 text-white font-semibold text-xl">
          {blog.author?.name?.substring(0, 1)}
        </span>

        <div>
          <p className="font-semibold">{blog.author?.name}</p>
          <p className="text-sm text-gray-600">{blog.author?.email}</p>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        Published on {new Date(blog.publishedAt).toLocaleString()}
      </div>

      <div className="mb-6">
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm">
          {blog.category}
        </span>
      </div>

      <div className="prose max-w-none border-t pt-6">
        <MarkdownPreview source={blog.content} />
      </div>

      <div className="mt-8">
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default ReadBlog;
