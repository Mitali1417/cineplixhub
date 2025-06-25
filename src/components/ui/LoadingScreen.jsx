// components/LoadingScreen.jsx
import PropTypes from "prop-types";

const LoadingScreen = ({ progress }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col justify-center items-center w-full px-4">
        <div className="mb-4 text-[38px] md:text-[70px] font-extrabold text-center text-white text-xl">
          Loading {progress}%
        </div>
        <div className="h-4 w-full max-w-3xs md:max-w-md bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-4 text-center text-gray-400">
          Please wait while we load everything...
        </div>
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default LoadingScreen;
