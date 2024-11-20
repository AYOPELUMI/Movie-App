import { Movie } from '@/app/types/MovieType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteStore {
    favorites: Movie[];
    addToFavorites: (data: Movie) => void;
    removeFromFavorites: (data: number) => void;
}

export const useFavoritesStore = create<FavoriteStore>()(persist(
    (set) => ({
        favorites: [],

        // Add movie to favorites
        addToFavorites: (movie) => set((state) => ({
            favorites: [...state.favorites, movie]
        })),

        // Remove movie from favorites
        removeFromFavorites: (movieId) => set((state) => ({
            favorites: state.favorites.filter((movie) => movie.id !== movieId)
        })),
    }),
    {
        name: "favourite-movies"
    }
));
