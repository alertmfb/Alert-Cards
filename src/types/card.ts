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
  pan: string;
}

export interface BlockCardResponse {
  status: string;
  data: CardblockData[];
  message: string;
}

interface CardRequest {
  pan: string;
  scheme: string;
  variant: string;
}

interface Customer {
  customerName: string;
  accountNumber: string;
}

interface Card {
  customer: Customer;
  cardRequest: CardRequest;
  expiryDate: string;
}

export interface CardblockData {
  id: string;
  reason: string;
  createdAt: string;
  requestType: string;
  card: Card;
}

interface ActivationCardRequest {
  nameOnCard: string;
  scheme: string;
}

interface ActivationCustomer {
  customerName: string;
  phoneNumber: string;
  accountNumber: string;
  email: string;
}

interface ActivationCard {
  customer: ActivationCustomer;
  cardRequest: ActivationCardRequest;
  maskedPan: string;
  status: string;
}

export interface ActivationRequest {
  id: string;
  card: ActivationCard;
  createdAt: string;
}

export interface CardActivationResponse {
  status: string;
  data: {
    requests: ActivationRequest[];
  };
  message: string;
}

export interface CardDetails {
  AccountNumber: string;
  CardPAN: string;
  LinkedDate: string;
  ExpiryDate: string;
  SerialNo: string;
  NameOnCard: string;
  Status: "Active" | "Blocked" | "Damaged" | "Lost" | "Stolen";
}

export interface VerifiedCustomerData {
  name: string;
  phone: string;
  email: string;
  accountNumber: string;
  accountBalance: number | string;
  cards?: CardDetails[];
}

export interface CustomerVerificationResponse {
  status: string;
  data: VerifiedCustomerData;
  message: string;
}

export interface BulkCardRequest {
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

export interface BulkRequest {
  requests: BulkCardRequest[];
}
