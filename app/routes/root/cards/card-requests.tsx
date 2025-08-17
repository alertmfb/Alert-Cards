import CardRequestTable from "~/components/cards/CardRequests/CardRequestsTable";
import CreateCardRequestPage from "~/components/cards/CardRequests/CreateCardRequest/CreateCardRequest";
import { useUserRolesStore } from "~/stores/useUserRolesStore";

const CardRequests = () => {
  const { userRole } = useUserRolesStore();
  return (
    <div className="p-4">
      {userRole === "initiator" ? (
        <CreateCardRequestPage />
      ) : (
        <CardRequestTable />
      )}
    </div>
  );
};

export default CardRequests;
