import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';


const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(endpoint: string) {
    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,

        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`
        }
    });
    return response.data;

}



const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

export const fetchAllMovies = async ({ pageParam = 1 }) => {
    const pageNumbers = [pageParam, pageParam + 1, pageParam + 2];

    const results = await Promise.all(
        pageNumbers.map(page =>
            axios.get(`${BASE_URL}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`).then(res => res.data.results)
        )
    );

    // Combine results from three pages
    return results.flat();
};

const useAllMovies = () => {
    return useInfiniteQuery('movies', fetchAllMovies, {
        getNextPageParam: (_, allPages) => {
            // Calculate the next batch of pages
            const nextPage = allPages.length * 3 + 1;
            return nextPage <= 500 ? nextPage : undefined; // TMDB limits to 500 pages
        },
        keepPreviousData: true
    });
};

export default useAllMovies;


const fetchMovieDetails = async (id: number) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY
        }
    });
    return response.data;
};


export const useMovieDetails = (id: number) => useQuery(['movieDetails', id], () => fetchMovieDetails(id), {
    enabled: !!id,
});



// Fetch function
const fetchMovieCast = async (movieId: number) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
    });
    return response.data.cast.map((cast: { id: number; name: string; character: string; profile_path: string; }) => ({
        id: cast.id,
        name: cast.name,
        character: cast.character,
        profile: cast.profile_path
            ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
            : null,
    }));
};

// useQuery Hook
export const UseMovieCast = (movieId: number) => {
    return useQuery(["movieCast", movieId], () => fetchMovieCast(movieId), {
        enabled: !!movieId, // Ensures query only runs if movieId is provided
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Prevents refetching on window focus
    });
};