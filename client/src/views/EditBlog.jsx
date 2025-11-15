import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
      const blog = res.data?.data;

      if (!blog) {
        toast.error("Blog not found");
        navigate('/blogs');
        return;
      }

      setTitle(blog.title || "");
      setContent(blog.content || "");
      setCategory(blog.category || BLOG_CATEGORIES[0]);
      setStatus(blog.status || "draft");
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error.response?.data);
      toast.error("Failed to fetch blog");
      navigate('/blogs');
      setLoading(false);
    }
  };

  const updateBlog = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content required");
      return;
    }

    setSaving(true);
    try {
      const logged = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      const token = logged?.token;

      if (!token) {
        toast.error("Please login first");
        navigate('/login');
        setSaving(false);
        return;
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        {
          title: title.trim(),
          content: content.trim(),
          category,
          status
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (res.data?.success) {
        toast.success("Blog updated!");
        navigate('/blogs');
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

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
        <select value={category} onChange={(e) => setCategory(e.target.value)} className='border p-2 rounded'>
          {BLOG_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className='border p-2 rounded'>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <MarkdownEditor value={content} height='500px' onChange={(val) => setContent(val)} />

      <button 
        className='bg-blue-500 text-white px-4 py-2 mt-4 rounded disabled:opacity-50'
        onClick={updateBlog}
        disabled={saving}
      >
        {saving ? 'Updating...' : 'Update Blog'}
      </button>

      <Toaster />
    </div>
  );
}

export default EditBlog;