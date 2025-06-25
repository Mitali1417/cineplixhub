import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import SingleMovie from "./components/SingleMovie.jsx";
import Preloader from "./components/ui/Preloader.jsx";
import NetworkStatus from "./components/ui/NetworkStatus.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import MovieLayout from "./components/layout/MovieLayout.jsx";
import { Suspense } from "react";
import LoadingScreen from "./components/ui/LoadingScreen.jsx";
import NotFound from "./components/shared/NotFound.jsx";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SmoothScroll from "./components/ui/SmoothScroll.jsx";
import SearchMovies from "./components/SearchMovies.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes default
      cacheTime: 10 * 60 * 1000, // 10 minutes default
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingScreen />}>
        <Router>
          <SmoothScroll />
          <Preloader>
            <NetworkStatus />
            <Routes>
              <Route element={<MovieLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<SingleMovie />} />
                <Route path="/movies" element={<Movies defaultTab="movies" />} />
                <Route path="/tv-shows" element={<Movies defaultTab="tvshows" />} />
                <Route
                  path="/top-rated"
                  element={<Movies defaultTab="toprated" />}
                />
                <Route
                  path="/popular"
                  element={<Movies defaultTab="popular" />}
                />
                <Route
                  path="/discover"
                  element={<Movies defaultTab="discover" />}
                />
                <Route
                  path="/genres"
                  element={<Movies defaultTab="genres" />}
                />
                {/* <Route
                  path="/search"
                  element={<Movies defaultTab="search" />}
                /> */}
                <Route
                  path="/search"
                  element={<SearchMovies/>}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Preloader>
        </Router>
      </Suspense>
       {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;