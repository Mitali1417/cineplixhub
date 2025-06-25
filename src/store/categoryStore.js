import { create } from 'zustand';

const useCategoryStore = create((set) => ({
  allMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  tvShows: [],
  discoverMovies: [],
  genreMovies: [],
  genres: [],
  loading: {
    allMovies: false,
    popularMovies: false,
    topRatedMovies: false,
    tvShows: false,
    discoverMovies: false,
    genreMovies: false,
  },
  error: {
    allMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    tvShows: null,
    discoverMovies: null,
    genreMovies: null,
  },

  setAllMovies: (movies) => set({ allMovies: movies }),
  setPopularMovies: (movies) => set({ popularMovies: movies }),
  setTopRatedMovies: (movies) => set({ topRatedMovies: movies }),
  setTvShows: (shows) => set({ tvShows: shows }),
  setDiscoverMovies: (movies) => set({ discoverMovies: movies }),
  setGenreMovies: (movies) => set({ genreMovies: movies }),
  setGenres: (genres) => set({ genres: genres }),
  setLoading: (category, status) =>
    set((state) => ({ loading: { ...state.loading, [category]: status } })),
  setError: (category, message) =>
    set((state) => ({ error: { ...state.error, [category]: message } })),
}));

export default useCategoryStore;