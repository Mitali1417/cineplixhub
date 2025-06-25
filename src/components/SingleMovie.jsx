// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   Star,
//   Globe,
//   Calendar,
//   Film,
//   ChevronLeft,
//   Video,
//   Info,
// } from "lucide-react";
// import Spinner from "./Spinner";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { tmdbApi } from "../utils/api";
// import { User } from "lucide-react";
// import { RefreshCcw } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// const SingleMovie = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const mediaType = location.pathname.includes("/movie") ? "movie" : "tv";

//   const [movie, setMovie] = useState(null);
//   const [credits, setCredits] = useState(null);
//   const [videos, setVideos] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       if (!id) return;

//       setIsLoading(true);
//       setError(null);

//       try {
//         let movieData, creditsData, videosData;

//         if (mediaType === "movie") {
//           [movieData, creditsData, videosData] = await Promise.all([
//             tmdbApi.getMovieDetails(id),
//             tmdbApi.getMovieCredits(id),
//             tmdbApi.getMovieVideos(id),
//           ]);
//         } else {
//           [movieData, creditsData] = await Promise.all([
//             tmdbApi.getTVShowDetails(id),
//             tmdbApi.getTVShowCredits(id),
//           ]);
//           videosData = { results: [] };
//         }

//         setMovie(movieData);
//         setCredits(creditsData);
//         setVideos(videosData);
//       } catch (err) {
//         setError(err.message || "Failed to fetch details");
//         console.error("Error fetching details:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id, mediaType]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // const formatRuntime = (minutes) => {
//   //   if (!minutes) return "N/A";
//   //   const hours = Math.floor(minutes / 60);
//   //   const mins = minutes % 60;
//   //   return `${hours}h ${mins}m`;
//   // };

//   // const formatMoney = (amount) => {
//   //   if (!amount) return "N/A";
//   //   return new Intl.NumberFormat("en-US", {
//   //     style: "currency",
//   //     currency: "USD",
//   //     notation: "compact",
//   //     maximumFractionDigits: 1,
//   //   }).format(amount);
//   // };

//   const refetchDetails = async () => {
//     if (!id) return;

//     setIsLoading(true);
//     try {
//       let movieData;
//       if (mediaType === "movie") {
//         movieData = await tmdbApi.getMovieDetails(id);
//       } else {
//         movieData = await tmdbApi.getTVShowDetails(id);
//       }
//       setMovie(movieData);
//       setError(null);
//     } catch (err) {
//       setError(err.message || "Failed to refetch details");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isLoading) {
//     return (
//       <div className="text-center mt-20">
//         <Spinner />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <main className="wrapper">
//         <div className="text-center py-20">
//           <h2 className="text-red-400 mb-4">{error}</h2>
//           <div className="flex gap-4 justify-center">
//             <button
//               onClick={refetchDetails}
//               className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
//             >
//               Retry
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center justify-center gap-1 px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Go Back
//             </button>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   if (!movie) {
//     return null;
//   }

//   const trailer = videos?.results?.find(
//     (video) => video.site === "YouTube" && video.type === "Trailer"
//   );

//   return (
//     <main>
//       <div className="wrapper">
//         <div className="mb-8 flex items-center justify-end gap-2">
//           <button onClick={() => navigate(-1)}>
//             <ChevronLeft className="w-4 h-4" />
//             Back
//           </button>

//           <button onClick={refetchDetails}><RefreshCcw className="w-4 h-4"/></button>
//         </div>

//         <div className="space-y-4">
//           <div className="movie-card movie-hero overflow-hidden flex flex-col justify-center items-center gap-y-4">
//             {movie.backdrop_path && (
//               <>
//                 <div
//                   // ref={backdropRef}
//                   className="movie-backdrop"
//                   style={{
//                     backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
//                   }}
//                 />
//                 <span className="h-full w-full" />
//               </>
//             )}
//             <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-4">
//               <div className="w-[180px] h-[250px] rounded-lg overflow-hidden block z-10">
//                 <img
//                   // ref={posterRef}
//                   src={
//                     movie?.poster_path
//                       ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
//                       : "/placeholder.svg"
//                   }
//                   alt={movie?.title || movie?.name}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/placeholder.svg";
//                   }}
//                 />
//               </div>
//               <div className="text-left">
//                 {/* <div ref={titleRef}> */}
//                 <div className="flex justify-start items-center gap-x-4">
//                   <div className="movie-title">
//                     {movie?.title || movie?.name}
//                   </div>
//                   <div className="rating-badge">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="font-bold text-white">
//                       {movie?.vote_average?.toFixed(1)}
//                     </span>
//                   </div>
//                 </div>

//                 {movie?.tagline && (
//                   <p className="movie-tagline mt-2 text-gray-300 italic">
//                     &quot;{movie.tagline}&quot;
//                   </p>
//                 )}
//                 {movie?.original_title &&
//                   movie.original_title !== (movie.title || movie.name) && (
//                     <p className="movie-tagline mt-2">
//                       Original Title:{" "}
//                       {movie.original_title || movie.original_name}
//                     </p>
//                   )}

//                 <div
//                   // ref={statsRef}
//                   className="movie-stats flex-wrap max-w-md mt-4"
//                 >
//                   <div className="stat-item">
//                     <Calendar className="w-4 h-4" />
//                     <span>
//                       {formatDate(movie?.release_date || movie?.first_air_date)}
//                     </span>
//                   </div>

//                   <div className="stat-item">
//                     <Globe className="w-4 h-4" />
//                     <span className="uppercase">
//                       {movie?.original_language}
//                     </span>
//                   </div>

//                   {movie.status && (
//                     <div className="stat-item">
//                       <Info className="w-4 h-4" />
//                       <span>{movie.status}</span>
//                     </div>
//                   )}

//                   {mediaType === "tv" && movie.number_of_seasons && (
//                     <div className="stat-item">
//                       <Film className="w-4 h-4" />
//                       <span>{movie.number_of_seasons} Seasons</span>
//                     </div>
//                   )}

//                   {mediaType === "tv" && movie.number_of_episodes && (
//                     <div className="stat-item">
//                       <Video className="w-4 h-4" />
//                       <span>{movie.number_of_episodes} Episodes</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="w-full">
//               {movie?.overview && (
//                 <div
//                   // ref={overviewRef}
//                   className="overview-section backdrop-blur-xl"
//                 >
//                   <h2 className="text-2xl font-bold text-white mb-4">
//                     Overview
//                   </h2>
//                   <p className="text-light-200 leading-relaxed text-base">
//                     {movie?.overview}
//                   </p>
//                 </div>
//               )}

//               {movie?.genres && movie?.genres?.length > 0 && (
//                 <div
//                   // ref={genresRef}
//                   className="flex flex-wrap gap-2 mt-4"
//                 >
//                   {movie.genres.map((genre) => (
//                     <span
//                       key={genre.id}
//                       className="genre-tag px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-indigo-600 transition-colors"
//                     >
//                       {genre.name}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {trailer && (
//             <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg">
//               <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
//                 Trailer
//               </h2>
//               <div className="aspect-w-16 aspect-h-9">
//                 <iframe
//                   className="w-full h-64 md:h-96 rounded-lg"
//                   src={`https://www.youtube.com/embed/${trailer.key}`}
//                   title="YouTube video player"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             </div>
//           )}

//           {credits?.cast && credits.cast.length > 0 && (
//             <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg">
//               <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
//                 Top Cast
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {credits.cast.slice(0, 12).map((actor) => (
//                   <div
//                     key={actor.id}
//                     className="flex flex-col items-center justify-center text-center"
//                   >
//                     <div className="w-24 md:w-32 h-32 md:h-44 mb-2 rounded-lg overflow-hidden bg-gray-800">
//                       {actor.profile_path ? (
//                         <img
//                           src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
//                           alt={actor.name}
//                           decoding="async"
//                           loading="lazy"
//                           className="w-full h-full object-cover object-top"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <User className="w-8 h-8 text-gray-400" />
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-sm font-medium text-white truncate">
//                       {actor.name}
//                     </p>
//                     <p className="text-xs text-gray-400 truncate">
//                       {actor.character}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default SingleMovie;

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Globe,
  Calendar,
  Film,
  ChevronLeft,
  Video,
  Info,
} from "lucide-react";
import Spinner from "./Spinner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tmdbApi } from "../utils/api";
import { User } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import { MovieDetailSkeleton, SkeletonBox } from "./shared/SkeletonLoader";

gsap.registerPlugin(ScrollTrigger);

const SingleMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.includes("/movie") ? "movie" : "tv";

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        setError("No movie ID provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let movieData, creditsData, videosData;

        if (mediaType === "movie") {
          [movieData, creditsData, videosData] = await Promise.all([
            tmdbApi.getMovieDetails(id),
            tmdbApi.getMovieCredits(id),
            tmdbApi.getMovieVideos(id),
          ]);
        } else {
          [movieData, creditsData] = await Promise.all([
            tmdbApi.getTVShowDetails(id),
            tmdbApi.getTVShowCredits(id),
          ]);
          videosData = { results: [] };
        }

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
      } catch (err) {
        const errorMessage =
          err.message || "Failed to fetch movie details. Please try again.";
        setError(errorMessage);
        console.error("Error fetching details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const refetchDetails = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      let movieData, creditsData, videosData;

      if (mediaType === "movie") {
        [movieData, creditsData, videosData] = await Promise.all([
          tmdbApi.getMovieDetails(id),
          tmdbApi.getMovieCredits(id),
          tmdbApi.getMovieVideos(id),
        ]);
      } else {
        [movieData, creditsData] = await Promise.all([
          tmdbApi.getTVShowDetails(id),
          tmdbApi.getTVShowCredits(id),
        ]);
        videosData = { results: [] };
      }

      setMovie(movieData);
      setCredits(creditsData);
      setVideos(videosData);
    } catch (err) {
      const errorMessage =
        err.message || "Failed to refetch movie details. Please try again.";
      setError(errorMessage);
      console.error("Error refetching details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner
  if (isLoading) {
    return (
      // <main className="wrapper">
      //   <div className="text-center py-20">
      //     <Spinner />
      //     <p className="text-gray-400 mt-4">Loading {mediaType === "movie" ? "movie" : "TV show"} details...</p>
      //   </div>
      // </main>
      <main>
        <div className="wrapper">
          <div className="mb-8 flex items-center justify-end gap-2">
            <SkeletonBox className="h-10 w-20 rounded-lg" />
            <SkeletonBox className="h-10 w-10 rounded-lg" />
          </div>

          <div className="space-y-4">
            {/* Hero Section Skeleton */}
            <div className="movie-card movie-hero overflow-hidden flex flex-col justify-center items-center gap-y-4 relative">
              {/* Backdrop skeleton */}
              {/* <SkeletonBox className="absolute inset-0 w-full h-full animate-none" /> */}

              {/* Content */}
              <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-4 z-10 relative">
                {/* Poster skeleton */}
                <SkeletonBox className="w-[180px] h-[250px] rounded-lg flex-shrink-0" />

                {/* Movie info skeleton */}
                <div className="text-left space-y-4">
                  {/* Title and rating */}
                  <div className="flex justify-start items-center gap-x-4">
                    <SkeletonBox className="h-8 w-64" />
                    <SkeletonBox className="h-8 w-16 rounded-full" />
                  </div>

                  {/* Tagline */}
                  <SkeletonBox className="h-4 w-48" />

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 max-w-md">
                    <SkeletonBox className="h-6 w-24" />
                    <SkeletonBox className="h-6 w-16" />
                    <SkeletonBox className="h-6 w-20" />
                    <SkeletonBox className="h-6 w-18" />
                  </div>
                </div>
              </div>

              {/* Overview section skeleton */}
              <div className="w-full space-y-4 z-10 relative backdrop-blur-xl p-6 rounded-lg">
                <SkeletonBox className="h-6 w-24" />
                <div className="space-y-2">
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-3/4" />
                </div>

                {/* Genres skeleton */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <SkeletonBox className="h-8 w-20 rounded-full" />
                  <SkeletonBox className="h-8 w-16 rounded-full" />
                  <SkeletonBox className="h-8 w-24 rounded-full" />
                </div>
              </div>
            </div>

            {/* Trailer section skeleton */}
            <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg">
              <SkeletonBox className="h-6 w-16 mb-6" />
              <SkeletonBox className="w-full h-64 md:h-96 rounded-lg" />
            </div>

            {/* Cast section skeleton */}
            <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg">
              <SkeletonBox className="h-6 w-20 mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }, (_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <SkeletonBox className="w-24 md:w-32 h-32 md:h-44 mb-2 rounded-lg" />
                    <SkeletonBox className="h-4 w-20 mb-1" />
                    <SkeletonBox className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main className="wrapper">
        <div className="text-center py-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-300 mb-4">{error}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={refetchDetails}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCcw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              {isLoading ? "Retrying..." : "Try Again"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Show message if no movie data
  if (!movie) {
    return (
      <main className="wrapper">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">
            No {mediaType === "movie" ? "movie" : "TV show"} found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors mx-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const trailer = videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  return (
    <main>
      <div className="wrapper">
        <div className="mb-8 flex items-center justify-end gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={refetchDetails}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh"
          >
            <RefreshCcw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        <div className="space-y-4">
          <div className="movie-card movie-hero overflow-hidden flex flex-col justify-center items-center gap-y-4">
            {movie.backdrop_path && (
              <>
                <div
                  className="movie-backdrop"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                  }}
                />
                <span className="h-full w-full" />
              </>
            )}
            <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-4">
              <div className="w-[180px] h-[250px] rounded-lg overflow-hidden block z-10">
                <img
                  src={
                    movie?.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={movie?.title || movie?.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="text-left">
                <div className="flex justify-start items-center gap-x-4">
                  <div className="movie-title">
                    {movie?.title || movie?.name}
                  </div>
                  <div className="rating-badge">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-white">
                      {movie?.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>

                {movie?.tagline && (
                  <p className="movie-tagline mt-2 text-gray-300 italic">
                    &quot;{movie.tagline}&quot;
                  </p>
                )}
                {movie?.original_title &&
                  movie.original_title !== (movie.title || movie.name) && (
                    <p className="movie-tagline mt-2">
                      Original Title:{" "}
                      {movie.original_title || movie.original_name}
                    </p>
                  )}

                <div className="movie-stats flex-wrap max-w-md mt-4">
                  <div className="stat-item">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(movie?.release_date || movie?.first_air_date)}
                    </span>
                  </div>

                  <div className="stat-item">
                    <Globe className="w-4 h-4" />
                    <span className="uppercase">
                      {movie?.original_language}
                    </span>
                  </div>

                  {movie.status && (
                    <div className="stat-item">
                      <Info className="w-4 h-4" />
                      <span>{movie.status}</span>
                    </div>
                  )}

                  {mediaType === "tv" && movie.number_of_seasons && (
                    <div className="stat-item">
                      <Film className="w-4 h-4" />
                      <span>{movie.number_of_seasons} Seasons</span>
                    </div>
                  )}

                  {mediaType === "tv" && movie.number_of_episodes && (
                    <div className="stat-item">
                      <Video className="w-4 h-4" />
                      <span>{movie.number_of_episodes} Episodes</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              {movie?.overview && (
                <div className="overview-section backdrop-blur-xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Overview
                  </h2>
                  <p className="text-light-200 leading-relaxed text-base">
                    {movie?.overview}
                  </p>
                </div>
              )}

              {movie?.genres && movie?.genres?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="genre-tag px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-indigo-600 transition-colors"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {trailer && (
            <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                Trailer
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-64 md:h-96 rounded-lg"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {credits?.cast && credits.cast.length > 0 && (
            <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                Top Cast
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {credits.cast.slice(0, 12).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-24 md:w-32 h-32 md:h-44 mb-2 rounded-lg overflow-hidden bg-gray-800">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          decoding="async"
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-white truncate">
                      {actor.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SingleMovie;
