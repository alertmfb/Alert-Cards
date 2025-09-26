import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateCard,
  activateCardApproval,
  approveBlockRequest,
  blockCard,
  declinceBlockRequest,
  getCardActivations,
  getCardBlocks,
  getCardChartData,
  getCardRequest,
  getCardSummary,
  getCardTransfer,
  getCustomerCard,
  getNotifications,
  requestBulkRequests,
  updateNotification,
  uploadPin,
  verifyAccount,
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

export function useGetCustomerVerificationMutation() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: ({ accountNumber }: { accountNumber: string }) =>
      verifyAccount(accountNumber),
    retry: false,
    onError: (error: any) => {
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
  const { data, error, isPending, refetch } = useQuery({
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
    refetch,
    isPending,
  };
}

export function useApproveCardApproval() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: approveBlockRequest,

    onSuccess() {
      toast.success("Card block approved successful");
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

export function useDeclineCardApproval() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: declinceBlockRequest,

    onSuccess() {
      toast.success("Card block declined successful");
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

export function useRequestBulkCards() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: requestBulkRequests,

    onSuccess() {
      toast.success("Bulk card requested successful");
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

export function useUploadPin() {
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: uploadPin,

    onSuccess() {
      toast.success("Pin uploaded successfully");
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

export function useGetNotifications() {
  const { data, error, isPending } = useQuery({
    queryKey: ["notification"],
    queryFn: () => getNotifications(),
    retry: true,
  });

  if (error) {
    // toast.error(error.message);
    console.log(error);
  }

  return {
    data,
    error,
    isPending,
  };
}

export function useUpdateNotification() {
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: updateNotification,

    onSuccess() {
      toast.success("Notification updated successful");
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
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
