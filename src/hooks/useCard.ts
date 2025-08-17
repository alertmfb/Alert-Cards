import { useQuery } from "@tanstack/react-query";
import { getCardRequest } from "@/api/services/card";

export function useGetCards() {
  const { data, error, isPending } = useQuery({
    queryKey: ["cardRequestList"],
    queryFn: () => getCardRequest(),
    retry: false,
  });

  if (error) {
    // toast.error(error.message);
    console.log(error);
  }
  console.log(data, "wha tis going on");
  return {
    data: data,
    error,
    isPending,
  };
}
