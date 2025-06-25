/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { memo, useState, useCallback } from "react";
import MovieLoader from "./shared/MovieLoader";
import { useMemo } from "react";

export const MovieCard = memo(({ movie }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = useCallback(() => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  }, [navigate, movie]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = "/placeholder.svg";
    setImageLoaded(true);
  }, []);

  // const randomImageHeightClass = useMemo(() => {
  //   const randomPercent = Math.floor(Math.random() * (170 - 140 + 1)) + 140;
  //   return `pb-[${randomPercent}%]`;
  // }, [movie.id]); 

  const randomImageHeightClass = useMemo(() => {
    const minPercent = 100;
    const maxPercent = 220;
    const randomPercent = Math.floor(Math.random() * (maxPercent - minPercent + 1)) + minPercent;
    return `pb-[${randomPercent}%]`;
  }, []);


  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "/placeholder.svg";

  return (
    <div
      onClick={handleClick}
      className="movie-card group cursor-pointer shadow-lg transition-all duration-500 ease-in-out shadow-transparent hover:shadow-teal-400/20 rounded-lg flex flex-col"
    >
      <div className={`relative ${randomImageHeightClass} w-full pb-[150%] rounded-t-lg`}> {/* Using pb-[150%] for 2:3 aspect ratio (height is 150% of width) */}
        {/* {!imageLoaded && (
          <div className="absolute inset-0">
            <MovieLoader />
          </div>
        )} */}
        <img
          src={imageUrl}
          // srcSet={`${imageUrl} 1x, https://image.tmdb.org/t/p/w780/${movie?.poster_path || ''} 2x`}
          decoding="async"
          alt={movie?.title || "Movie poster"}
          // Made image absolute to fill the aspect-ratio div
          className={`absolute inset-0 w-full h-full scale-110 group-hover:scale-none object-top object-cover duration-500 ease-in-out transition-transform transform ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          // onError={(e) => {
          //   e.target.onerror = null;
          //   e.target.src = "/placeholder.svg";
          // }}
          width="500"
          height="750"
        />
      </div>

      <div className="mt-4 p-2 flex-grow"> {/* Added flex-grow to let this section take available space */}
        <h3 className="font-semibold text-teal-400">
          {movie?.original_title || movie?.original_name}
        </h3>

        <div className="content text-sm text-gray-500 flex gap-2 items-center flex-wrap">
          <div className="rating flex items-center gap-1">
            <img src="star.svg" alt="Star Icon" className="w-4 h-4" />
            <p>
              {movie?.vote_average ? movie?.vote_average.toFixed(1) : "N/A"}
            </p>
          </div>

          <span>•</span>
          <p className="lang uppercase">{movie?.original_language}</p>

          <span>•</span>
          <p className="year">{movie?.release_date?.split("-")[0] || "N/A"}</p>
        </div>


        <p className="text-sm">
          {/* {
            movie?.overview?.length > 150
              ? movie?.overview.substring(0, Math.random() * (movie?.overview?.length - 100) + 100) + '...'
              : movie?.overview || "No overview available"
          } */}
          {
            movie?.overview?.length > 180
              ? movie?.overview.substring(0, Math.floor(Math.random() * 80) + 100) + '...'
              : movie?.overview || "No overview available"
          }

          {/* {movie?.overview?.substring(0, Math.random() * (movie?.overview?.length - 100) + 100) + '...' || "No overview available"} */}
        </p>
      </div>
    </div>
  );
});

export const TrendingMovieCard = memo(({ movie }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = useCallback(() => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  }, [navigate, movie]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = "/placeholder.svg";
    setImageLoaded(true);
  }, []);


  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    : "/placeholder.svg";

  return (
    <div
      onClick={handleClick}
      className="movie-card !p-2 group cursor-pointer border rounded-lg flex flex-col" // Added flex flex-col
    >
      <div className="relative w-full pb-[150%] rounded-t-lg"> {/* Using pb-[150%] for 2:3 aspect ratio */}
        {!imageLoaded && (
          <div className="absolute inset-0">
            <MovieLoader />
          </div>
        )}
        <img
          src={imageUrl}
          // srcSet={`${imageUrl} 1x, https://image.tmdb.org/t/p/w500/${movie?.poster_path || ''} 2x`}
          decoding="async"
          alt={movie?.title || "Movie poster"}
          // Made image absolute to fill the aspect-ratio div
          className={`absolute inset-0 w-full h-full object-top object-cover duration-500 ease-in-out transition-transform transform ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        // width="300"
        // height="450"
        />
      </div>
    </div>
  );
});



MovieCard.displayName = "MovieCard";
TrendingMovieCard.displayName = "TrendingMovieCard";