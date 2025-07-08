import CardActivationAndPinReset from "components/cards/CardActivationPinReset/CardActivationAndPinResetPage/CardActivationAndPinReset";
import CardActivationPinResetTable from "components/cards/CardActivationPinReset/CardActivationPinResetTable";
import React from "react";
import { useUserRolesStore } from "~/stores/useUserRolesStore";

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
