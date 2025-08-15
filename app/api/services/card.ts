import { axiosInstance } from "~/lib/axios";
import type { CardResponse } from "~/types/card";

export const getCardRequest = async (): Promise<CardResponse> => {
  const res = await axiosInstance.get<CardResponse>("/cards/requests");
  console.log(res);
  return res.data;
};
