import CardRequestTable from "@/components/features/cards/CardRequests/CardRequestsTable";
import CreateCardRequestPage from "@/components/features/cards/CardRequests/CreateCardRequest/CreateCardRequest";
import { useUserRolesStore } from "@/store/slices/useUserRolesStore";

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
