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
