import BlockAndUnblockCards from "@/components/features/cards/BlockAndUnblockCards/BlockAndUnblockCards";
import CardBlockAndUnblock from "@/components/features/cards/BlockAndUnblockCards/BlockAndUnblockServices/CardBlockAndUnblock";
import { useUserRolesStore } from "@/store/slices/useUserRolesStore";

const BlockUnblockCards = () => {
  const { userRole } = useUserRolesStore();
  return (
    <div className="p-4">
      {userRole === "initiator" ? (
        <CardBlockAndUnblock />
      ) : (
        <BlockAndUnblockCards />
      )}
      {/* <BlockAndUnblockCards /> */}
    </div>
  );
};

export default BlockUnblockCards;
