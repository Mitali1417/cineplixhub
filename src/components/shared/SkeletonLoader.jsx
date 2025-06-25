/* eslint-disable react/prop-types */
export const SkeletonBox = ({ className, style }) => (
  <div
    className={`bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded animate-pulse ${className}`}
    style={{
      backgroundSize: '200px 100%',
      backgroundRepeat: 'no-repeat',
      animation: 'shimmer 1.5s infinite linear',
      ...style
    }}
  />
);

// Movie Card Skeleton for grid
const MovieCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {/* Movie Poster */}
    <SkeletonBox className="w-full h-64" />
    
    <div className="p-4 space-y-3">
      {/* Movie Title */}
      <SkeletonBox className="h-6 w-3/4" />
      
      {/* Release Year */}
      <SkeletonBox className="h-4 w-1/3" />
      
      {/* Rating */}
      <div className="flex items-center space-x-2">
        <SkeletonBox className="h-4 w-4 rounded-full" />
        <SkeletonBox className="h-4 w-16" />
      </div>
      
      {/* Genre Tags */}
      <div className="flex space-x-2">
        <SkeletonBox className="h-6 w-16 rounded-full" />
        <SkeletonBox className="h-6 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

export const MovieListGridSkeleton = ({ count = 12 }) => (
  <div className="container mx-auto px-4 py-8">    
    {/* Header Section */}
    <div className="mb-8 space-y-4">
      <SkeletonBox className="h-8 w-64" />
      <SkeletonBox className="h-4 w-96" />
    </div>
    
    {/* Movie Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
    
  </div>
);

// Movie Detail Page Skeleton
export const MovieDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    
    {/* Hero Section */}
    <div className="relative">
      {/* Backdrop */}
      <SkeletonBox className="w-full h-96" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <SkeletonBox className="w-64 h-96 rounded-lg flex-shrink-0" />
            
            {/* Movie Info */}
            <div className="flex-1 space-y-4 text-white">
              <SkeletonBox className="h-12 w-3/4 bg-gray-400" />
              <SkeletonBox className="h-6 w-1/2 bg-gray-400" />
              
              {/* Rating and Runtime */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <SkeletonBox className="h-6 w-6 rounded-full bg-gray-400" />
                  <SkeletonBox className="h-6 w-16 bg-gray-400" />
                </div>
                <SkeletonBox className="h-6 w-24 bg-gray-400" />
              </div>
              
              {/* Genres */}
              <div className="flex space-x-2">
                <SkeletonBox className="h-8 w-20 rounded-full bg-gray-400" />
                <SkeletonBox className="h-8 w-24 rounded-full bg-gray-400" />
                <SkeletonBox className="h-8 w-16 rounded-full bg-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Content Section */}
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div>
            <SkeletonBox className="h-8 w-32 mb-4" />
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-3/4" />
            </div>
          </div>
          
          {/* Cast */}
          <div>
            <SkeletonBox className="h-8 w-24 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="text-center">
                  <SkeletonBox className="w-20 h-20 rounded-full mx-auto mb-2" />
                  <SkeletonBox className="h-4 w-16 mx-auto mb-1" />
                  <SkeletonBox className="h-3 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Reviews */}
          <div>
            <SkeletonBox className="h-8 w-28 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <SkeletonBox className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <SkeletonBox className="h-4 w-24 mb-1" />
                      <SkeletonBox className="h-3 w-16" />
                    </div>
                    <SkeletonBox className="h-6 w-12" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBox className="h-4 w-full" />
                    <SkeletonBox className="h-4 w-full" />
                    <SkeletonBox className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Movie Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <SkeletonBox className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              <div>
                <SkeletonBox className="h-4 w-20 mb-1" />
                <SkeletonBox className="h-4 w-32" />
              </div>
              <div>
                <SkeletonBox className="h-4 w-16 mb-1" />
                <SkeletonBox className="h-4 w-24" />
              </div>
              <div>
                <SkeletonBox className="h-4 w-24 mb-1" />
                <SkeletonBox className="h-4 w-28" />
              </div>
              <div>
                <SkeletonBox className="h-4 w-20 mb-1" />
                <SkeletonBox className="h-4 w-36" />
              </div>
            </div>
          </div>
          
          {/* Similar Movies */}
          <div className="bg-white p-6 rounded-lg shadow">
            <SkeletonBox className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="flex space-x-3">
                  <SkeletonBox className="w-16 h-24 rounded flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBox className="h-4 w-3/4" />
                    <SkeletonBox className="h-3 w-1/2" />
                    <SkeletonBox className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

