import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { useRef } from "react";
import useMovieStore from "../../store/movieStore";
import { Suspense } from "react";
import Preloader from "../ui/Preloader";

const MovieLayout = () => {
    const tabsRef = useRef(null);
    const { activeTab, setActiveTab } = useMovieStore();
    return (
        <div className="relative w-full h-full mx-auto px-4 sm:px-6 max-w-[2000px]">
            <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabsRef={tabsRef}
            />
            <Suspense fallback={<Preloader />} className="w-full h-full flex flex-col">
                <Outlet />
            </Suspense>
            <Footer />
        </div>
    );
};

export default MovieLayout;