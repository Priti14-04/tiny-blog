import { useState, useEffect } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { BLOG_CATEGORIES } from './../constants';
import axios from 'axios';
import { getCurrentUser } from './../util';
import toast, { Toaster } from 'react-hot-toast';

function NewBlog() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light');
    setUser(getCurrentUser());
  }, []);

  const saveBlog = async () => {
    if (!title || !content) {
      toast.error('Please enter title and content!');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, {
        title,
        content,
        category,
        author: user?._id,
      });

      if (response?.data?.success) {
        toast.success('✅ Blog Saved Successfully!', {
          duration: 2000,
          position: 'top-center',
        });

        // Redirect after 2 seconds to AllBlogs
        setTimeout(() => {
          window.location.href = '/AllBlogs';
        }, 2000);
      } else {
        toast.error('Something went wrong while saving.');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Server error! Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      {/* Toaster on top-center */}
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-4 text-orange-600">✍️ New Blog</h1>

      <input
        type="text"
        placeholder="Enter Blog Title"
        className="border border-gray-300 rounded-md p-3 w-full my-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 p-3 rounded-md my-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {BLOG_CATEGORIES.map((cate) => (
          <option key={cate} value={cate}>
            {cate}
          </option>
        ))}
      </select>

      <MarkdownEditor
        value={content}
        height="500px"
        onChange={(value) => {
          setContent(value);
        }}
      />

      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 mt-6 rounded-lg shadow-md transition-all"
        type="button"
        onClick={saveBlog}
      >
        💾 Save Blog
      </button>
    </div>
  );
}

export default NewBlog;
