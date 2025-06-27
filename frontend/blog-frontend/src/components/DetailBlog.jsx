import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  // Consumir el contexto para obtener darkMode
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/blogs/${id}/`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) return <div className="p-6">Cargando...</div>;

  return (
    <div className={`p-6 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Imagen grande */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded-lg mb-6 object-cover"
        />
      )}

      {/* Título, autor, tags y rating */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-pink-900'}`}>{blog.title}</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Autor: {blog.author}</p>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-pink-100 text-pink-700 text-sm font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Rating a la derecha */}
        <div className={`font-semibold text-lg ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>
          ⭐ 
        </div>
      </div>

      {/* Contenido */}
      <div className={`text-sm line-clamp-3 ${darkMode ? 'text-gray-200' : 'text-pink-900'}`}>
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetailPage;
