
// import axios from 'axios';
// import useProfanityFilter from '../hooks/useProfanityFilter';

// const TMDB_API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
// const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;


// const api = axios.create({
//   baseURL: TMDB_BASE_URL,
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
//   },
// });

// const { isSafeMovie } = useProfanityFilter();


// export const fetchFromTMDB = async (url, params = {}) => {
//   try {
//     const response = await api.get(url, { params });
//     const data = response.data;

//       // Apply filter to individual movie/TV show/person data or a paged list of results
//     if (Array.isArray(data.results)) {
//       data.results = data.results.filter(
//         (item) => !item.adult && isSafeMovie(item)
//       );
//     } else if (data && typeof data === 'object') {
//       // For single movie/TV show/person details
//       if (data.adult || !isSafeMovie(data)) {
//         // If the single item is not safe, return an empty object or null
//         // depending on how you want to handle it. For now, returning null.
//         return null;
//       }
//     }

//     return data;
//   } catch (error) {
//     console.error("Error fetching from TMDB:", error);
//     throw new Error(error.response?.data?.status_message || "Something went wrong with the API request.");
//   }
// };


import axios from "axios";
import { isSafeMovie } from "../utils/profanityFilter";

const TMDB_API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
  },
});

export const fetchFromTMDB = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    const data = response.data;

    // Filter unsafe results
    if (Array.isArray(data.results)) {
      data.results = data.results.filter(
        (item) => !item.adult && isSafeMovie(item)
      );
    } else if (data && typeof data === "object") {
      if (data.adult || !isSafeMovie(data)) {
        return null; // skip unsafe single item
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw new Error(
      error.response?.data?.status_message || "Something went wrong with the API request."
    );
  }
};


export const tmdbApi = {
  // Movies
  getPopularMovies: (page = 1) => fetchFromTMDB('/discover/movie?language=en-US&include_adult=false&language=en-US', { page }),
  // getPopularMovies: (page = 1) => fetchFromTMDB('/movie/popular?include_video=false&include_adult=false&language=en-US&', { page }),
  getTopRatedMovies: (page = 1) => fetchFromTMDB('/movie/top_rated?language=en-US', { page }),
  getNowPlayingMovies: (page = 1) => fetchFromTMDB('/movie/now_playing', { page }),
  getUpcomingMovies: (page = 1) => fetchFromTMDB('/movie/upcoming', { page }),
  getMovieDetails: (movieId) => fetchFromTMDB(`/movie/${movieId}`),
  getMovieCredits: (movieId) => fetchFromTMDB(`/movie/${movieId}/credits`),
  getMovieVideos: (movieId) => fetchFromTMDB(`/movie/${movieId}/videos`),
  searchMovies: (query, page = 1) => fetchFromTMDB('/search/movie', { query, page }),

  // TV Shows
  getPopularTVShows: (page = 1) => fetchFromTMDB('/tv/popular', { page }),
  getTopRatedTVShows: (page = 1) => fetchFromTMDB('/tv/top_rated', { page }),
  getOnTheAirTVShows: (page = 1) => fetchFromTMDB('/tv/on_the_air', { page }),
  getTVShowDetails: (tvId) => fetchFromTMDB(`/tv/${tvId}`),
  getTVShowCredits: (tvId) => fetchFromTMDB(`/tv/${tvId}/credits`),
  searchTVShows: (query, page = 1) => fetchFromTMDB('/search/tv', { query, page }),

  // People
  getPopularPeople: (page = 1) => fetchFromTMDB('/person/popular', { page }),
  getPersonDetails: (personId) => fetchFromTMDB(`/person/${personId}`),
  searchPeople: (query, page = 1) => fetchFromTMDB('/search/person', { query, page }),

  // Genres
  getMovieGenres: () => fetchFromTMDB('/genre/movie/list'),
  getTVGenres: () => fetchFromTMDB('/genre/tv/list'),

  // Discover
  discoverMovies: (params = {}) => fetchFromTMDB('/discover/movie?include_adult=false&include_video=false&language=en-US', params),
  discoverTVShows: (params = {}) => fetchFromTMDB('/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US', params),

  // Trending
  getTrendingAll: (page = 1) => fetchFromTMDB('/trending/all/day?language=en-US', { page }),
  getTrendingMovies: (page = 1) => fetchFromTMDB('/trending/movie/day?language=en-US', { page }),
  getTrendingTVShows: (page = 1) => fetchFromTMDB('/trending/tv/day?language=en-US', { page }),
  getTrendingPeople: (page = 1) => fetchFromTMDB('/trending/person/day?language=en-US', { page }),
};
