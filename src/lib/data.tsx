// data.ts

import type {
  BranchType,
  CardActivationType,
  CardBlockUnblockRecord,
  CardRequestData,
  CardTrackerData,
  CardTransfer,
  CustomerCardData,
  UserAdminType,
} from "..";

export const branchOptions = [
  { label: "All Branches", value: "ALL" },
  { label: "Digital Banking", value: "DIGITAL_BANKING" },
  { label: "Mushin", value: "MUSHIN" },
  { label: "Ikorodu", value: "IKORODU" },
  { label: "Trade Fair", value: "TRADE_FAIR" },
  { label: "Victoria Island", value: "VI" },
  { label: "Ibadan", value: "IBADAN" },
  { label: "Abeokuta", value: "ABEOKUTA" },
  { label: "Agege", value: "AGEGE" },
];

export const customerCardTableData: CustomerCardData[] = [
  {
    id: "1",
    customerName: "Mohammed Ali",
    accountNumber: "1234567890",
    panNumber: "4444 1234 5678 9010",
    cardScheme: "VISA",
    branch: "Ikeja",
    cardStatus: "Activated",
    deliveryStatus: "Branch Delivered",
  },
  {
    id: "2",
    customerName: "John Cena",
    accountNumber: "2345678901",
    panNumber: "5555 2345 6789 0123",
    cardScheme: "Mastercard",
    branch: "Lekki",
    cardStatus: "Inactive",
    deliveryStatus: "Dispatched",
  },
  {
    id: "3",
    customerName: "Jackie Chan",
    accountNumber: "3456789012",
    panNumber: "6666 3456 7890 1234",
    cardScheme: "Verve",
    branch: "Victoria Island",
    cardStatus: "Blocked",
    deliveryStatus: "In Production",
  },
];

export const cardRequestDataTable: CardRequestData[] = [
  {
    id: "req_001",
    customerName: "John Doe",
    accountNumber: "1234567890",
    phoneNumber: "08012345678",
    cardScheme: "Visa",
    cardVariant: "Gold",
    branch: "Lekki Branch",
    cardStatus: "Pending",
    createdAt: "2024-05-12T10:30:00Z",
  },
  {
    id: "req_002",
    customerName: "Jane Smith",
    accountNumber: "9876543210",
    phoneNumber: "08123456789",
    cardScheme: "Mastercard",
    cardVariant: "Platinum",
    branch: "Ikeja Branch",
    cardStatus: "Approved",
    createdAt: "2024-05-15T14:45:00Z",
  },
  {
    id: "req_003",
    customerName: "Michael Johnson",
    accountNumber: "1029384756",
    phoneNumber: "07087654321",
    cardScheme: "Verve",
    cardVariant: "Classic",
    branch: "VI Branch",
    cardStatus: "Rejected",
    createdAt: "2024-06-01T09:00:00Z",
  },
  {
    id: "req_004",
    customerName: "Adaeze Nwosu",
    accountNumber: "5647382910",
    phoneNumber: "08098765432",
    cardScheme: "Visa",
    cardVariant: "Platinum",
    branch: "Ajah Branch",
    cardStatus: "Pending",
    createdAt: "2024-06-02T11:20:00Z",
  },
];

export const cardTrackerData: CardTrackerData[] = [
  {
    accountName: "Victor Balogun",
    accountNumber: "0283947210",
    panNumber: "5399 1234 5678 9012",
    cardScheme: "Mastercard",
    cardVariant: "Alert Gold",
    requesterNT: "Victorbalogun@Gmail.com",
    requesterBranch: "Mushin",
    pickupBranch: "Mushin",
    approvedDate: "2024-10-10T14:10:00Z",
    cardStatus: "Inactive",
    deliveryStatus: "In Production",
    requestChannel: "Mobile App",
  },
];

export const CardTransfers: CardTransfer[] = [
  {
    id: "1",
    customerName: "John Doe",
    panNumber: "1234-5678-9012-3456",
    cardScheme: "Visa",
    cardVariant: "Platinum",
    expiryDate: "12/26",
    approvedDate: "2024-06-15T09:15:00Z",
    status: "pending",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    panNumber: "9876-5432-1098-7654",
    cardScheme: "Mastercard",
    cardVariant: "Gold",
    expiryDate: "03/27",
    approvedDate: "2024-06-15T09:15:00Z",
    status: "approved",
  },
];

export const blockCardData: CardBlockUnblockRecord[] = [
  {
    id: "1",
    customerName: "John Doe",
    accountNumber: "1234567890",
    panNumber: "4111678945781234",
    cardScheme: "Visa",
    cardVariant: "Platinum",
    expiryDate: "12/26",
    dateEntered: "2024-06-15T09:15:00Z",
    reason: "Suspicious activity",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    accountNumber: "9876543210",
    panNumber: "5500********5678",
    cardScheme: "Mastercard",
    cardVariant: "Gold",
    expiryDate: "11/25",
    dateEntered: "2024-06-15T09:15:00Z",
    reason: "Lost card",
  },
];

export const unblockCardData: CardBlockUnblockRecord[] = [
  {
    id: "3",
    customerName: "Michael Lee",
    accountNumber: "1112223334",
    panNumber: "5555555555555555",
    cardScheme: "Visa",
    cardVariant: "Classic",
    expiryDate: "09/27",
    dateEntered: "2025-06-02",
    reason: "Issue resolved",
  },
];

export const cardActivationData: CardActivationType[] = [
  {
    id: "1",
    customerName: "Jane Doe",
    phoneNumber: "08012345678",
    accountNumber: "1234567890",
    panNumber: "5399 1234 5678 9012",
    cardScheme: "Verve",
    approvedDate: "2024-06-15T09:15:00Z",
    status: "Pending CR",
    expiryDate: "2024-06-15T09:15:00Z",
  },
  {
    id: "2",
    customerName: "John Smith",
    phoneNumber: "08087654321",
    accountNumber: "0987654321",
    panNumber: "4556 7890 1234 5678",
    cardScheme: "Visa",
    approvedDate: "2024-06-15T09:15:00Z",
    status: "Pending CA",
    expiryDate: "2024-06-15T09:15:00Z",
  },
];

export const adminTableData: UserAdminType[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    branch: "DIGITAL_BANKING",
    role: "CSO",
    status: "Active",
    createdAt: "2024-01-15T09:23:00Z",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    branch: "VI",
    role: "IT",
    status: "Inactive",
    createdAt: "2024-03-20T15:10:00Z",
  },
];
