import { format, isValid, parseISO } from "date-fns";
import { branchOptions } from "./data";
import type { CardVariant } from "../index";
import type { CardType } from "@/components/common/custom/CardDisplay";

export const maskPan = (pan: string): string => {
  if (!pan || pan.length < 4) return pan;

  const first4 = pan.slice(0, 4);
  const last4 = pan.slice(-4);
  return `${first4} **** **** ${last4}`;
};

export const formatDateTime = (
  input: string | Date
): { date: string; time: string } => {
  const date = typeof input === "string" ? parseISO(input) : input;

  if (!isValid(date)) {
    return { date: "-", time: "-" };
  }

  return {
    date: format(date, "dd MMM, yyyy"), // e.g., "10 Oct, 2024"
    time: format(date, "HH:mm"), // e.g., "14:10"
  };
};

export const formatCurrency = (value: number | undefined | null) => {
  if (value == null) return "N/A";
  return `₦ ${value.toLocaleString("en-NG")}`;
};

export const formatDialogDateTime = (isoDate: string) => {
  const d = new Date(isoDate);

  // e.g. "25 June 2025"
  const date = d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // e.g. "03:17 PM"
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time };
};

export const getBranchLabel = (value: string) => {
  return branchOptions.find((b: any) => b.value === value)?.label ?? value;
};

export const CardVariantDisplayMap: Record<CardVariant, string> = {
  ALERT_GOLD: "Alert Gold",
  ALERT_PLATINUM: "Alert Platinum",
  ALERT_LUXE: "Alert Luxe",
  ALERT_POTRAIT: "Alert Potrait",
};

// Map card scheme to card type
export const getCardType = (scheme: string): CardType => {
  const normalizedScheme = scheme.toLowerCase();
  if (normalizedScheme.includes("mastercard")) return "mastercard";
  if (normalizedScheme.includes("visa")) return "visa";
  if (normalizedScheme.includes("verve")) return "verve";
  if (normalizedScheme.includes("afrigo")) return "afrigo";
  return "default";
};
