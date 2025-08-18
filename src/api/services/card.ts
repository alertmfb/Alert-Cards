import { axiosInstance } from "@/lib/axios";
import type { CardResponse } from "@/types/card";

export const getCardRequest = async (): Promise<CardResponse> => {
  const res = await axiosInstance.get<CardResponse>("/cards/requests");
  return res.data;
};
export const getCardSummary = async (): Promise<any> => {
  const res = await axiosInstance.get<CardResponse>("/cards/requests/summary");
  return res.data;
};
export const getCardChartData = async (): Promise<any> => {
  const res = await axiosInstance.get<CardResponse>(
    "/cards/requests/chart-data"
  );
  return res.data;
};
