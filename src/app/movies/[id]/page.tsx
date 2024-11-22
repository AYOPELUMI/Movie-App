'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMovieDetails, UseMovieCast } from '@/app/Hooks/fetchMovies';
import { Cast } from '@/app/types/CastType';
import { MdArrowBack } from 'react-icons/md';
import FullScreenSpinner from '@/app/components/Spinner';
import { MovieDetails } from '@/app/types/MovieDetailType';

export default function MovieDetailsPage() {
    const params = useParams();
    const { data } = useMovieDetails(Number(params.id));
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const { data: cast, isLoading } = UseMovieCast(Number(params.id));
    const router = useRouter();

    useEffect(() => {
        if (data) {
            setMovie(data);
        }
    }, [data]);
    const handleGoBack = () => {
        router.back(); // Navigates back to the previous page
    };

    console.log(`https://image.tmdb.org/t/p/w200${movie?.poster_path}`);
    return (
        <>
            <head>
                <title>{movie?.title}</title>
                <link rel="icon" href={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} sizes="any" />
            </head>
            <body>
                {isLoading && (<FullScreenSpinner />)}
                {!isLoading && (<div
                    className="relative w-screen min-h-screen bg-no-repeat bg-cover overflow-hidden md:p-4"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
                    }}
                >
                    {/* Dark Overlay for better readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>

                    {/* Main Content */}
                    <MdArrowBack className='size-6 text-white relative z-50 m-4' onClick={handleGoBack} />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative z-10 md:p-8 w-full flex flex-col md:flex-row items-center md:items-start gap-8"
                    >
                        {/* Poster */}
                        <motion.img
                            src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
                            alt={movie?.title}
                            className="md:rounded-xl shadow-lgm w-full md:w-1/3  object-cover"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        />

                        {/* Details */}
                        <div className="text-white">
                            <motion.h1
                                className="text-4xl font-bold px-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {movie?.title}
                            </motion.h1>
                            <motion.p
                                className="mt-4 text-lg leading-relaxed px-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                {movie?.overview}
                            </motion.p>
                            <motion.div
                                className="mt-6 px-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <p>
                                    <span className="font-semibold">Release Date:</span>{' '}
                                    {movie?.release_date}
                                </p>
                                <p>
                                    <span className="font-semibold">Rating:</span>{' '}
                                    {movie?.vote_average}/10
                                </p>
                                <p>
                                    <span className="font-semibold">Genres:</span>{' '}
                                    {movie?.genres.map((genre) => genre.name).join(', ')}
                                </p>
                            </motion.div>


                            {movie && (<div className='flex flex-col gap-5 mt-5'>
                                <h2 className='text-3xl font-medium text-white pl-4'>Movie Cast</h2>
                                <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-wrap gap-2 gap-y-4 pb-20'>
                                    {cast?.map((actor: Cast) => (
                                        <li key={actor.id}>
                                            <div>
                                                <img
                                                    src={actor.profile || "https://via.placeholder.com/100x150"}
                                                    alt={actor.name}
                                                    className=' size-full object-contain rounded-md max-h-[150px]'
                                                />
                                                <p className='text-center'>{actor.name}</p>
                                                <p className='text-center'>as {actor.character}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>)}
                        </div>
                    </motion.div>

                    {/* Footer with Parallax Effect */}
                    <motion.footer
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute bottom-0 w-full p-4 bg-black bg-opacity-80 text-white text-center"
                    >
                        <p>© 2024 Movie Database. All Rights Reserved.</p>
                    </motion.footer>
                </div>)}
            </body>
        </>
    );
}
