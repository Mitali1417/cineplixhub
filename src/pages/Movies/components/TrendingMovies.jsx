
import Spinner from "../../../components/Spinner";
import { AlertCircle } from "lucide-react";
import { SearchX } from "lucide-react";
import { TrendingMovieCard } from "../../../components/MovieCard";
import { memo } from "react";
import { useTrendingAll } from "../../../hooks/useTMDBQueries";
import { cleanText } from "../../../utils/profanityFilter";

const TrendingMovies = memo(() => {

  const { data: trendingAll, isLoading: topRatedMoviesLoading, topRatedMoviesError: topRatedMoviesError } = useTrendingAll();
  const trendingAllData = trendingAll?.results;
  console.log({ trendingAllData })

  return (

    <section className="trending-movies wrapper">
      {/* <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 px-4">
        <Clapperboard className="w-6 h-6" />
        Trending Movies
      </h2> */}

      {topRatedMoviesLoading?.popular ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : topRatedMoviesError?.popular ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-red-500 px-4">
          <AlertCircle className="w-12 h-12" />
          <p className="text-xl font-medium">topRatedMoviesError topRatedMoviesLoading trending movies</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md text-center">
            {topRatedMoviesError?.popular}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition"
          >
            Try Again
          </button>
        </div>
      ) : trendingAllData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-500 dark:text-gray-400 px-4">
          <SearchX className="w-12 h-12" />
          <p className="text-xl font-medium">No trending movies found</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please check back later
          </p>
        </div>
      ) : (
        <div className="relative overflow-hidden marquee-container">
          <div className="animate-marquee flex gap-4 w-max">
            {trendingAllData && trendingAllData.length > 0 && [...trendingAllData.slice(0, 6), ...trendingAllData.slice(0, 6)].map(
              (movie, index) => (
                <div
                  key={`${movie.id}-${index}`}
                  className="relative group flex-shrink-0 w-[200px] md:w-[300px]"
                >
                  <span className="group-hover:scale-100 scale-95 drop-shadow-2xl transition-all duration-500 ease-in-out absolute left-0 md:left-4 md:-top-12 z-10 text-[120px] md:text-[180px] font-black inline-block text-gradient">
                    {(index % 6) + 1}
                  </span>
                  <div className="ml-8 md:ml-20">
                    <TrendingMovieCard movie={cleanText(movie)} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </section>
  )
});

TrendingMovies.displayName = "TrendingMovies";
export default TrendingMovies;
