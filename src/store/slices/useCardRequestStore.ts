import { create } from "zustand";

export type CardRequestFormData = {
  scheme?: string;
  variant?: string;
  nameOnCard?: string;
  requestType?: string;
  reason?: string;
  branch?: string;
  channel?: string;
  waiveCharges?: boolean;
  documents?: File[];
  customer?: {
    name: string;
    phone: string;
    account: string;
  };
  accountBalance?: number;
  cardCost?: number;
};

type CardRequestState = {
  formData: CardRequestFormData;
  setFormData: (data: Partial<CardRequestFormData>) => void;
  resetForm: () => void;
};

export const useCardRequestStore = create<CardRequestState>((set) => ({
  formData: {},
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ formData: {} }),
}));
