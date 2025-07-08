// types.ts

export type BranchType =
  | "DIGITAL_BANKING"
  | "MUSHIN"
  | "IKORODU"
  | "TRADE_FAIR"
  | "VI"
  | "IBADAN"
  | "ABEOKUTA"
  | "AGEGE";

export type CardVariant =
  | "ALERT_GOLD"
  | "ALERT_PLATINUM"
  | "ALERT_LUXE"
  | "ALERT_POTRAIT";

export type RoleType = "CSO" | "HOP" | "IT";

export type CardFilterType = {
  search: string;
  dateRange: DateRange;
};

export type CustomerCardData = {
  id: string;
  customerName: string;
  accountNumber: string;
  panNumber: string;
  cardScheme: "VISA" | "Mastercard" | "Verve";
  branch: string;
  cardStatus: "Activated" | "Inactive" | "Blocked";
  deliveryStatus: "In Production" | "Dispatched" | "Branch Delivered";
};

export type CardRequestData = {
  id: string;
  customerName: string;
  accountNumber: string;
  phoneNumber: string;
  cardScheme: string;
  cardVariant: string;
  branch: string;
  cardStatus: "Pending" | "Approved" | "Rejected";
  createdAt: string;
};

export type CardTrackerData = {
  accountName: string;
  accountNumber: string;
  panNumber: string;
  cardScheme: string;
  cardVariant: string;
  requesterNT: string;
  requesterBranch: string;
  pickupBranch: string;
  approvedDate: string; // ISO string preferred
  cardStatus: string;
  deliveryStatus: string;
  requestChannel: string;
};

export type CardTransfer = {
  id: string;
  customerName: string;
  panNumber: string;
  cardScheme: string;
  cardVariant: string;
  expiryDate: string;
  approvedDate: string;
  status: "pending" | "approved" | "declined";
};

export type CardBlockUnblockRecord = {
  id: string;
  customerName: string;
  accountNumber: string;
  panNumber: string;
  cardScheme: string;
  cardVariant: string;
  expiryDate: string;
  dateEntered: string;
  reason: string;
};

export type CardActivationStatus = "Pending CR" | "Pending CA";

export type CardActivationType = {
  id: string;
  customerName: string;
  phoneNumber: string;
  accountNumber: string;
  panNumber: string;
  cardScheme: string;
  approvedDate: string;
  status: CardActivationStatus;
  expiryDate: string;
};

export type UserAdminType = {
  id: string;
  name: string;
  email: string;
  branch: BranchType;
  role: "CSO" | "HOP" | "IT";
  status: "Active" | "Inactive";
  createdAt: string;
};
