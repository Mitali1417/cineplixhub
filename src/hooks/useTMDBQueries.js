import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { tmdbApi } from '../utils/api';

export const tmdbKeys = {
  all: ['tmdb'],
  movies: () => [...tmdbKeys.all, 'movies'],
  movie: (id) => [...tmdbKeys.movies(), id],
  movieDetails: (id) => [...tmdbKeys.movie(id), 'details'],
  movieCredits: (id) => [...tmdbKeys.movie(id), 'credits'],
  movieVideos: (id) => [...tmdbKeys.movie(id), 'videos'],
  tvShows: () => [...tmdbKeys.all, 'tv'],
  tvShow: (id) => [...tmdbKeys.tvShows(), id],
  tvDetails: (id) => [...tmdbKeys.tvShow(id), 'details'],
  people: () => [...tmdbKeys.all, 'people'],
  person: (id) => [...tmdbKeys.people(), id],
  genres: () => [...tmdbKeys.all, 'genres'],
  search: (type, query) => [...tmdbKeys.all, 'search', type, query],
  discover: (params) => [...tmdbKeys.movies(), 'discover', params],
  trendingAll: (params) => [...tmdbKeys.movies(), 'trending-all', params],
  trendingMovies: (params) => [...tmdbKeys.movies(), 'trending-movies', params],
  trendingTV: (params) => [...tmdbKeys.tvShows(), 'trending-tv', params],
  trendingPeople: (params) => [...tmdbKeys.people(), 'trending-people', params],
};

// Movie hooks
export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: [...tmdbKeys.movies(), 'popular', page],
    queryFn: () => tmdbApi.getPopularMovies(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTopRatedMovies = (page = 1) => {
  return useQuery({
    queryKey: [...tmdbKeys.movies(), 'top-rated', page],
    queryFn: () => tmdbApi.getTopRatedMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useNowPlayingMovies = (page = 1) => {
  return useQuery({
    queryKey: [...tmdbKeys.movies(), 'now-playing', page],
    queryFn: () => tmdbApi.getNowPlayingMovies(page),
    staleTime: 2 * 60 * 1000, // 2 minutes for more current data
  });
};

export const useMovieDetails = (movieId) => {
  return useQuery({
    queryKey: tmdbKeys.movieDetails(movieId),
    queryFn: () => tmdbApi.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMovieCredits = (movieId) => {
  return useQuery({
    queryKey: tmdbKeys.movieCredits(movieId),
    queryFn: () => tmdbApi.getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 30 * 60 * 1000, // 30 minutes (credits don't change often)
  });
};

export const useMovieVideos = (movieId) => {
  return useQuery({
    queryKey: tmdbKeys.movieVideos(movieId),
    queryFn: () => tmdbApi.getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000,
  });
};

// TV Show hooks
export const usePopularTVShows = (page = 1) => {
  return useQuery({
    queryKey: [...tmdbKeys.tvShows(), 'popular', page],
    queryFn: () => tmdbApi.getPopularTVShows(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTVShowDetails = (tvId) => {
  return useQuery({
    queryKey: tmdbKeys.tvDetails(tvId),
    queryFn: () => tmdbApi.getTVShowDetails(tvId),
    enabled: !!tvId,
    staleTime: 10 * 60 * 1000,
  });
};

// People hooks
export const usePopularPeople = (page = 1) => {
  return useQuery({
    queryKey: [...tmdbKeys.people(), 'popular', page],
    queryFn: () => tmdbApi.getPopularPeople(page),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const usePersonDetails = (personId) => {
  return useQuery({
    queryKey: [...tmdbKeys.person(personId), 'details'],
    queryFn: () => tmdbApi.getPersonDetails(personId),
    enabled: !!personId,
    staleTime: 30 * 60 * 1000,
  });
};

// Search hooks
export const useSearchMovies = (query, page = 1) => {
  return useQuery({
    queryKey: [...tmdbKeys.search('movies', query), page],
    queryFn: () => tmdbApi.searchMovies(query, page),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchTVShows = (query, page = 1) => {
  return useQuery({
    queryKey: [...tmdbKeys.search('tv', query), page],
    queryFn: () => tmdbApi.searchTVShows(query, page),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
  });
};

// Custom hooks using TanStack Query with infinite queries
export const useInfiniteDiscoverMovies = (sortBy = 'popularity.desc') => {
  return useInfiniteQuery({
    queryKey: [...tmdbKeys.discover({ sortBy }), 'infinite'],
    queryFn: ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        sort_by: sortBy,
      };
      return tmdbApi.discoverMovies(params);
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useInfinitePopularMovies = () => {
  return useInfiniteQuery({
    queryKey: [...tmdbKeys.movies(), 'popular', 'infinite'],
    queryFn: ({ pageParam = 1 }) => tmdbApi.getPopularMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useInfiniteTopRatedMovies = () => {
  return useInfiniteQuery({
    queryKey: [...tmdbKeys.movies(), 'top-rated', 'infinite'],
    queryFn: ({ pageParam = 1 }) => tmdbApi.getTopRatedMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useInfinitePopularTVShows = () => {
  return useInfiniteQuery({
    queryKey: [...tmdbKeys.tvShows(), 'popular', 'infinite'],
    queryFn: ({ pageParam = 1 }) => tmdbApi.getPopularTVShows(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useInfiniteSearchContent = (searchTerm, activeTab) => {
  const isMovieSearch = activeTab === 'movies' || !activeTab;

  return useInfiniteQuery({
    queryKey: isMovieSearch
      ? [...tmdbKeys.search('movies', searchTerm), 'infinite']
      : [...tmdbKeys.search('tv', searchTerm), 'infinite'],
    queryFn: ({ pageParam = 1 }) => isMovieSearch
      ? tmdbApi.searchMovies(searchTerm, pageParam)
      : tmdbApi.searchTVShows(searchTerm, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useMovieGenres = () => {
  return useQuery({
    queryKey: [...tmdbKeys.genres(), 'movies'],
    queryFn: () => tmdbApi.getMovieGenres(),
    staleTime: 60 * 60 * 1000, // 1 hour - genres don't change often
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};


export const useTrendingAll = (params) => {
  return useQuery({
    queryKey: [...tmdbKeys.movies(), 'trendingAll', params],
    queryFn: () => tmdbApi.getTrendingAll(params),
    staleTime: 60 * 60 * 1000, // 1 hour - trending doesn't change often
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

export const useTrendingMovies = (params) => {
  return useQuery({
    queryKey: [...tmdbKeys.movies(), 'trendingMovies', params],
    queryFn: () => tmdbApi.getTrendingMovies(params),
    staleTime: 60 * 60 * 1000, // 1 hour - trending doesn't change often
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

export const useTrendingTV = (params) => {
  return useQuery({
    queryKey: [...tmdbKeys.movies(), 'trendingTV', params],
    queryFn: () => tmdbApi.getTrendingTV(params),
    staleTime: 60 * 60 * 1000, // 1 hour - trending doesn't change often
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};

export const useTrendingPeople = (params) => {
  return useQuery({
    queryKey: [...tmdbKeys.movies(), 'trendingPeople', params],
    // queryKey: tmdbKeys.trendingPeople(params),
    queryFn: () => tmdbApi.getTrendingPeople(params),
    staleTime: 60 * 60 * 1000, // 1 hour - trending doesn't change often
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};
