import CardRequestTable from "@/components/features/cards/CardRequests/CardRequestsTable";
import CreateCardRequestPage from "@/components/features/cards/CardRequests/CreateCardRequest/CreateCardRequest";
import { useAuth } from "@/hooks";
import { useUserRolesStore } from "@/store/slices/useUserRolesStore";

const CardRequests = () => {
  const { user } = useAuth();
  return (
    <div className="p-4">
      {user?.role === "CSO" ? <CreateCardRequestPage /> : <CardRequestTable />}
    </div>
  );
};

export default CardRequests;
