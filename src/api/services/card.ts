import { axiosInstance } from "@/lib/axios";
import type {
  BlockCardResponse,
  CardActivationResponse,
  CardResponse,
  CardSummaryResponse,
  CardTransferResponse,
  CustomerCardResponse,
  CustomerVerificationResponse,
} from "@/types/card";

export const getCardRequest = async (): Promise<CardResponse> => {
  const res = await axiosInstance.get<CardResponse>("/cards/requests");
  return res.data;
};

export const getCardSummary = async (): Promise<CardSummaryResponse> => {
  const res = await axiosInstance.get<CardSummaryResponse>(
    "/cards/requests/summary"
  );
  return res.data;
};

export const getCardChartData = async (): Promise<any> => {
  const res = await axiosInstance.get<any>("/cards/requests/chart-data");
  return res.data;
};

export const getCardTransfer = async (): Promise<CardTransferResponse> => {
  const res = await axiosInstance.get<CardTransferResponse>(
    "/cards/requests/transfers"
  );
  return res.data;
};

export const getCustomerCard = async (
  accountNumber: string,
  type: string
): Promise<CustomerCardResponse> => {
  const res = await axiosInstance.get<CustomerCardResponse>(
    `/customers/card?accountNumber=${accountNumber}&type=${type}`
  );
  return res.data;
};

export const verifyAccount = async (
  accountNumber: string
): Promise<CustomerVerificationResponse> => {
  const res = await axiosInstance.get<CustomerVerificationResponse>(
    `/customers/verify?accountNumber=${accountNumber}`
  );
  return res.data;
};

// export const activateCard =  async (data: LoginRequest): Promise<LoginResponse> => {
//   try {
//     const response = await axiosInstance.post<LoginResponse>(
//       "/auth/sign-in",
//       data
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Login API error:", error);
//     throw error;
//   }
// },

export const getCardActivations = async (): Promise<CardActivationResponse> => {
  const res = await axiosInstance.get<CardActivationResponse>(
    `/cards/activations`
  );
  return res.data;
};

export const activateCard = async (data: {
  cardId: string;
}): Promise<{ cardId: string }> => {
  try {
    const response = await axiosInstance.post<any>(
      "/cards/activations/request",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Card activation API error:", error);
    throw error;
  }
};

export const activateCardApproval = async (data: {
  activationRequestId: string;
}): Promise<{ activationRequestId: string }> => {
  try {
    const response = await axiosInstance.post<any>(
      "/cards/activations/approve",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Card activation API error:", error);
    throw error;
  }
};

// BLOCK

export const getCardBlocks = async (
  type: string
): Promise<BlockCardResponse> => {
  const res = await axiosInstance.get<BlockCardResponse>(
    `/cards/block/requests?type=${type}`
  );
  return res.data;
};
export const blockCard = async (data: {
  cardId: string;
  type: string;
  reason: string;
}): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(
      "/cards/block/requests",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Card block API error:", error);
    throw error;
  }
};
export const approveBlockRequest = async (data: {
  cardBlockRequestId: string;
  reason: string;
}): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(
      "/cards/block/approve",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Card block API error:", error);
    throw error;
  }
};

export const declinceBlockRequest = async (data: {
  cardBlockRequestId: string;
  reason: string;
}): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>("/cards/block/reject", data);
    return response.data;
  } catch (error) {
    console.error("Card block API error:", error);
    throw error;
  }
};

export const requestBulkRequests = async (data: {
  requests: [
    {
      customerAccountNumber: string;
      customerName: string;
      customerPhoneNumber: string;
      scheme: string;
      variant: string;
      nameOnCard: string;
      requestType: string;
      reissueReason: string;
      pickUpBranchId: string;
      channel: string;
      requestDocumentUrl: string;
      chargeWaive: boolean;
      chargeWaiveReason: string;
    }
  ];
}): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(
      "/cards/requests/bulk",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Card block API error:", error);
    throw error;
  }
};
