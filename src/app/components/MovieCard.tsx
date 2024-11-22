'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Movie } from '../types/MovieType';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useFavoritesStore } from '@/Store/FavouriteStore';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const router = useRouter();
    const { addToFavorites, removeFromFavorites, favorites } = useFavoritesStore()

    const handleCardClick = () => {
        const query = `?title=${movie.title}&picture=${movie.poster_path}`;
        router.push(`/movies/${movie.id}`); // Navigates to the dynamic page
    };

    const handleFavorite = (event: React.MouseEvent<SVGElement>) => {
        event.stopPropagation();

        if (favorites.some((favmovie) => movie.id == favmovie.id)) {
            removeFromFavorites(movie.id)
        }
        else {
            addToFavorites(movie)
        }

    }

    return (
        <motion.div
            className=" rounded-lg bg-white/10  drop-shadow-lg shadow-xl  backdrop-blur-xl cursor-pointer flex flex-col gap-2 "
            whileHover={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={handleCardClick} // Handle click to navigate
        >
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="rounded-t-2xl  object-cover object-center md:object-bottom max-h-[300px] w-full"
                />
            </div>
            <div className=" p-2 md:p-4 pb-6 flex flex-col gap-1.5 justify-start text-white ">
                <div className='flex justify-between gap-3 md:gap-5'> <h3 className="text-lg font-bold break-all text-ellipsis md: text-wrap max-w-1/2">{movie.title}</h3>{favorites.some((favmovie) => movie.id == favmovie.id) ? <MdFavorite onClick={handleFavorite} className='size-6 shrink-0' /> : <MdFavoriteBorder onClick={handleFavorite} className='size-6 shrink-0' />}</div>
                <div className="text-sm text-white flex flex-col gap-1.5 items-start flex-wrap"><p>Release Date:</p> {movie.release_date} • <p> Rating: &#9733; {movie.vote_average}</p></div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
