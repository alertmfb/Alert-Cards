import CardActivationAndPinReset from "@/components/features/cards/CardActivationPinReset/CardActivationAndPinResetPage/CardActivationAndPinReset";
import CardActivationPinResetTable from "@/components/features/cards/CardActivationPinReset/CardActivationPinResetTable";
import React from "react";
import { useUserRolesStore } from "@/store/slices/useUserRolesStore";

const ActivationPinReset = () => {
  const { userRole } = useUserRolesStore();
  return (
    <div className="p-4">
      {userRole === "initiator" ? (
        <CardActivationAndPinReset />
      ) : (
        <CardActivationPinResetTable />
      )}
      {/* <CardActivationPinResetTable /> */}
      {/* <CardActivationAndPinReset /> */}
    </div>
  );
};

export default ActivationPinReset;
