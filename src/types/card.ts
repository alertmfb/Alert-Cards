export interface CardData {
  id: string;
  customer: {
    customerName: string;
    accountNumber: string;
  };
  scheme: string;
  variant: string;
  pickUpBranch: {
    id: string;
    name: string;
  };
  deliveryStatus: string;
  card: {
    status: string;
  };
  pan: string;
  createdAt: string;
}

export interface CardResponse {
  status: string;
  message: string;
  data: CardData[];
}

export interface CardSummaryResponse {
  status: string;
  data: {
    cardRequests: number;
    pendingApprovals: number;
    deliveredCards: number;
    blockedCards: number;
  };
  message: string;
}
