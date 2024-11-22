"use client";
import { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';
import { useFavoritesStore } from '@/Store/FavouriteStore';
import MovieCard from '../components/MovieCard';
import { useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';

export default function FavoritesPage() {
    const { favorites } = useFavoritesStore()
    const router = useRouter()
    const handleGoBack = () => {
        router.back(); // Navigates back to the previous page
    };

    return (
        <>
            <head>
                <title>Favorites </title>
                <link rel="icon" href="/favicon.ico"></link>
            </head>
            <body>
                <div className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-[#658292] via-[#6d7076] via-[#9f9c8d] to-[#9f9d8f]">
                    <MdArrowBack className='size-6 text-white relative z-50 m-4' onClick={handleGoBack} />
                    < h1 className="text-3xl font-bold p-4 text-white" > Favorite Movies</ h1>
                    {
                        favorites.length > 0 ? (
                            <div className="grid md:grid-cols-3 lg:grid-cols-5  gap-4 backdrop-blur-xl p-4">
                                {favorites.map((movie, index) => (
                                    <MovieCard movie={movie} key={`${movie.title}- ${index}`} />
                                ))}
                            </div>
                        ) : (
                            <p>No favorite movies added yet.</p>
                        )
                    }
                </div >
            </body>
        </>
    );
}
