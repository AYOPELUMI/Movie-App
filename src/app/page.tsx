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
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const { data: genreData } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState<number | null>(genreData ? genreData[0].id : null);
  const { data: movies, isLoading, error, hasNextPage, fetchNextPage } = useAllMovies();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (movies) {
      const seenMovieIds = new Set();
      const allMovies = movies.pages.flat().filter(movie => {
        const isUnique = !seenMovieIds.has(movie.id);
        if (isUnique) {
          seenMovieIds.add(movie.id); // Mark this movie as seen
        }

        return isUnique;
      });
      setAllMovies(allMovies);
    }
  }, [movies]);

  useEffect(() => {
    if (genreData) {
      console.log({ genreData });
    }
  }, [genreData]);

  // Filter logic
  const filterMovies = () => {
    const seenMovieIds = new Set();
    return allMovies.filter(movie => {
      const matchesSearch = searchTerm != "" ? movie.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const matchesGenres = selectedGenres ? movie.genre_ids.includes(selectedGenres) : true;
      const isUnique = !seenMovieIds.has(movie.id);
      if (isUnique) {
        seenMovieIds.add(movie.id); // Mark this movie as seen
      }

      return matchesSearch && matchesGenres && isUnique;
    });
  };

  // Debounced search and filter
  useEffect(() => {
    const debouncedFilter = _.debounce(() => {
      console.log(filterMovies())
      setFilteredMovies(filterMovies());
    }, 300);

    debouncedFilter();
    return () => debouncedFilter.cancel();
  }, [searchTerm, selectedGenres, allMovies]);

  // Handle genre selection
  const toggleGenre = (genreId: number) => {
    if (selectedGenres == genreId) {
      setSelectedGenres(null)
    }
    else {

      setSelectedGenres(genreId);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-[#658292] via-[#6d7076] via-[#9f9c8d] to-[#9f9d8f]">
      <header className="flex justify-between items-center mb-4 p-4 pt-10">
        <h1 className="text-3xl font-bold">Movie App</h1>

        <input
          type="text"
          placeholder="Search..."
          className=" p-2 bg-transparent text-white outline-0 border-0 border-b-2 placeholder:text-white"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Link href={'favourites'}>Favorites</Link>

      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='overflow-x-hidden  flex flex-col gap-4 h-full'

      >
        <div className='h-20 w-full'>

          <nav className="flex space-x-4 mb-4 overflow-x-scroll h-20 px-4 w-full">
            {genreData?.map((genre: Genre) => (
              <button
                key={genre.id}
                className={`h-fit border-none outline-0 px-4 py-3 rounded-lg text-sm leading-3 text-nowrap ${selectedGenres == genre.id ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
                  }`}
                onClick={() => toggleGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </nav>
        </div>

        <h2 className="text-2xl font-semibold mb-2 px-4">{selectedGenres ? genreData?.find((genre: Genre) => genre.id == selectedGenres).name : "All"} Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 backdrop-blur-xl p-4">
          {isLoading ?
            Array(6) // Render 6 skeletons
              .fill(0)
              .map((_, idx) => (
                <MovieCardSkeleton key={idx} />
              ))
            :
            filteredMovies.map(movie => (
              <MovieCard key={movie.id + movie.title} movie={movie} />
            ))}

          {isLoading && <MovieCardSkeleton />}
          {hasNextPage && <div ref={ref} className="h-10" />}
        </div>
      </motion.div>

    </div>
  );
}
