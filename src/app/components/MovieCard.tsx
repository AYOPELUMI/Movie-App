'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Movie } from '../types/MovieType';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/movies/${movie.id}`); // Navigates to the dynamic page
    };

    return (
        <motion.div
            className=" rounded-lg bg-white/10  drop-shadow-lg shadow-xl  backdrop-blur-xl cursor-pointer flex flex-col gap-2 "
            whileHover={{ scale: 0.95 }}
            onClick={handleCardClick} // Handle click to navigate
        >
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="rounded-t-2xl  object-cover max-h-[300px] w-full "
                />
            </div>
            <div className=" p-4 pb-2 flex flex-col gap-1.5 justify-start ">
                <h3 className="text-lg font-bold text-wrap">{movie.title}</h3>
                <div className="text-sm text-white flex flex-col gap-1.5 items-start flex-wrap">Release Date: {movie.release_date} • <p> Rating: &#9733; {movie.vote_average}</p></div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
