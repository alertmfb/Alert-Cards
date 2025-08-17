// stores/cardRequestStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

/* ============================================================================ */
/* TYPES                                                                        */
/* ============================================================================ */

export type CardDetails = {
  scheme?: string;
  variant?: string;
  nameOnCard?: string;
  requestType?: string;
  reason?: string;
  branch?: string;
  channel?: string;
};

export type CustomerDetails = {
  accountNumber: string;
  accountName: string;
  phone?: string;
};

export type CardRequest = {
  id: string;
  customer: CustomerDetails;
  cardDetails: CardDetails;
  documents: File[];
  createdAt: string;
  updatedAt: string;
  status: "draft" | "pending" | "approved" | "rejected";
};

type Draft = Omit<CardRequest, "id" | "createdAt" | "updatedAt" | "status"> & {
  customer: Partial<CustomerDetails>;
  cardDetails: Partial<CardDetails>;
};

/* ============================================================================ */
/* CONSTANTS                                                                    */
/* ============================================================================ */

const MAX_REQUESTS = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

/* ============================================================================ */
/* INITIAL STATE                                                                */
/* ============================================================================ */

const initialDraft: Draft = {
  customer: {
    accountNumber: "",
    accountName: "",
    phone: "",
  },
  cardDetails: {
    scheme: "",
    variant: "",
    nameOnCard: "",
    requestType: "",
    reason: "",
    branch: "",
    channel: "",
  },
  documents: [],
};

/* ============================================================================ */
/* STORE INTERFACE                                                              */
/* ============================================================================ */

interface CardRequestState {
  /* ---- Persisted State ---- */
  requests: CardRequest[];

  /* ---- In-Memory Draft ---- */
  draft: Draft;

  /* ---- Draft Actions ---- */
  patchDraft: (patch: Partial<Draft>) => void;
  patchCustomer: (patch: Partial<CustomerDetails>) => void;
  patchCardDetails: (patch: Partial<CardDetails>) => void;
  addDocument: (file: File) => boolean;
  removeDocument: (index: number) => void;
  resetDraft: () => void;

  /* ---- Request Actions ---- */
  commitDraft: () => boolean;
  deleteRequest: (id: string) => void;
  editRequest: (id: string) => void;
  updateRequestStatus: (id: string, status: CardRequest["status"]) => void;

  /* ---- Utility Actions ---- */
  getRequestById: (id: string) => CardRequest | undefined;
  getRequestsByAccount: (accountNumber: string) => CardRequest[];
  validateDraft: () => { isValid: boolean; errors: string[] };
  canAddMoreRequests: () => boolean;
  getTotalRequestsCount: () => number;
}

/* ============================================================================ */
/* VALIDATION HELPERS                                                           */
/* ============================================================================ */

const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Only JPEG, PNG, and PDF files are allowed",
    };
  }

  return { isValid: true };
};

const validateDraftData = (
  draft: Draft
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Customer validation
  if (!draft.customer.accountNumber?.trim()) {
    errors.push("Account number is required");
  }

  if (!draft.customer.accountName?.trim()) {
    errors.push("Customer name is required");
  }

  // Card details validation
  if (!draft.cardDetails.scheme?.trim()) {
    errors.push("Card scheme is required");
  }

  if (!draft.cardDetails.nameOnCard?.trim()) {
    errors.push("Name on card is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/* ============================================================================ */
/* ZUSTAND STORE IMPLEMENTATION                                                 */
/* ============================================================================ */

export const useCardRequestStore = create<CardRequestState>()(
  persist(
    (set, get) => ({
      /* ---- Initial State ---- */
      requests: [],
      draft: initialDraft,

      /* ---- Draft Actions ---- */
      patchDraft: (patch) =>
        set((state) => ({
          draft: { ...state.draft, ...patch },
        })),

      patchCustomer: (patch) =>
        set((state) => ({
          draft: {
            ...state.draft,
            customer: { ...state.draft.customer, ...patch },
          },
        })),

      patchCardDetails: (patch) =>
        set((state) => ({
          draft: {
            ...state.draft,
            cardDetails: { ...state.draft.cardDetails, ...patch },
          },
        })),

      addDocument: (file) => {
        const validation = validateFile(file);
        if (!validation.isValid) {
          return false;
        }

        const { draft } = get();

        // Check for duplicate files
        const isDuplicate = draft.documents.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        );

        if (isDuplicate) {
          return false;
        }

        set((state) => ({
          draft: {
            ...state.draft,
            documents: [...state.draft.documents, file],
          },
        }));

        return true;
      },

      removeDocument: (index) =>
        set((state) => ({
          draft: {
            ...state.draft,
            documents: state.draft.documents.filter((_, i) => i !== index),
          },
        })),

      resetDraft: () => set({ draft: initialDraft }),

      /* ---- Request Actions ---- */
      commitDraft: () => {
        const { draft, requests } = get();

        // Validate draft
        const validation = validateDraftData(draft);
        if (!validation.isValid) {
          return false;
        }

        // Check request limit
        if (requests.length >= MAX_REQUESTS) {
          return false;
        }

        // Create new request
        const now = new Date().toISOString();
        const newRequest: CardRequest = {
          id: nanoid(),
          customer: {
            accountNumber: draft.customer.accountNumber!,
            accountName: draft.customer.accountName!,
            phone: draft.customer.phone || "",
          },
          cardDetails: { ...draft.cardDetails } as CardDetails,
          documents: [...draft.documents],
          createdAt: now,
          updatedAt: now,
          status: "draft",
        };

        set((state) => ({
          requests: [...state.requests, newRequest],
          draft: {
            ...initialDraft,
            customer: {
              // Keep account details for next request
              accountNumber: draft.customer.accountNumber,
              accountName: draft.customer.accountName,
              phone: draft.customer.phone,
            },
          },
        }));

        return true;
      },

      deleteRequest: (id) =>
        set((state) => ({
          requests: state.requests.filter((request) => request.id !== id),
        })),

      editRequest: (id) => {
        const request = get().requests.find((r) => r.id === id);
        if (!request) return;

        // Load request data into draft for editing
        set({
          draft: {
            customer: { ...request.customer },
            cardDetails: { ...request.cardDetails },
            documents: [...request.documents],
          },
        });

        // Remove the request from the list since we're editing it
        set((state) => ({
          requests: state.requests.filter((r) => r.id !== id),
        }));
      },

      updateRequestStatus: (id, status) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id
              ? { ...request, status, updatedAt: new Date().toISOString() }
              : request
          ),
        })),

      /* ---- Utility Actions ---- */
      getRequestById: (id) => {
        return get().requests.find((request) => request.id === id);
      },

      getRequestsByAccount: (accountNumber) => {
        return get().requests.filter(
          (request) => request.customer.accountNumber === accountNumber
        );
      },

      validateDraft: () => {
        const { draft } = get();
        return validateDraftData(draft);
      },

      canAddMoreRequests: () => {
        const { requests } = get();
        return requests.length < MAX_REQUESTS;
      },

      getTotalRequestsCount: () => {
        return get().requests.length;
      },
    }),
    {
      name: "card-request-storage",
      // Only persist requests, not the draft
      partialize: (state) => ({ requests: state.requests }),
    }
  )
);

/* ============================================================================ */
/* EXPORT TYPES AND CONSTANTS                                                  */
/* ============================================================================ */

export { MAX_REQUESTS, MAX_FILE_SIZE, ALLOWED_FILE_TYPES };
