// pages/favorites.tsx
import { useEffect, useState } from 'react';
import { Movie } from '../types/MovieType';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Favorite Movies</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map((movie) => (
                        <div key={movie.id} className="p-2 border rounded shadow-lg">
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorite movies added yet.</p>
            )}
        </div>
    );
}