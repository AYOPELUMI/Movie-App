
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import { motion } from 'framer-motion';

// Mock Data (Can replace with data from an API)
const movies = [
  { title: 'Loetoeng Kasarung', year: 2023, rating: 7.8, category: 'Animation' },
  { title: 'Gajah Langka', year: 2023, rating: 6.0, category: 'Animation' },
  { title: 'Si Kang Satay', year: 2023, rating: 7.1, category: 'Animation' },
  { title: 'Mommy Cat', year: 2023, rating: 7.8, category: 'Animation' },
  { title: 'Hijaber Cantik', year: 2023, rating: 6.1, category: 'Animation' },
  { title: 'Xatra - X', year: 2022, rating: 6.5, category: 'Animation' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedCategory, setSelectedCategory] = useState('Trending');

  useEffect(() => {
    const debouncedSearch = _.debounce(() => {
      const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'Trending' || movie.category === selectedCategory)
      );
      setFilteredMovies(results);
    }, 300);

    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Flix.id</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Image
            src="/profile.jpg" // Replace with actual profile image URL
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full ml-4"
          />
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="flex space-x-4 mb-4">
          {['Trending', 'Action', 'Romance', 'Animation', 'Horror', 'Special', 'Drakor'].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <h2 className="text-2xl font-semibold mb-2">Trending in {selectedCategory}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMovies.map(movie => (
            <motion.div
              key={movie.title}
              className="p-2 border rounded shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <Image
                  src={`/images/${movie.title.replace(/\s+/g, '-').toLowerCase()}.jpg`} // Mock image URL
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-t-lg"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.year} • {movie.rating} &#9733;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
