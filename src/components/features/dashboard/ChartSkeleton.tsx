const ChartSkeletonLoader = () => {
  return (
    <div className="rounded-lg flex justify-center items-center bg-card text-card-foreground h-full p-4">
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin "></div>
      </div>
    </div>
  );
};

export default ChartSkeletonLoader;
