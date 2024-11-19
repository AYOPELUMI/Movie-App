import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';

type Movie = {
    title: string;
    year: number;
    rating: number;
    category: string;
};

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(endpoint: string) {
    try {
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
    } catch (error) {
        throw new Error('Failed to fetch');
    }
}

// Example usage with react-query
export const useMovies = (endpoint: string) => useQuery(['movies', endpoint], () => fetchMovies(endpoint));



const API_KEY = "a39709319c82d7d872f1742866bd1404";
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

const fetchAllMovies = async ({ pageParam = 1 }) => {
    const pageNumbers = [pageParam, pageParam + 1, pageParam + 2];

    const results = await Promise.all(
        pageNumbers.map(page =>
            axios.get(`${BASE_URL}?api_key=${API_KEY}&page=${page}`).then(res => res.data.results)
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
    });
};

export default useAllMovies;


const fetchMovieDetails = async (id: number) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            api_key: "a39709319c82d7d872f1742866bd1404"
        }
    });
    return response.data;
};


export const movieDetails = (id: number) => useQuery(['movieDetails', id], () => fetchMovieDetails(id), {
    enabled: !!id,
});
