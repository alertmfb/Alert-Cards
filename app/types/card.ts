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
