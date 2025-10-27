import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./../util";
import axios from "axios";
import BlogCard from "../components/BlogCard";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/blogs?status=published`;
      if (user && user._id) {
        url = `${import.meta.env.VITE_API_URL}/blogs?author=${user._id}`;
      }
      const response = await axios.get(url);
      setBlogs(response.data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Set user when component mounts
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Fetch blogs when user changes
  useEffect(() => {
    fetchBlogs();
  }, [user]);

  // Refetch blogs when returning to page
  useEffect(() => {
    window.addEventListener('focus', fetchBlogs);
    return () => window.removeEventListener('focus', fetchBlogs);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      <p className="text-lg mb-6">
        {user ? `Hello ${user.name}!` : `Welcome Guest!`}
      </p>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => {
          const {
            _id,
            title,
            content,
            author,
            publishedAt,
            updatedAt,
            status,
            category,
            slug,
          } = blog;

          return (
            <BlogCard
              key={_id}
              title={title}
              content={content}
              author={author}
              publishedAt={publishedAt}
              updatedAt={updatedAt}
              status={status}
              category={category}
              slug={slug}
            />
          );
        })
      ) : (
        <p className="text-gray-600">No blogs found.</p>
      )}
    </div>
  );
}

export default AllBlogs;