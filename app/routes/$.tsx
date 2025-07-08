// Create app/routes/$.tsx
import { useLocation } from "react-router";
import { useEffect } from "react";

export default function CatchAllRoute() {
  const location = useLocation();

  useEffect(() => {
    // Log unmatched routes in development for debugging
    if (import.meta.env.DEV) {
      console.warn(`Unmatched route: ${location.pathname}`);
    }
  }, [location.pathname]);

  // Handle DevTools and Chrome extension requests silently
  if (
    location.pathname.includes(".well-known") ||
    location.pathname.includes("devtools") ||
    location.pathname.includes("chrome-extension") ||
    location.pathname.includes("appspecific")
  ) {
    // Return empty response for these requests
    return new Response(null, { status: 404 });
  }

  // For other unmatched routes, show a 404 page
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
