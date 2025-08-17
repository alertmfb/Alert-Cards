// components/custom-status.tsx

import React from "react";
import clsx from "clsx";

type StatusProps = {
  label: string;
  variant: "success" | "warning" | "danger" | "info";
};

const getStatusStyle = (variant: StatusProps["variant"]) => {
  switch (variant) {
    case "success":
      return "border-green-600 bg-green-50 text-green-700";
    case "warning":
      return "border-yellow-600 bg-yellow-50 text-yellow-700";
    case "danger":
      return "border-red-600 bg-red-50 text-red-700";
    case "info":
      return "border-blue-600 bg-blue-50 text-blue-700";
    default:
      return "";
  }
};

export const CustomStatus = ({ label, variant }: StatusProps) => {
  return (
    <div
      className={clsx(
        "inline-block px-3 py-1 rounded-full text-xs font-medium border capitalize",
        getStatusStyle(variant)
      )}
    >
      {label}
    </div>
  );
};
