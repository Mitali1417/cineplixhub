// import { AlertCircle } from "lucide-react";
// import { SearchX } from "lucide-react";
// import { MovieCard } from "../../../components/MovieCard";
// import MovieLoader from "../../../components/shared/MovieLoader";
// import { useState, useEffect, useRef } from "react";
// import { RotateCw } from "lucide-react";
// import { Film } from "lucide-react";
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { tmdbApi } from "../../../utils/api";
// import Search from "../../../components/Search";
// import { useDebounced } from "../../../hooks/useDebounce";
// import useMovieStore from "../../../store/movieStore";
// import useSearchAll from "../../../hooks/useSearchAll";

// const AllMovies = () => {

//   const {searchTerm, setSearchTerm} = useMovieStore();
//   const [activeTab, setActiveTab] = useState("movies");
//   const isLoadingPageRef = useRef(false);

//   const debouncedSearchTerm = useDebounced(searchTerm, 1000);

//   // console.log({popularMoviesData})

//   // const {
//   //   data,
//   //   isLoading,
//   //   isFetchingNextPage,
//   //   hasNextPage,
//   //   fetchNextPage,
//   //   error,
//   //   refetch
//   // } = useInfiniteQuery({
//   //   queryKey: ['movies', 'all', debouncedSearchTerm, activeTab],
//   //   queryFn: ({ pageParam = 1 }) => {
//   //     if (debouncedSearchTerm.trim()) {
//   //       return activeTab === 'movies'
//   //         ? tmdbApi.searchMovies(debouncedSearchTerm, pageParam)
//   //         : tmdbApi.searchTVShows(debouncedSearchTerm, pageParam);
//   //     } else {
//   //       return activeTab === 'movies'
//   //         ? tmdbApi.getPopularMovies(pageParam)
//   //         : tmdbApi.getPopularTVShows(pageParam);
//   //     }
//   //   },
//   //   getNextPageParam: (lastPage) => {
//   //     return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
//   //   },
//   //   enabled: true,
//   //   staleTime: 5 * 60 * 1000,
//   //   cacheTime: 10 * 60 * 1000,
//   //   refetchOnWindowFocus: false,
//   // });

//   // const movieList = data?.pages?.flatMap(page => page.results) || [];
//   // const errorMessage = error?.message;
//   const { movieList, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, errorMessage, refetch} = useSearchAll(debouncedSearchTerm, activeTab, tmdbApi);

//   const isSearching = searchTerm !== debouncedSearchTerm;

//   const handleScroll = ({ scroll, limit }) => {
//     const clientHeight = window.innerHeight;
//     const scrollHeight = limit;
//     const scrollTop = scroll;
//     const bottomThreshold = scrollHeight - clientHeight - 500;

//     const conditionsMet = !isLoading &&
//       !isFetchingNextPage &&
//       !isLoadingPageRef.current &&
//       hasNextPage &&
//       scrollTop >= bottomThreshold;

//     if (conditionsMet) {
//       isLoadingPageRef.current = true;

//       fetchNextPage().finally(() => {
//         setTimeout(() => {
//           isLoadingPageRef.current = false;
//         }, 1500);
//       });
//     }
//   };

//   useEffect(() => {
//     const handleScrollWrapper = () => {
//       handleScroll({
//         scroll: window.scrollY,
//         limit: document.documentElement.scrollHeight
//       });
//     };

//     window.addEventListener('scroll', handleScrollWrapper);
//     return () => window.removeEventListener('scroll', handleScrollWrapper);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoading, isFetchingNextPage, hasNextPage]);

//   return (
//     <section className="py-8">
//       <div className="flex justify-between items-center mb-6 px-4">
//         <h2 className="flex items-center gap-2 text-2xl font-bold">
//           <Film className="w-6 h-6 text-white" />
//           <span>
//             {debouncedSearchTerm ? `Search: ${debouncedSearchTerm}` : `All ${activeTab === 'movies' ? 'Movies' : 'TV Shows'}`}
//           </span>
//         </h2>
//       </div>

//       <div className="flex justify-center mb-6">
//         <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
//           <button
//             onClick={() => setActiveTab('movies')}
//             className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'movies'
//                 ? 'bg-indigo-600 text-white'
//                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
//               }`}
//           >
//             Movies
//           </button>
//           <button
//             onClick={() => setActiveTab('tv')}
//             className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'tv'
//                 ? 'bg-indigo-600 text-white'
//                 : 'text-gray-300 hover:bg-gray-700'
//               }`}
//           >
//             TV Shows
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-center mb-6 px-4">
//         <Search
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//         />
//         {/* Show typing indicator */}
//         {isSearching && (
//           <div className="ml-2 flex items-center">
//             <RotateCw className="w-4 h-4 animate-spin text-blue-500" />
//             <span className="ml-1 text-sm text-blue-500">Searching...</span>
//           </div>
//         )}
//       </div>

//       {errorMessage ? (
//         <div className="flex flex-col items-center justify-center gap-3 py-12 px-4">
//           <AlertCircle className="w-12 h-12 text-red-500" />
//           <p className="text-xl font-medium text-red-600">
//             Error loading {activeTab === 'movies' ? 'movies' : 'TV shows'}
//           </p>
//           <p className="text-sm text-gray-400 max-w-md text-center">
//             {errorMessage}
//           </p>
//           <button
//             onClick={() => refetch()}
//             className="mt-4 px-4 py-2 text-white rounded-lg bg-indigo-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       ) : movieList?.length === 0 && !isLoading && !isSearching ? (
//         <div className="flex flex-col items-center justify-center gap-3 py-12 px-4">
//           <SearchX className="w-12 h-12 text-gray-400" />
//           <p className="text-xl font-medium text-gray-300">
//             No {activeTab === 'movies' ? 'movies' : 'TV shows'} found
//           </p>
//           <p className="text-sm text-gray-400">
//             {debouncedSearchTerm
//               ? "Try a different search term"
//               : "Please check back later"}
//           </p>
//         </div>
//       ) : (
//         <>
//           <div className="movie-gallery-masonry px-4">
//             {isLoading || isSearching ? (
//               Array.from({ length: 20 }).map((_, index) => (
//                 <div key={index} className="movie-gallery-item">
//                 <MovieLoader />
//                 </div>
//               ))
//             ) : (
//               movieList?.map((movie) => (
//                 <div
//                   key={`${movie?.id}-${movie?.media_type || activeTab}`}
//                   className="movie-gallery-item"
//                 >
//                   <MovieCard
//                     movie={movie}
//                     mediaType={activeTab}
//                   />
//                 </div>
//               ))
//             )}
//           </div>

//           {isFetchingNextPage && (
//             <div className="flex justify-center items-center mt-6 gap-2">
//               <RotateCw className="w-4 h-4 animate-spin text-indigo-600" />
//               <span className="text-indigo-600">Loading more...</span>
//             </div>
//           )}

//           {!isLoading && !isFetchingNextPage && !hasNextPage && movieList?.length > 0 && !isSearching && (
//             <div className="flex justify-center mt-6 text-gray-500">
//               You have reached the end!
//             </div>
//           )}

//           {!isLoading && hasNextPage && !isFetchingNextPage && !isSearching && (
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={() => fetchNextPage()}
//                 className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 Load More
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </section>
//   );
// };

// export default AllMovies;

import { AlertCircle } from "lucide-react";
import { SearchX } from "lucide-react";
import { MovieCard } from "../../../components/MovieCard";
import MovieLoader from "../../../components/shared/MovieLoader";
import { useState, useEffect, useRef } from "react";
import { RotateCw } from "lucide-react";
import { Film } from "lucide-react";
import { tmdbApi } from "../../../utils/api";
import Search from "../../../components/Search";
import { useDebounced } from "../../../hooks/useDebounce";
import useMovieStore from "../../../store/movieStore";
import useSearchAll from "../../../hooks/useSearchAll";
import Spinner from "../../../components/Spinner";
import { cleanText } from "../../../utils/profanityFilter";

const AllMovies = () => {
  const { searchTerm, setSearchTerm, activeTab } = useMovieStore();
  // const [activeTab, setActiveTab] = useState("movies");
  const isLoadingPageRef = useRef(false);

  const debouncedSearchTerm = useDebounced(searchTerm, 1000);

  // Using the enhanced hook with additional options
  const {
    movieList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    errorMessage,
    refetch,
    totalResults,
    isEmpty,
    isSearchMode,
    isSearching,
  } = useSearchAll(debouncedSearchTerm, activeTab, tmdbApi, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const handleScroll = ({ scroll, limit }) => {
    const clientHeight = window.innerHeight;
    const scrollHeight = limit;
    const scrollTop = scroll;
    const bottomThreshold = scrollHeight - clientHeight - 500;

    const conditionsMet =
      !isLoading &&
      !isFetchingNextPage &&
      !isLoadingPageRef.current &&
      hasNextPage &&
      scrollTop >= bottomThreshold;

    if (conditionsMet) {
      isLoadingPageRef.current = true;

      fetchNextPage().finally(() => {
        setTimeout(() => {
          isLoadingPageRef.current = false;
        }, 1500);
      });
    }
  };

  useEffect(() => {
    const handleScrollWrapper = () => {
      handleScroll({
        scroll: window.scrollY,
        limit: document.documentElement.scrollHeight,
      });
    };

    window.addEventListener("scroll", handleScrollWrapper);
    return () => window.removeEventListener("scroll", handleScrollWrapper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetchingNextPage, hasNextPage]);

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Film className="w-6 h-6 text-white" />
          <span>
            {debouncedSearchTerm
              ? `Search: ${debouncedSearchTerm}`
              : `All ${activeTab === "movies" ? "Movies" : "TV Shows"}`}
          </span>
        </h2>
        {/* Show total results when searching */}
        {isSearchMode && totalResults > 0 && (
          <span className="text-sm text-gray-400">
            {totalResults.toLocaleString()} results
          </span>
        )}
      </div>

      {/* <div className="flex justify-center mb-6">
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "movies"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab("tv")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "tv"
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            TV Shows
          </button>
        </div>
      </div> */}

      {/* <div className="flex justify-center mb-6 px-4">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} isSearching={isSearching} />
      </div> */}

      {errorMessage ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 px-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-xl font-medium text-red-600">
            Error loading {activeTab === "movies" ? "movies" : "TV shows"}
          </p>
          <p className="text-sm text-gray-400 max-w-md text-center">
            {errorMessage}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 text-white rounded-lg bg-indigo-700 hover:bg-indigo-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : isEmpty && !isSearching ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 px-4">
          <SearchX className="w-12 h-12 text-gray-400" />
          <p className="text-xl font-medium text-gray-300">
            No {activeTab === "movies" ? "movies" : "TV shows"} found
          </p>
          <p className="text-sm text-gray-400">
            {debouncedSearchTerm
              ? "Try a different search term"
              : "Please check back later"}
          </p>
        </div>
      ) : (
        <>
          <div className="movie-gallery-masonry px-4">
            {isLoading || isSearching
              ? Array.from({ length: 20 }).map((_, index) => (
                  <div key={index} className="movie-gallery-item">
                    <MovieLoader />
                  </div>
                ))
              : movieList?.map((movie) => (
                  <div
                    key={`${movie?.id}-${movie?.media_type || activeTab}`}
                    className="movie-gallery-item"
                  >
                    <MovieCard movie={cleanText(movie)} mediaType={activeTab} />
                  </div>
                ))}
          </div>

          {isFetchingNextPage && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <Spinner />
            </div>
          )}

          {!isLoading &&
            !isFetchingNextPage &&
            !hasNextPage &&
            movieList?.length > 0 &&
            !isSearching && (
              <div className="flex justify-center mt-6 text-gray-500">
                You have reached the end!
              </div>
            )}

          {!isLoading && hasNextPage && !isFetchingNextPage && !isSearching && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchNextPage()}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AllMovies;
