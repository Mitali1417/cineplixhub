// /* eslint-disable react/prop-types */
// import { useState, useRef, useMemo, useCallback, memo, useEffect } from "react";
// import { MovieCard } from "../../components/MovieCard.jsx";
// import gsap from "gsap";
// import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
// import Spinner from "../../components/Spinner.jsx";
// import {
//   SearchX,
//   AlertCircle,
//   Film,
//   Tv,
//   Star,
//   Compass,
//   Grid3X3,
// } from "lucide-react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import useMovieStore from "../../store/movieStore.js";
// import {
//   useInfiniteDiscoverMovies,
//   useInfinitePopularMovies,
//   useInfinitePopularTVShows,
//   useInfiniteSearchContent,
//   useInfiniteTopRatedMovies,
//   useMovieGenres,
// } from "../../hooks/useTMDBQueries.js";
// import { SortAsc } from "lucide-react";
// import { Filter } from "lucide-react";
// import Search from "../../components/Search.jsx";
// import { MovieListGridSkeleton } from "../../components/shared/SkeletonLoader.jsx";

// gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// const FilterOptions = memo(({ genres, selectedGenre, onGenreChange }) => {
//   return (
//     <div className="filter-options mb-4">
//       <div className="flex items-center gap-2 mb-2">
//         <Filter className="w-5 h-5" />
//         <span className="font-medium">Filter by Genre:</span>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => onGenreChange(null)}
//           className={`px-3 py-1 text-sm rounded-full transition-colors ${
//             !selectedGenre
//               ? "bg-teal-500 text-white"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//           }`}
//         >
//           All
//         </button>
//         {genres?.map((genre) => (
//           <button
//             key={genre?.id}
//             onClick={() => onGenreChange(genre?.id)}
//             className={`px-3 py-1 text-sm rounded-full transition-colors ${
//               selectedGenre === genre?.id
//                 ? "bg-teal-500 text-white"
//                 : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//             }`}
//           >
//             {genre.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// });

// FilterOptions.displayName = "FilterOptions";

// const SortOptions = memo(({ sortOption, onSortChange }) => {
//   const sortOptions = useMemo(
//     () => [
//       { value: "popularity.desc", label: "Popularity (High to Low)" },
//       { value: "popularity.asc", label: "Popularity (Low to High)" },
//       { value: "vote_average.desc", label: "Rating (High to Low)" },
//       { value: "vote_average.asc", label: "Rating (Low to High)" },
//       { value: "release_date.desc", label: "Release Date (Newest)" },
//       { value: "release_date.asc", label: "Release Date (Oldest)" },
//     ],
//     []
//   );

//   return (
//     <div className="sort-options mb-4">
//       <div className="flex items-center gap-2">
//         <SortAsc className="w-5 h-5" />
//         <span className="font-medium">Sort by:</span>
//         <select
//           value={sortOption}
//           onChange={(e) => onSortChange(e.target.value)}
//           className="px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 hover:border-gray-600 transition-colors"
//         >
//           {sortOptions.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// });

// SortOptions.displayName = "SortOptions";

// const useInfiniteScroll = (hasNextPage, fetchNextPage, isFetchingNextPage) => {
//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     if (!hasNextPage || isFetchingNextPage) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const currentRef = loadMoreRef.current;
//     if (currentRef) {
//       observer.observe(currentRef);
//     }

//     return () => {
//       if (currentRef) {
//         observer.unobserve(currentRef);
//       }
//     };
//   }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

//   return loadMoreRef;
// };

// const Movies = () => {
//   const { activeTab, searchTerm, setSearchTerm } = useMovieStore();

//   console.log({ activeTab });

//   const [sortOption, setSortOption] = useState("popularity.desc");
//   const [selectedGenre, setSelectedGenre] = useState(null);

//   const { data: genresData } = useMovieGenres();

//   const searchQuery = useInfiniteSearchContent(searchTerm, activeTab);

//   const discoverQuery = useInfiniteDiscoverMovies(sortOption, selectedGenre);
//   const popularMoviesQuery = useInfinitePopularMovies();
//   const topRatedQuery = useInfiniteTopRatedMovies();
//   const tvShowsQuery = useInfinitePopularTVShows();

//   const getCurrentQuery = useCallback(() => {
//     if (searchTerm) {
//       return searchQuery;
//     }

//     switch (activeTab) {
//       case "popular":
//         return popularMoviesQuery;
//       case "toprated":
//         return topRatedQuery;
//       case "tvshows":
//         return tvShowsQuery;
//       case "discover":
//       case "search":
//       case "genres":
//       case "movies":
//       default:
//         return discoverQuery;
//     }
//   }, [
//     activeTab,
//     searchTerm,
//     searchQuery,
//     popularMoviesQuery,
//     topRatedQuery,
//     tvShowsQuery,
//     discoverQuery,
//   ]);

//   const currentQuery = getCurrentQuery();
//   const {
//     data,
//     isLoading,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     refetch,
//   } = currentQuery;

//   const loadMoreRef = useInfiniteScroll(
//     hasNextPage,
//     fetchNextPage,
//     isFetchingNextPage
//   );

//   const handleSortChange = useCallback((newSortOption) => {
//     setSortOption(newSortOption);
//   }, []);

//   const handleGenreChange = useCallback((genreId) => {
//     setSelectedGenre(genreId);
//   }, []);

//   const movieList = useMemo(() => {
//     return data?.pages?.flatMap((page) => page.results) || [];
//   }, [data]);

//   const totalResults = data?.pages?.[0]?.total_results || 0;
//   const totalPages = data?.pages?.[0]?.total_pages || 0;
//   const currentPage = data?.pages?.length || 0;

//   const renderContentSection = useCallback(
//     (content) => {
//       const {
//         title,
//         data: sectionData,
//         isLoading: sectionLoading,
//         error: sectionError,
//         icon = <Film className="w-6 h-6" />,
//         customEmptyMessage,
//         showFilters = true,
//       } = content;

//       return (
//         <section>
//           <div className={`flex justify-center items-center mt-24`}>
//             <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
//               {icon}
//               {title}
//             </h2>
//           </div>

//           {showFilters && !searchTerm && activeTab === "search" && (
//             <div className="mb-6 mx-20 p-4 rounded-lg">
//               <Search searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}/>
//               <div className="flex flex-wrap gap-4 items-start">
//                 <SortOptions
//                   sortOption={sortOption}
//                   onSortChange={handleSortChange}
//                 />
//                 <FilterOptions
//                   genres={genresData?.genres || []}
//                   selectedGenre={selectedGenre}
//                   onGenreChange={handleGenreChange}
//                 />
//               </div>
//             </div>
//           )}

//           {totalResults > 0 && (
//             <div className="mb-4 text-gray-600">
//               <p>
//                 Showing {sectionData?.length || 0} of {totalResults} results
//                 {currentPage > 0 && ` (Page ${currentPage} of ${totalPages})`}
//               </p>
//             </div>
//           )}

//           {sectionLoading && !sectionData?.length ? (
//             <div className="flex justify-center py-12">
//               {/* <Spinner /> */}
//               <MovieListGridSkeleton />
//             </div>
//           ) : sectionError ? (
//             <div className="flex flex-col items-center justify-center gap-3 py-12 text-red-500">
//               <AlertCircle className="w-12 h-12" />
//               <p className="text-xl font-medium">
//                 Error loading {title.toLowerCase()}
//               </p>
//               <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md text-center">
//                 {sectionError.message}
//               </p>
//               <button
//                 onClick={() => refetch()}
//                 className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : sectionData?.length === 0 ? (
//             <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-400">
//               <SearchX className="w-12 h-12" />
//               <p className="text-xl font-medium">
//                 {customEmptyMessage || `No ${title.toLowerCase()} found`}
//               </p>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {searchTerm
//                   ? "Try different keywords or check your spelling"
//                   : "Please check back later"}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="movie-gallery-masonry">
//                 {sectionData?.map((item, index) => (
//                   <div
//                     key={`${item?.id}-${index}`}
//                     className="movie-gallery-item"
//                   >
//                     <MovieCard
//                       movie={item}
//                       mediaType={activeTab === "tvshows" ? "tv" : "movie"}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Infinite scroll loading trigger */}
//               {hasNextPage && (
//                 <div ref={loadMoreRef} className="flex justify-center py-8">
//                   {isFetchingNextPage && (
//                     <div className="flex items-center gap-2">
//                       <Spinner />
//                       <span className="text-gray-600">Loading more...</span>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* End of results message */}
//               {!hasNextPage && sectionData?.length > 0 && (
//                 <div className="text-center py-6 text-gray-500">
//                   <p>You have reached the end of the list</p>
//                 </div>
//               )}

//               {/* Manual load more button (fallback) */}
//               {hasNextPage && !isFetchingNextPage && (
//                 <div className="text-center mt-6">
//                   <button
//                     onClick={() => fetchNextPage()}
//                     className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
//                   >
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       );
//     },
//     [searchTerm, activeTab, sortOption, handleSortChange, genresData?.genres, selectedGenre, handleGenreChange, totalResults, currentPage, totalPages, hasNextPage, loadMoreRef, isFetchingNextPage, refetch, fetchNextPage]
//   );

//   const renderContent = useCallback(() => {
//     if (searchTerm) {
//       return renderContentSection({
//         title: "Search Results",
//         data: movieList,
//         isLoading,
//         error,
//         customEmptyMessage: `No results found for "${searchTerm}"`,
//         showFilters: true,
//       });
//     }

//     switch (activeTab) {
//       case "movies":
//         return renderContentSection({
//           title: "All Movies",
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Film className="w-6 h-6" />,
//           showFilters: true,
//         });

//       case "tvshows":
//         return renderContentSection({
//           title: "Popular TV Shows",
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Tv className="w-6 h-6" />,
//           showFilters: true,
//         });

//       case "toprated":
//         return renderContentSection({
//           title: "Top Rated Movies",
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Star className="w-6 h-6" />,
//           showFilters: true,
//         });

//       case "popular":
//         return renderContentSection({
//           title: "Popular Movies",
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Star className="w-6 h-6" />,
//           showFilters: true,
//         });

//       case "discover":
//         return renderContentSection({
//           title: "Discover Movies",
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Compass className="w-6 h-6" />,
//           showFilters: true,
//         });

//       case "search":
//         return renderContentSection({
//           title: "Search Movies, TV Shows and Genres",
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Compass className="w-6 h-6" />,
//           showFilters: true,
//         });

//       case "genres": {
//         const genreName = selectedGenre
//           ? genresData?.genres?.find((g) => g?.id === selectedGenre)?.name
//           : "All Genres";
//         return renderContentSection({
//           title: `${genreName} Movies`,
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Grid3X3 className="w-6 h-6" />,
//           showFilters: true,
//         });
//       }

//       default:
//         return renderContentSection({
//           title: "All Movies",
//           data: movieList,
//           isLoading,
//           error,
//           icon: <Film className="w-6 h-6" />,
//           showFilters: true,
//         });
//     }
//   }, [
//     activeTab,
//     error,
//     isLoading,
//     movieList,
//     renderContentSection,
//     searchTerm,
//     selectedGenre,
//     genresData,
//   ]);

//   const content = useMemo(() => renderContent(), [renderContent]);

//   return <main className="min-h-screen h-full">{content}</main>;
// };

// export default memo(Movies);

/* eslint-disable react/prop-types */
import { useState, useRef, useMemo, useCallback, memo, useEffect } from "react";
import { MovieCard } from "../../components/MovieCard.jsx";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Spinner from "../../components/Spinner.jsx";
import {
  SearchX,
  AlertCircle,
  Film,
  Tv,
  Star,
  Compass,
  Grid3X3,
  RotateCw,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMovieStore from "../../store/movieStore.js";
import {
  useInfiniteDiscoverMovies,
  useInfinitePopularMovies,
  useInfinitePopularTVShows,
  useInfiniteSearchContent,
  useInfiniteTopRatedMovies,
  useMovieGenres,
} from "../../hooks/useTMDBQueries.js";
import { SortAsc } from "lucide-react";
import { Filter } from "lucide-react";
import Search from "../../components/Search.jsx";
import { MovieListGridSkeleton } from "../../components/shared/SkeletonLoader.jsx";
import { useDebounced } from "../../hooks/useDebounce.js"; // Add this import
import { cleanText } from "../../utils/profanityFilter.js";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

const FilterOptions = memo(({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="filter-options mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filter by Genre:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onGenreChange(null)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            !selectedGenre
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {genres?.map((genre) => (
          <button
            key={genre?.id}
            onClick={() => onGenreChange(genre?.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedGenre === genre?.id
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
});

FilterOptions.displayName = "FilterOptions";

const SortOptions = memo(({ sortOption, onSortChange }) => {
  const sortOptions = useMemo(
    () => [
      { value: "popularity.desc", label: "Popularity (High to Low)" },
      { value: "popularity.asc", label: "Popularity (Low to High)" },
      { value: "vote_average.desc", label: "Rating (High to Low)" },
      { value: "vote_average.asc", label: "Rating (Low to High)" },
      { value: "release_date.desc", label: "Release Date (Newest)" },
      { value: "release_date.asc", label: "Release Date (Oldest)" },
    ],
    []
  );

  return (
    <div className="sort-options mb-4">
      <div className="flex items-center gap-2">
        <SortAsc className="w-5 h-5" />
        <span className="font-medium">Sort by:</span>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 hover:border-gray-600 transition-colors"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

SortOptions.displayName = "SortOptions";

const useInfiniteScroll = (hasNextPage, fetchNextPage, isFetchingNextPage) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return loadMoreRef;
};

const Movies = () => {
  const { activeTab, searchTerm } = useMovieStore();

  console.log({ activeTab });

  const [sortOption, setSortOption] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Add debounced search term - this is the key fix!
  const debouncedSearchTerm = useDebounced(searchTerm, 1000);

  const { data: genresData } = useMovieGenres();

  // Use debounced search term instead of immediate search term
  const searchQuery = useInfiniteSearchContent(debouncedSearchTerm, activeTab);

  const discoverQuery = useInfiniteDiscoverMovies(sortOption, selectedGenre);
  const popularMoviesQuery = useInfinitePopularMovies();
  const topRatedQuery = useInfiniteTopRatedMovies();
  const tvShowsQuery = useInfinitePopularTVShows();

  const getCurrentQuery = useCallback(() => {
    // Use debounced search term for query selection
    if (debouncedSearchTerm) {
      return searchQuery;
    }

    switch (activeTab) {
      case "popular":
        return popularMoviesQuery;
      case "toprated":
        return topRatedQuery;
      case "tvshows":
        return tvShowsQuery;
      case "discover":
      case "genres":
      case "movies":
        return discoverQuery;
      default:
        return discoverQuery;
    }
  }, [
    activeTab,
    debouncedSearchTerm, // Use debounced version
    searchQuery,
    popularMoviesQuery,
    topRatedQuery,
    tvShowsQuery,
    discoverQuery,
  ]);

  const currentQuery = getCurrentQuery();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = currentQuery;

  const loadMoreRef = useInfiniteScroll(
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  );

  const handleSortChange = useCallback((newSortOption) => {
    setSortOption(newSortOption);
  }, []);

  const handleGenreChange = useCallback((genreId) => {
    setSelectedGenre(genreId);
  }, []);

  const movieList = useMemo(() => {
    return data?.pages?.flatMap((page) => page.results) || [];
  }, [data]);

  const totalResults = data?.pages?.[0]?.total_results || 0;
  const totalPages = data?.pages?.[0]?.total_pages || 0;
  const currentPage = data?.pages?.length || 0;

  // Check if user is still typing (search term differs from debounced)
  const isSearching = searchTerm !== debouncedSearchTerm;

  const renderContentSection = useCallback(
    (content) => {
      const {
        title,
        data: sectionData,
        isLoading: sectionLoading,
        error: sectionError,
        icon = <Film className="w-6 h-6" />,
        customEmptyMessage,
        showFilters = true,
      } = content;

      return (
        <section>
          <div className={`flex justify-center items-center mt-24`}>
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              {icon}
              {title}
            </h2>
          </div>

          {/* {showFilters && !debouncedSearchTerm && activeTab === "search" && (
            <div className="mb-6 mx-20 p-4 rounded-lg">
              <div className="flex justify-center mb-4">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {isSearching && (
                  <div className="ml-2 flex items-center">
                    <RotateCw className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="ml-1 text-sm text-blue-500">
                      Searching...
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-4 items-start">
                <SortOptions
                  sortOption={sortOption}
                  onSortChange={handleSortChange}
                />
                <FilterOptions
                  genres={genresData?.genres || []}
                  selectedGenre={selectedGenre}
                  onGenreChange={handleGenreChange}
                />
              </div>
            </div>
          )} */}

          {totalResults > 0 && (
            <div className="mb-4 text-gray-600">
              <p>
                Showing {sectionData?.length || 0} of {totalResults} results
                {currentPage > 0 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>
          )}

          {(sectionLoading || isSearching) && !sectionData?.length ? (
            <div className="flex justify-center py-12">
              <MovieListGridSkeleton />
            </div>
          ) : sectionError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-red-500">
              <AlertCircle className="w-12 h-12" />
              <p className="text-xl font-medium">
                Error loading {title.toLowerCase()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md text-center">
                {sectionError.message}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition"
              >
                Try Again
              </button>
            </div>
          ) : sectionData?.length === 0 && !isSearching ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-400">
              <SearchX className="w-12 h-12" />
              <p className="text-xl font-medium">
                {customEmptyMessage || `No ${title.toLowerCase()} found`}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {debouncedSearchTerm
                  ? "Try different keywords or check your spelling"
                  : "Please check back later"}
              </p>
            </div>
          ) : (
            <>
              <div className="movie-gallery-masonry">
                {sectionData?.map((item, index) => (
                  <div
                    key={`${item?.id}-${index}`}
                    className="movie-gallery-item"
                  >
                    <MovieCard
                      movie={cleanText(item)}
                      mediaType={activeTab === "tvshows" ? "tv" : "movie"}
                    />
                  </div>
                ))}
              </div>

              {/* Infinite scroll loading trigger */}
              {hasNextPage && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2">
                      <Spinner />
                      <span className="text-gray-600">Loading more...</span>
                    </div>
                  )}
                </div>
              )}

              {/* End of results message */}
              {!hasNextPage && sectionData?.length > 0 && !isSearching && (
                <div className="text-center py-6 text-gray-500">
                  <p>You have reached the end of the list</p>
                </div>
              )}

              {/* Manual load more button (fallback) */}
              {hasNextPage && !isFetchingNextPage && !isSearching && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => fetchNextPage()}
                    className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      );
    },
    [
      searchTerm,
      debouncedSearchTerm,
      isSearching,
      activeTab,
      sortOption,
      handleSortChange,
      genresData?.genres,
      selectedGenre,
      handleGenreChange,
      totalResults,
      currentPage,
      totalPages,
      hasNextPage,
      loadMoreRef,
      isFetchingNextPage,
      refetch,
      fetchNextPage,
    ]
  );

  const renderContent = useCallback(() => {
    if (debouncedSearchTerm) {
      return renderContentSection({
        title: "Search Results",
        data: movieList,
        isLoading,
        error,
        customEmptyMessage: `No results found for "${debouncedSearchTerm}"`,
        showFilters: true,
      });
    }

    switch (activeTab) {
      case "movies":
        return renderContentSection({
          title: "All Movies",
          data: movieList,
          isLoading,
          error,
          icon: <Film className="w-6 h-6" />,
          showFilters: true,
        });

      case "tvshows":
        return renderContentSection({
          title: "Popular TV Shows",
          data: movieList,
          isLoading,
          error,
          icon: <Tv className="w-6 h-6" />,
          showFilters: true,
        });

      case "toprated":
        return renderContentSection({
          title: "Top Rated Movies",
          data: movieList,
          isLoading,
          error,
          icon: <Star className="w-6 h-6" />,
          showFilters: true,
        });

      case "popular":
        return renderContentSection({
          title: "Popular Movies",
          data: movieList,
          isLoading,
          error,
          icon: <Star className="w-6 h-6" />,
          showFilters: true,
        });

      case "discover":
        return renderContentSection({
          title: "Discover Movies",
          data: movieList,
          isLoading,
          error,
          icon: <Compass className="w-6 h-6" />,
          showFilters: true,
        });

      // case "search":
      //   return renderContentSection({
      //     title: "Search Movies, TV Shows and Genres",
      //     data: movieList,
      //     isLoading,
      //     error,
      //     icon: <Compass className="w-6 h-6" />,
      //     showFilters: true,
      //   });

      case "genres": {
        const genreName = selectedGenre
          ? genresData?.genres?.find((g) => g?.id === selectedGenre)?.name
          : "All Genres";
        return renderContentSection({
          title: `${genreName} Movies`,
          data: movieList,
          isLoading,
          error,
          icon: <Grid3X3 className="w-6 h-6" />,
          showFilters: true,
        });
      }

      default:
        return renderContentSection({
          title: "All Movies",
          data: movieList,
          isLoading,
          error,
          icon: <Film className="w-6 h-6" />,
          showFilters: true,
        });
    }
  }, [
    activeTab,
    error,
    isLoading,
    movieList,
    renderContentSection,
    debouncedSearchTerm, // Use debounced version
    selectedGenre,
    genresData,
  ]);

  const content = useMemo(() => renderContent(), [renderContent]);

  return <main className="min-h-screen h-full">{content}</main>;
};

export default memo(Movies);
