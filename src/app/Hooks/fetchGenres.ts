import { useQuery } from 'react-query';

import axios from 'axios';

const fetchGenres = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEYN,
            language: 'en',
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`
        }
    });
    return response.data.genres; // The genres will be in response.data.genres
};

const useGenres = () => useQuery(['genres'], fetchGenres);


export default useGenres;
