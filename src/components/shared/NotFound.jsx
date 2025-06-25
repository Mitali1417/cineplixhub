
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">Page Not Found</p>
      <p className="text- text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
    </div>
  );
};

export default NotFound;