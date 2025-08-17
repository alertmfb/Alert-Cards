import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFoundRoute() {
  const location = useLocation();

  useEffect(() => {
    // Log unmatched routes in development for debugging
    if (import.meta.env.DEV) {
      console.warn(`Unmatched route: ${location.pathname}`);
    }
  }, [location.pathname]);

  // For unmatched routes, show a 404 page
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
