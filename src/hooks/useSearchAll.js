// import { useInfiniteQuery } from "@tanstack/react-query";

// // Make sure to pass debouncedSearchTerm, activeTab, and tmdbApi as arguments or import them as needed
// const useSearchAll = (debouncedSearchTerm, activeTab, tmdbApi) => {
//   const {
//     data,
//     isLoading,
//     isFetchingNextPage,
//     hasNextPage,
//     fetchNextPage,
//     error,
//     refetch
//   } = useInfiniteQuery({
//     queryKey: ['movies', 'all', debouncedSearchTerm, activeTab],
//     queryFn: ({ pageParam = 1 }) => {
//       if (debouncedSearchTerm.trim()) {
//         return activeTab === 'movies'
//           ? tmdbApi.searchMovies(debouncedSearchTerm, pageParam)
//           : tmdbApi.searchTVShows(debouncedSearchTerm, pageParam);
//       } else {
//         return activeTab === 'movies'
//           ? tmdbApi.getPopularMovies(pageParam)
//           : tmdbApi.getPopularTVShows(pageParam);
//       }
//     },
//     getNextPageParam: (lastPage) => {
//       return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
//     },
//     enabled: true,
//     staleTime: 5 * 60 * 1000,
//     cacheTime: 10 * 60 * 1000,
//     refetchOnWindowFocus: false,
//   });

//   const movieList = data?.pages?.flatMap(page => page.results) || [];
//   const errorMessage = error?.message;

//   return {
//     movieList,
//     isLoading,
//     isFetchingNextPage,
//     hasNextPage,
//     fetchNextPage,
//     errorMessage,
//     refetch,
//   };
// };

// export default useSearchAll;





import { useInfiniteQuery } from "@tanstack/react-query";
import useMovieStore from "../store/movieStore";


const useSearchAll = (
  debouncedSearchTerm, 
  activeTab, 
  tmdbApi, 
  options = {}
) => {
  const {
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus = false,
    enabled = true,
    ...queryOptions
  } = options;

const { searchTerm } = useMovieStore();


  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
    isError,
    isPreviousData
  } = useInfiniteQuery({
    queryKey: ['movies', 'search', debouncedSearchTerm, activeTab],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        if (debouncedSearchTerm?.trim()) {
          // Search functionality
          return activeTab === 'movies' || activeTab === 'search'
            ? await tmdbApi.searchMovies(debouncedSearchTerm, pageParam)
            : await tmdbApi.searchTVShows(debouncedSearchTerm, pageParam);
        } else {
          // Default popular content
          return activeTab === 'movies' || activeTab === 'search'
            ? await tmdbApi.getPopularMovies(pageParam)
            : await tmdbApi.getPopularTVShows(pageParam);
        }
      } catch (error) {
        console.error('Search API Error:', error);
        throw new Error(
          error.response?.data?.status_message || 
          error.message || 
          'Failed to fetch data'
        );
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    enabled,
    staleTime,
    cacheTime,
    refetchOnWindowFocus,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...queryOptions
  });

  // Process the data
  const movieList = data?.pages?.flatMap(page => page?.results || []) || [];
  const totalResults = data?.pages?.[0]?.total_results || 0;
  const totalPages = data?.pages?.[0]?.total_pages || 0;
  
  // Enhanced error message
  let errorMessage = null;
  if (error) {
    if (error.response?.status === 401) {
      errorMessage = "API authentication failed. Please check your API key.";
    } else if (error.response?.status === 404) {
      errorMessage = "The requested content was not found.";
    } else if (error.response?.status === 429) {
      errorMessage = "Too many requests. Please try again later.";
    } else if (error.response?.status >= 500) {
      errorMessage = "Server error. Please try again later.";
    } else {
      errorMessage = error.message || "An unexpected error occurred.";
    }
  }

    const isSearching = searchTerm !== debouncedSearchTerm;

  return {
    movieList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    errorMessage,
    refetch,
    isError,
    totalResults,
    totalPages,
    isPreviousData,
    // Additional utility functions
    isEmpty: !isLoading && movieList.length === 0,
    isSearchMode: Boolean(debouncedSearchTerm?.trim()),
    isSearching 
  };
};

export default useSearchAll;