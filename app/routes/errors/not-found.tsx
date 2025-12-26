const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a href="/" className="text-blue-400 hover:text-blue-600 underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
