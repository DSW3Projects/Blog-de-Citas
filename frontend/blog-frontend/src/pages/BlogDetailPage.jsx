import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/blogs/${id}/`).then(res => setBlog(res.data));
  }, [id]);

  if (!blog) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-600 mb-4">Autor: {blog.author}</p>
      <img src={blog.image} alt={blog.title} className="mb-4 max-w-lg" />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetailPage;
