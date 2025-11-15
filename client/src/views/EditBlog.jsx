import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCurrentUser } from '../util';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { toast, Toaster } from 'react-hot-toast';

const BLOG_CATEGORIES = ["Technology", "Travel", "Food", "Lifestyle", "Fashion", "Sports"];

function EditBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [status, setStatus] = useState("draft");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    setUser(getCurrentUser());
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
      const blog = response.data.data;

      if (!blog) {
        toast.error("Blog are found");
        return;
      }

      setTitle(blog.title);
      setContent(blog.content);
      setCategory(blog.category);
      setStatus(blog.status);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Blog not found");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch blog");
      }
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${slug}`, {
        title,
        content,
        category,
        status,
        author: user?._id
      });

      if (response?.data?.success) {
        toast.success("Blog Updated Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Edit Blog</h1>

      <input
        type="text"
        placeholder='Blog Title'
        className='border p-3 w-full my-4 rounded'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='flex gap-4 my-4'>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className='border p-2 rounded'
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
          className='border p-2 rounded'
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <MarkdownEditor
        value={content}
        height='500px'
        onChange={(value) => setContent(value)}
      />

      <button 
        className='bg-blue-500 text-white px-4 py-2 mt-4 rounded cursor-pointer hover:bg-blue-600 transition'
        type="button"
        onClick={updateBlog}
      >
        Update Blog
      </button>

      <Toaster />
    </div>
  );
}

export default EditBlog;
