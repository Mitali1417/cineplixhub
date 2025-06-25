import { create } from "zustand";

const useMovieStore = create((set) => ({
  movies: [],
  setMovies: (newMovies) => set({ movies: newMovies }),
  clearMovies: () => set({ movies: [] }),
  addMovie: (movie) => set((state) => ({ movies: [...state.movies, movie] })),
  activeTab: "movies",
  setActiveTab: (newTab) => set({ activeTab: newTab }),
  searchTerm: "",
  setSearchTerm: (newTerm) => set({ searchTerm: newTerm }),
}));

export default useMovieStore;
