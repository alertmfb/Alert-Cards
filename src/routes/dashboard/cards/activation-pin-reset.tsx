import CardActivationAndPinReset from "@/components/features/cards/CardActivationPinReset/CardActivationAndPinResetPage/CardActivationAndPinReset";
import CardActivationPinResetTable from "@/components/features/cards/CardActivationPinReset/CardActivationPinResetTable";
import React from "react";
import { useUserRolesStore } from "@/store/slices/useUserRolesStore";
import { useAuth } from "@/hooks";

const ActivationPinReset = () => {
  const { user } = useAuth();
  return (
    <div className="p-4">
      {user?.role === "CSO" ? (
        <CardActivationAndPinReset />
      ) : (
        <CardActivationPinResetTable />
      )}
    </div>
  );
};

export default ActivationPinReset;
