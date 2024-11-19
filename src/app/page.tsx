'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import { motion } from 'framer-motion';
import MovieCard from './components/MovieCard';
import { Movie } from './types/MovieType';
import useAllMovies, { useMovies } from './Hooks/fetchMovies';
import queryClient from '@/lib/react-query-client';
import { QueryClientProvider } from 'react-query';
import useGenres from './Hooks/fetchGenres';
import { Genre } from './types/GenresType';
import FullScreenSpinner from './components/Spinner';
import MovieCardSkeleton from './components/MovieCardSkeleton';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const { data: genreData } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState<number | null>(genreData ? genreData[0].id : null);
  const { data: movies, isLoading, error } = useAllMovies();

  useEffect(() => {
    if (movies) {
      setAllMovies(movies.pages.flat());
    }
  }, [movies]);

  useEffect(() => {
    if (genreData) {
      console.log({ genreData });
    }
  }, [genreData]);

  // Filter logic
  const filterMovies = () => {
    return allMovies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenres = selectedGenres ? movie.genre_ids.includes(selectedGenres) : true;

      return matchesSearch && matchesGenres;
    });
  };

  // Debounced search and filter
  useEffect(() => {
    const debouncedFilter = _.debounce(() => {
      setFilteredMovies(filterMovies());
    }, 300);

    debouncedFilter();
    return () => debouncedFilter.cancel();
  }, [searchTerm, selectedGenres, allMovies]);

  // Handle genre selection
  const toggleGenre = (genreId: number) => {
    setSelectedGenres(genreId);
  };

  return (
    <div className="flex flex-col w-screen h-screen p-4">
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
        className='overflow-x-hidden'

      >
        <nav className="flex space-x-4 mb-4 overflow-x-scroll ">
          {genreData?.map((genre: Genre) => (
            <button
              key={genre.id}
              className={` border-none outline-0 px-4 py-2 rounded-full text-sm leading-3 ${selectedGenres == genre.id ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
                }`}
              onClick={() => toggleGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </nav>

        <h2 className="text-2xl font-semibold mb-2">Trending Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4">
          {isLoading ?
            Array(6) // Render 6 skeletons
              .fill(0)
              .map((_, idx) => (
                <MovieCardSkeleton key={idx} />
              ))
            :
            filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </motion.div>

    </div>
  );
}
