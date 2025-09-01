import BlockAndUnblockCards from "@/components/features/cards/BlockAndUnblockCards/BlockAndUnblockCards";
import CardBlockAndUnblock from "@/components/features/cards/BlockAndUnblockCards/BlockAndUnblockServices/CardBlockAndUnblock";
import { useAuth } from "@/hooks";

const BlockUnblockCards = () => {
  const { user } = useAuth();
  return (
    <div className="p-4">
      {user?.role === "CSO" ? (
        <CardBlockAndUnblock />
      ) : (
        <BlockAndUnblockCards />
      )}
      {/* <BlockAndUnblockCards /> */}
    </div>
  );
};

export default BlockUnblockCards;
