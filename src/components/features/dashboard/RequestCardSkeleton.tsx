import { Card, CardContent, CardHeader } from "@/components/ui";

const RequestCardSkeleton = () => {
  return (
    <CardContent className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border rounded-lg px-4 py-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
            <div>
              <div className="bg-gray-300 h-4 rounded-lg w-32"></div>
            </div>
          </div>

          <div className="text-right">
            <div className="bg-gray-300 h-3 rounded-md w-20 mb-2"></div>
            <div className="bg-gray-300 h-3 rounded-md w-16"></div>
          </div>
        </div>
      ))}
    </CardContent>
  );
};

export default RequestCardSkeleton;
