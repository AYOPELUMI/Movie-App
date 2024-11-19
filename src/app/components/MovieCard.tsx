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
            key={movie.title}
            className=" border rounded-lg  shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={handleCardClick} // Handle click to navigate
        >
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="rounded-t-lg  object-cover"
                />
            </div>
            <div className="mt-2 p-2">
                <h3 className="text-lg font-bold text-wrap">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.release_date} • {movie.vote_average} &#9733;</p>
            </div>
        </motion.div>
    );
};

export default MovieCard;
