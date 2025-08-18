import { useQuery } from "@tanstack/react-query";
import {
  getCardChartData,
  getCardRequest,
  getCardSummary,
} from "@/api/services/card";

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

export function useGetCardSummary() {
  const { data, error, isPending } = useQuery({
    queryKey: ["cardSummary"],
    queryFn: () => getCardSummary(),
    retry: false,
  });

  if (error) {
    // toast.error(error.message);
    console.log(error);
  }

  return {
    data: data,
    error,
    isPending,
  };
}

export function useGetChartData() {
  const { data, error, isPending } = useQuery({
    queryKey: ["cardChartDataList"],
    queryFn: () => getCardChartData(),
    retry: false,
  });

  if (error) {
    // toast.error(error.message);
    console.log(error);
  }

  return {
    data: data,
    error,
    isPending,
  };
}
