import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function BlogCard({ blog }) {
  const { title, content, image, tags, rating } = blog;
  const { darkMode } = useContext(ThemeContext);

  const renderHearts = (rating) => {
    return [...Array(5)].map((_, i) => {
      if (i < Math.floor(rating)) {
        return <i key={i} className="fas fa-heart text-rose-500"></i>;
      } else if (i < rating) {
        return <i key={i} className="fas fa-heart text-rose-300"></i>; // Medio corazón (si no tienes FontAwesome Pro)
      } else {
        return <i key={i} className="fas fa-heart text-gray-300 dark:text-gray-600"></i>;
      }
    });
  };

  return (
    <div className={` ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden flex w-full max-w-4xl mx-auto my-4`}>
      <Link
        to={`/blogs/${blog.id}`}
        className="block hover:scale-[1.01] transition-transform duration-300 w-full"
      >
        <div className="flex w-full">
          <div className="w-1/3">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-2/3 p-4 relative">
            <div className="absolute top-2 right-2 flex space-x-1">
              {renderHearts(rating || 0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-rose-800 mb-2">
              {title}
            </h2>
            <p className={`text-sm line-clamp-3 ${darkMode ? 'text-white' : 'text-pink-900'}`}>
              {content}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

