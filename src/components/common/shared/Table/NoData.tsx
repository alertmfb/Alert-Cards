import { FileX, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: "file" | "search" | "refresh";
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function NoData({
  title = "No data found",
  description = "There are no records to display at the moment.",
  icon = "file",
  showRetryButton = false,
  onRetry,
  className = "",
}: NoDataProps) {
  const IconComponent = {
    file: FileX,
    search: Search,
    refresh: RefreshCw,
  }[icon];

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      {/* Icon */}
      <div className="mb-4">
        <IconComponent className="h-12 w-12 text-gray-300" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
        {description}
      </p>

      {/* Optional Retry Button */}
      {showRetryButton && onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="flex items-center gap-2 border-[#0DAE94] text-[#0DAE94] hover:bg-[#0DAE94] hover:text-white"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}

// Usage examples for different scenarios:

// Basic usage (default)
// <NoData />

// For search results
// <NoData
//   title="No results found"
//   description="Try adjusting your search terms or filters."
//   icon="search"
// />

// With retry functionality
// <NoData
//   title="Failed to load data"
//   description="Something went wrong while loading the data."
//   icon="refresh"
//   showRetryButton={true}
//   onRetry={() => refetchData()}
// />
