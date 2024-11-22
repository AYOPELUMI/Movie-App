'use client';
import { useState, useEffect } from 'react';

import { debounce } from 'lodash'
import { motion } from 'framer-motion';
import MovieCard from './components/MovieCard';
import { Movie } from './types/MovieType';
import useAllMovies, { useMovies } from './Hooks/fetchMovies';
import { Genre } from './types/GenresType';
import MovieCardSkeleton from './components/MovieCardSkeleton';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { MdOutlineFavorite, MdSearch } from 'react-icons/md';
import useGenres from './Hooks/fetchGenres';
interface Props {
  movies: Movie[],
  genreData: Genre[]
}
export default function MovieFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number | null>(null);
  const { data: genreData } = useGenres();
  const [reorderedGenres, setReorderedGenres] = useState<Genre[]>(genreData || []);
  const { ref, inView } = useInView();
  const { data: movies, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useAllMovies();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (movies) {
      const seenMovieIds = new Set();
      const allMovies = movies.pages.flat().filter((movie: { id: unknown; }) => {
        const isUnique = !seenMovieIds.has(movie.id);
        if (isUnique) {
          seenMovieIds.add(movie.id); // Mark this movie as seen
        }

        return isUnique;
      });
      setAllMovies(allMovies);
    }
  }, [movies]);


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

  useEffect(() => {
    // Reorder the genre list whenever the selected genre changes
    if (selectedGenres) {
      const selectedGenreIndex = genreData?.findIndex((genre: { id: number; }) => genre.id === selectedGenres);
      if (selectedGenreIndex !== undefined && selectedGenreIndex !== -1) {
        const reorderedList = [
          genreData[selectedGenreIndex], // Put the selected genre first
          ...genreData.slice(0, selectedGenreIndex),
          ...genreData.slice(selectedGenreIndex + 1),
        ];
        setReorderedGenres(reorderedList); // Update the reordered genreData list
      }
    } else {
      setReorderedGenres(genreData || []); // Revert to the original list when no genre is selected
    }
  }, [selectedGenres, genreData]);

  // Debounced search and filter
  useEffect(() => {
    const debouncedFilter = debounce(() => {
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
  console.log({ isLoading })

  return (
    <>
      <head>
        <title>Movies </title>
        <link rel="icon" href="/favicon.ico"></link>
      </head>
      <body>
        <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-[#658292] via-[#6d7076] via-[#9f9c8d] to-[#9f9d8f]">
          <header className="flex justify-between items-center gap-2 md:gap-4 mb-4 p-4 pt-10">
            <h1 className=" text-lg md:text-2xl lg:text-3xl font-bold shrink-0 text-white">Movie App</h1>

            <div className="w-fit flex items-center border-b-2 border-white relative transition-all duration-300 ease-in-out focus-within:max-w-full">
              <input
                type="text"
                className="w-10 sm:w-40 md:w-40 h-full bg-transparent placeholder:text-white text-white outline-none text-lg px-1 md:px-4 transition-all duration-300 focus:w-full focus:px-4"
                placeholder="Search..."
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <MdSearch className="flex-shrink-0 text-2xl text-white cursor-pointer transition-transform duration-300" />
            </div>



            <Link href={'favourites'} className='border backdrop-blur-sm py-2 px-4 flex items-center gap-3 rounded-md text-sm'><MdOutlineFavorite /> <p className='hidden md:block'>Favorites</p></Link>

          </header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='overflow-hidden  flex flex-col gap-4 h-full w-full'

          >
            <div className="h-20 w-full">
              <nav className="flex space-x-4 mb-4 overflow-x-scroll h-20 px-4 w-full">
                {reorderedGenres?.map((genre: Genre) => (
                  <button
                    key={genre.id}
                    className={`h-fit border-none outline-0 px-4 py-3 rounded-lg text-sm leading-3 text-nowrap ${selectedGenres === genre.id ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'}`}
                    onClick={() => toggleGenre(genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
              </nav>
            </div>


            <h2 className="text-2xl font-semibold mb-2 px-4">{selectedGenres ? genreData?.find((genre: Genre) => genre.id == selectedGenres).name : "All"} Movies</h2>
            <div className="grid  md:grid-cols-3 lg:grid-cols-5  gap-4 backdrop-blur-xl p-4 overflow-y-scroll h-ful w-fulll">
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
      </body>
    </>
  );
}
