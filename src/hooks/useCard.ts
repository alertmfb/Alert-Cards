import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCardChartData,
  getCardRequest,
  getCardSummary,
  getCardTransfer,
  getCustomerCard,
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

export function useGetCardTransfer() {
  const { data, error, isPending } = useQuery({
    queryKey: ["cardTransfer"],
    queryFn: () => getCardTransfer(),
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

export function useGetCustomerCardMutation() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: ({
      accountNumber,
      type,
    }: {
      accountNumber: string;
      type: string;
    }) => getCustomerCard(accountNumber, type),
    retry: false,
    onError: (error) => {
      console.error(error);
      // toast.error(error.message);
    },
  });

  return {
    getCustomerCard: mutate,
    data,
    error,
    isPending,
    isSuccess,
  };
}
