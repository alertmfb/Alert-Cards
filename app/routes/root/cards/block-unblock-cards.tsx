import BlockAndUnblockCards from "~/components/cards/BlockAndUnblockCards/BlockAndUnblockCards";
import CardBlockAndUnblock from "~/components/cards/BlockAndUnblockCards/BlockAndUnblockServices/CardBlockAndUnblock";
import { useUserRolesStore } from "~/stores/useUserRolesStore";

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
