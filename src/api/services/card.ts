import { axiosInstance } from "@/lib/axios";
import type {
  CardResponse,
  CardSummaryResponse,
  CardTransferResponse,
  CustomerCardResponse,
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
