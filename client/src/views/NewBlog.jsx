import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { toast, Toaster } from 'react-hot-toast';

const BLOG_CATEGORIES = ["Technology", "Travel", "Food", "Lifestyle", "Fashion", "Sports"];

function NewBlog() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [status, setStatus] = useState('published');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      toast.error("Please login to create a blog");
      navigate('/login');
    }
  }, [navigate]);

  const saveBlog = async () => {
    // Validation
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }
    if (!category) {
      toast.error("Category is required");
      return;
    }

    setLoading(true);
    try {
      // Get token from localStorage
      const logged = JSON.parse(localStorage.getItem("loggedInUser"));
      const token = logged?.token;

      if (!token) {
        toast.error("Authentication required. Please login again.");
        navigate('/login');
        setLoading(false);
        return;
      }

      console.log("Creating blog with token:", token);
      console.log("Blog data:", { title, content, category, status });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title: title.trim(),
          content: content.trim(),
          category,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Response:", response.data);

      if (response?.data?.success) {
        toast.success("Blog created successfully!");
        setTimeout(() => {
          navigate('/blogs');
        }, 1500);
      } else {
        toast.error(response?.data?.message || "Failed to create blog");
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || error.message || "Failed to create blog");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Create New Blog</h1>

      <input
        type="text"
        placeholder='Blog Title'
        className='border p-3 w-full my-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='flex gap-4 my-4'>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <MarkdownEditor
        value={content}
        height='500px'
        onChange={(value) => setContent(value)}
        className='my-4'
      />

      <div className='flex gap-4 mt-4'>
        <button 
          className='bg-green-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold'
          type="button"
          onClick={saveBlog}
          disabled={loading}
        >
          {loading ? 'Creating Blog...' : 'Create Blog'}
        </button>

        <button 
          className='bg-gray-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-600 transition font-semibold'
          type="button"
          onClick={() => navigate('/blogs')}
          disabled={loading}
        >
          Cancel
        </button>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default NewBlog;