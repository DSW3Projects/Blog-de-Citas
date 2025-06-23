import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blogs/')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  // Función para calcular rating promedio
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Todos los blogs
      </h1>

      <div className="grid gap-6">
        {blogs.length === 0 && (
          <p className="text-center text-gray-500 animate-fade-in">Aún no se han posteado blogs.</p>
        )}

        {blogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-700 ease-in-out text-gray-900"
          >
            {/* Imagen con ratio 16:9 */}
            {blog.image && (
              <div className="w-full aspect-[16/9] mb-4 overflow-hidden rounded-xl">
                <img
                  src={blog.image}
                  alt={`Imagen de ${blog.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            {/* Título con link */}
            <h2 className="text-xl font-semibold mb-2">
              <Link
                to={`/blogs/${blog.id}`}
                className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
              >
                {blog.title}
              </Link>
            </h2>

            {/* Autor y fecha */}
            <div className="flex items-center space-x-3 mb-2">
              <Link to={`/perfil/${blog.author.username}`}>
                {blog.author.profile_image ? (
                  <img
                    src={blog.author.profile_image}
                    alt={`Avatar de ${blog.author.username}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-pink-400 shadow-sm hover:ring-2 hover:ring-pink-500 transition"
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${blog.author.username}&background=random&color=fff&size=64`}
                    alt={`Avatar generado de ${blog.author.username}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-pink-400 shadow-sm hover:ring-2 hover:ring-pink-500 transition"
                  />
                )}
              </Link>
              <p className="text-sm text-gray-500">
                by <span className="font-medium text-pink-500">{blog.author.username}</span> —{' '}
                {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Rating */}
            <p className="mt-2 text-sm">
              <strong>Rating: </strong>
              {getAverageRating(blog.reviews) ? (
                <>
                  {getAverageRating(blog.reviews)} / 5 ❤️
                </>
              ) : (
                'No hay reviews'
              )}
            </p>

            {/* Tags */}
            <p className="text-sm mt-1">
              <strong>Tags: </strong>
              {blog.tags && blog.tags.length > 0 ? (
                blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full mr-1"
                  >
                    {tag.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No tiene etiquetas</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;



