/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../constants/nav-links";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Search,
  Menu,
  X,
  Film,
  Monitor,
} from "lucide-react";

const Navbar = React.memo(function Navbar({
  activeTab,
  setActiveTab,
  tabsRef,
}) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-navbar", "desktop-nav")) {
        setIsMobileMenuOpen(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleTabChange = useCallback(
    (tabId) => {
      setActiveTab(tabId);
      const link = NAV_LINKS.find((link) => link.id === tabId);
      if (link) {
        navigate(link.path);
      }
      setIsExpanded(false);
      setIsMobileMenuOpen(false);
    },
    [navigate, setActiveTab]
  );

  const handleHomeClick = useCallback(() => {
    handleTabChange("home");
  }, [handleTabChange]);

  const handleSearchClick = useCallback(() => {
    navigate("/search");
    // setActiveTab("search");
    handleTabChange("search");
  }, [handleTabChange, navigate]);

  // Create tabs from NAV_LINKS, filtering out home
  const tabs = useMemo(
    () => NAV_LINKS.filter((link) => link.id !== "home"),
    []
  );

  // Divide tabs into primary and secondary for desktop
  const primaryTabs = useMemo(() => tabs.slice(0, 3), [tabs]);
  const secondaryTabs = useMemo(() => tabs.slice(3), [tabs]);

  const getTabIcon = useCallback((tabId) => {
    const iconMap = {
      movies: <Film className="w-4 h-4" />,
      tvshows: <Monitor className="w-4 h-4" />,
      popular: <Film className="w-4 h-4" />,
      toprated: <Film className="w-4 h-4" />,
      discover: <Film className="w-4 h-4" />,
    };
    return iconMap[tabId] || <Film className="w-4 h-4" />;
  }, []);

  const MobileNavbar = useMemo(
    () => (
      <div className="mobile-navbar md:hidden">
        {/* Clean Mobile Header */}
        <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-white/10 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left: Logo/Home */}
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-active:scale-95 transition-transform">
                <Home className="w-4 h-4 text-black" />
              </div>
              <span className="text-white font-medium text-lg tracking-tight">
                Movies
              </span>
            </button>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleSearchClick}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute top-20 right-4 left-4 bg-black/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-6">
                {/* Current Section Indicator */}
                {activeTab && activeTab !== "home" && (
                  <div className="mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                        {getTabIcon(activeTab)}
                      </div>
                      <span className="text-white/60 text-sm font-medium">
                        Current:{" "}
                        {NAV_LINKS.find((link) => link.id === activeTab)?.name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`group p-4 rounded-2xl transition-all duration-200 active:scale-95 ${
                        activeTab === tab.id
                          ? "bg-white text-black"
                          : "bg-white/5 hover:bg-white/10 text-white"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`transition-colors ${
                            activeTab === tab.id
                              ? "text-black"
                              : "text-white/70 group-hover:text-white"
                          }`}
                        >
                          {getTabIcon(tab.id)}
                        </div>
                        <span className="text-sm font-medium">{tab.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleHomeClick}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all active:scale-95"
                    >
                      <Home className="w-4 h-4" />
                      <span className="text-sm font-medium">Home</span>
                    </button>
                    <button
                      onClick={handleSearchClick}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all active:scale-95"
                    >
                      <Search className="w-4 h-4" />
                      <span className="text-sm font-medium">Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    [
      isMobileMenuOpen,
      activeTab,
      tabs,
      handleTabChange,
      handleHomeClick,
      handleSearchClick,
      getTabIcon,
    ]
  );

  // Desktop Navbar Component - Clean & Minimal
  const DesktopNavbar = useMemo(
    () => (
      <div
        ref={tabsRef}
        className={`desktop-nav hidden md:block fixed left-1/2 top-4 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl px-3 py-2 z-50 shadow-2xl border border-white/10 rounded-3xl transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            {/* Home Button */}
            <button
              onClick={handleHomeClick}
              className={`p-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeTab === "home"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              title="Home"
            >
              <Home className="w-4 h-4" />
            </button>

            {/* Primary Tabs */}
            {primaryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-3 rounded-full transition-all duration-200 font-medium hover:scale-105 active:scale-95 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.name}
              </button>
            ))}

            <button
              onClick={handleSearchClick}
              className={`px-4 py-3 rounded-full transition-all duration-200 font-medium hover:scale-105 active:scale-95 whitespace-nowrap ${
                activeTab === "search"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Search />
            </button>

            {secondaryTabs.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-4 py-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span className="font-medium text-sm">More</span>
                {isExpanded ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            )}
          </div>

          {isExpanded && secondaryTabs.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10 animate-fadeIn">
              {secondaryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 font-medium hover:scale-105 active:scale-95 text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    [
      activeTab,
      primaryTabs,
      secondaryTabs,
      isExpanded,
      handleTabChange,
      handleHomeClick,
      handleSearchClick,
      tabsRef,
    ]
  );

  return <>{isMobile ? MobileNavbar : DesktopNavbar}</>;
});

Navbar.displayName = "Navbar";

export default Navbar;
