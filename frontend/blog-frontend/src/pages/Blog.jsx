import { useEffect, useState, useContext } from 'react';  // agregué useContext
import axios from 'axios';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { ThemeContext } from '../context/ThemeContext';

export default function BlogListPage() {
  const { darkMode } = useContext(ThemeContext);  // obtenemos darkMode del contexto
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blogs/')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={darkMode ? 'bg-gray-900 min-h-screen w-full' : 'bg-white min-h-screen w-full'}>
      <Header />
      <div className="flex flex-col items-center gap-6 mt-6">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 animate-fade-in">
            Aún no se han posteado blogs.
          </p>
        ) : (
          blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        )}
      </div>
    </div>
  );
}




