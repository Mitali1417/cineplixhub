import './MovieLoader.css';

const MovieLoader = () => {
  return (
    <div className="movie-loader-skeleton movie-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-rating"></div>
    </div>
  );
};

export default MovieLoader;