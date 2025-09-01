import { useMutation, useQuery } from "@tanstack/react-query";
import {
  activateCard,
  activateCardApproval,
  blockCard,
  getCardActivations,
  getCardBlocks,
  getCardChartData,
  getCardRequest,
  getCardSummary,
  getCardTransfer,
  getCustomerCard,
} from "@/api/services/card";
import { toast } from "sonner";

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
    onError: (error: any) => {
      toast(error?.response?.data?.message);
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

export function useActivateCard() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: activateCard,

    onSuccess() {
      toast.success("Card activation successful");
    },
    onError(error: any) {
      toast(error?.response?.data?.message);
    },
  });

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
  };
}

export function useActivateCardApproval() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: activateCardApproval,

    onSuccess() {
      toast.success("Card approved successful");
    },
    onError(error: any) {
      toast(error?.response?.data?.message);
    },
  });

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
  };
}

export function useBlockCard() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: blockCard,

    onSuccess() {
      toast.success("Card block successful");
    },
    onError(error: any) {
      console.log(error?.response);
      toast(error?.response?.data?.message);
    },
  });

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
  };
}

export function useGetCardActivations() {
  const { data, error, isPending } = useQuery({
    queryKey: ["cardActivationList"],
    queryFn: () => getCardActivations(),
    retry: false,
  });

  if (error) {
    console.log(error);
  }

  return {
    data: data,
    error,
    isPending,
  };
}
export function useGetCardBlocks(type: string) {
  const { data, error, isPending } = useQuery({
    queryKey: ["cardBlockList"],
    queryFn: () => getCardBlocks(type),
    retry: false,
  });

  if (error) {
    console.log(error);
  }

  return {
    data: data,
    error,
    isPending,
  };
}
