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

export interface CardTransferResponse {
  status: string;
  message: string;
  data: CardTransfer[];
  pagination: {
    total: number;
  };
}

export interface CardTransfer {
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
  pan: string;
  channel: string;
  approvalDate: string;
  cardTransfer: {
    id: string;
    transferStatus: string;
  };
}

export interface CustomerCardResponse {
  status: string;
  data: CustomerCard;
  message: string;
}

export interface CustomerCard {
  customerName: string;
  accountNumber: string;
  phoneNumber: string;
  cardVariant: string;
  pickupBranch: string;
  approvedDate: string;
  cardStatus: string;
  activationStatus: string;
  cardId: string;
  nameOnCard: string;
  expiryDate: string;
  serialNo: string;
  requesterNt: string;
  requesterBranch: string;
}
