import { useRef, useCallback } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TrendingMovies from "../Movies/components/TrendingMovies.jsx";
import AllMovies from "../Movies/components/AllMovies.jsx";
import { useInfiniteTopRatedMovies } from "../../hooks/useTMDBQueries.js";
import { CustomCursor } from "../../components/ui/CustomCursor.jsx";
import CircularTextRing from "../../components/ui/CircularTextRing.jsx";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

export const HeroMovieSlider = () => {
  const { data: topRatedMoviesData } = useInfiniteTopRatedMovies();
  const topRatedMovies = topRatedMoviesData?.pages[0]?.results;

  const handleImageError = useCallback((e) => {
    const target = e.target;
    target.onerror = null;
    target.src = "/placeholder.svg";
  }, []);
  return (
    <div className="banner">
      <div
        className="slider"
        style={{ "--quantity": Math.min(topRatedMovies?.length, 7) }}
      >
        {topRatedMovies?.slice(0, 7).map((movie, index) => (
          <div
            className="item"
            style={{ "--position": index + 1 }}
            key={movie.id}
          >
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/placeholder.svg"
              }
              alt={movie?.title || "Movie poster"}
              onError={handleImageError}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroHeader = () => {
  const heroTextRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(heroTextRef);

    // Set initial state
    gsap.set(q("span"), { opacity: 0, y: 30, scale: 0.9 });

    // Timeline animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(q("span:nth-child(1)"), {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.6,
      ease: "elastic.out(1.2, 0.7)",
    }).to(
      q("span:nth-child(2)"),
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: "elastic.out(1.2, 0.7)",
      },
      "<+0.2"
    );

    // ScrollTrigger for marquee
    // gsap.fromTo(
    //   ".marquee-container",
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1,
    //     ease: "power2.out",
    //     scrollTrigger: {
    //       trigger: ".marquee-container",
    //       start: "top 90%",
    //       end: "bottom 10%",
    //       toggleActions: "play none none reverse",
    //     },
    //   }
    // );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // const { data: topRatedMoviesData } = useInfiniteTopRatedMovies();
  // const topRatedMovies = topRatedMoviesData?.pages[0]?.results;

  // const handleImageError = useCallback((e) => {
  //   const target = e.target;
  //   target.onerror = null;
  //   target.src = "/placeholder.svg";
  // }, []);

  return (
    <header className="flex flex-col md:mb-12">
      <div className="relative">
        <div
          ref={heroTextRef}
          className="relative translate-y-3/4 w-fit mx-auto flex text-[85px] md:text-[170px] xl:text-[240px] font-[1000] md:leading-64 justify-center"
        >
          <span
            data-cursor-scale="2.5"
            className="font-playfair font-extrabold opacity-0 text-white"
          >
            Cine
          </span>
          <span
            data-cursor-scale="2.5"
            className="font-playfair font-extrabold text-gradient opacity-0 transform translate-y-5 scale-90"
          >
            plix
          </span>
          <p className="text-white absolute bottom-2 md:bottom-6 xl:-bottom-1 left-8 md:left-[136px] xl:left-[300px] right-0 mx-auto pointer-events-none font-light text-xs md:text-lg">
            Find Movies You will Enjoy{" "}
            <span className="ml-8 md:ml-18">Without the Hassle</span>
          </p>
        </div>

        {/* <span className="!pointer-events-none text-yellow-200/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[280px] xl:text-[440px] font-[1000]">
          Cineplix
        </span> */}
      </div>

      {/* {topRatedMovies && topRatedMovies.length > 0 && (
        <div className="flex flex-row items-center justify-center gap-4 my-8 w-fit self-center h-full marquee-container">
          {topRatedMovies.slice(0, 7).map((movie, index) => (
            <div
              className={`relative group rounded-lg overflow-hidden shadow-md transition-all duration-500 ease-in-out 
              h-[80px] md:h-[120px] cursor-pointer`}
              key={movie.id}
            >
              <img
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "/placeholder.svg"
                }
                alt={movie?.title || "Movie poster"}
                width={index % 2 === 0 ? 180 : 120}
                height={index % 2 === 0 ? 270 : 180}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      )} */}
    </header>
  );
};

const HomeContent = () => {
  return (
    <main className="relative">
      <CircularTextRing
        text="Cineplix • "
        radius={5}
        fontSize={1.5}
        animationDuration={15}
        className="text-white absolute top-10 left-0"
      />
      <CustomCursor enableCustomScales={true} targetSection="#hero-section" />
      <div id="hero-section">
        <HeroMovieSlider />
        <div className="absolute top-44 left-0 right-0">
          <HeroHeader />
        </div>

        <div id="trending-movies">
          <TrendingMovies />
        </div>
      </div>

      <div id="all-movies">
        <AllMovies />
      </div>
    </main>
  );
};

const Home = () => {
  return <HomeContent />;
};

export default Home;
