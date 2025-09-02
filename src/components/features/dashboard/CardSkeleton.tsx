const CardSkeleton = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between pb-2">
          <div className="w-16 h-4 bg-muted-foreground/50 rounded"></div>
          <div className="w-4 h-4 bg-muted-foreground/50 rounded"></div>
        </div>
        <div className="text-2xl font-bold font-geist-mono">
          <div className="flex items-center">
            <div className="h-8 w-8 border-t-4 border-t-transparent border-r-4 border-r-transparent animate-spin border-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="mt-1">
          <div className="w-24 h-3 bg-muted-foreground/50 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const CardSkeletonLoader = () => {
  const skeletons = new Array(4).fill(null);

  return (
    <>
      {skeletons.map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
};

export default CardSkeletonLoader;
