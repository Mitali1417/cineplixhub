import { useRef, useCallback } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TrendingMovies from "../Movies/components/TrendingMovies.jsx";
import AllMovies from "../Movies/components/AllMovies.jsx";
import { useInfiniteTopRatedMovies } from "../../hooks/useTMDBQueries.js";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);


export const HeroMovieSlider = () => {
   const { data: topRatedMoviesData } = useInfiniteTopRatedMovies();
  const topRatedMovies = topRatedMoviesData?.pages[0]?.results;

  const handleImageError = useCallback((e) => {
    const target = e.target;
    target.onerror = null;
    target.src = "/placeholder.svg";
  }, []);
  return(
  //    <div className="banner">
  //   <div className="slider" style={{ "--quantity": 6 }}>
  //     <div className="item" style={{ "--position": 1 }}>
  //       <img src="https://i.pinimg.com/736x/8c/ee/dc/8ceedc0a853351ef155d8e45d35980e4.jpg" alt="" />
  //     </div>
  //     <div className="item" style={{ "--position": 2 }}>
  //       <img src="https://i.pinimg.com/736x/59/37/8c/59378cda00dfa5edbb1fb7ceac6b2de8.jpg" alt="" />
  //     </div>
  //     <div className="item" style={{ "--position": 3 }}>
  //       <img src="https://i.pinimg.com/736x/b8/af/a9/b8afa905b2e0a9ebbe2a9fa7784e539a.jpg" alt="" />
  //     </div>
  //     <div className="item" style={{ "--position": 4 }}>
  //       <img src="https://i.pinimg.com/736x/37/53/70/37537022ec16117e77a9f4d4462f9289.jpg" alt="" />
  //     </div>
  //     <div className="item" style={{ "--position": 5 }}>
  //       <img src="https://i.pinimg.com/736x/45/00/3d/45003dfb0ab55cb315dc6aa71e94ebe0.jpg" alt="" />
  //     </div>
  //     <div className="item" style={{ "--position": 6 }}>
  //       <img src="https://i.pinimg.com/736x/64/04/bf/6404bf5649121162e1b8c1ca5d329549.jpg" alt="" />
  //     </div>
  //   </div>
  // </div>
  <div className="banner">
  <div className="slider" style={{ "--quantity": Math.min(topRatedMovies?.length, 7) }}>
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
  )
}

const HeroHeader = () => {
  const cineTextRef = useRef(null);
  const plixTextRef = useRef(null);

  useGSAP(() => {
    if (!cineTextRef.current || !plixTextRef.current) return;

    gsap.set([cineTextRef.current], { opacity: 0, y: 10 });
    gsap.set([plixTextRef.current], { opacity: 0, y: -30 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(cineTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "elastic.out(4, 0.8)",
    }).to(
      plixTextRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "bounce.out",
      },
      "-=0.3"
    );

    // Optional: Add scroll-triggered animations
    gsap.fromTo(
      ".marquee-container",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".marquee-container",
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const { data: topRatedMoviesData } = useInfiniteTopRatedMovies();
  const topRatedMovies = topRatedMoviesData?.pages[0]?.results;

  const handleImageError = useCallback((e) => {
    const target = e.target;
    target.onerror = null;
    target.src = "/placeholder.svg";
  }, []);

  return (
    <header className="flex flex-col md:mb-12">
      <div className="!pointer-events-none relative mt-28">
        <h1 className="relative flex text-[85px] md:text-[200px] xl:text-[240px] font-[1000] md:leading-64 w-full justify-center">
          <span ref={cineTextRef} className="opacity-0 pointer-events-none">
            Cine
          </span>
          <span
            ref={plixTextRef}
            className="text-gradient opacity-0 transform translate-y-5 scale-90 !pointer-events-none"
          >
            plix
          </span>
          <p className="absolute bottom-0 left-8 md:left-[110px] xl:left-36 right-0 mx-auto pointer-events-none font-light text-xs md:text-lg">
            Find Movies You will Enjoy{" "}
            <span className="ml-6 md:ml-12">Without the Hassle</span>
          </p>
        </h1>

        <span className="!pointer-events-none text-yellow-200/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[280px] xl:text-[440px] font-[1000]">
          Cineplix
        </span>
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
      <HeroMovieSlider />
     <div className="absolute top-44 left-0 right-0">
      <HeroHeader />
     </div>

      <div id="trending-movies">
        <TrendingMovies />
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
