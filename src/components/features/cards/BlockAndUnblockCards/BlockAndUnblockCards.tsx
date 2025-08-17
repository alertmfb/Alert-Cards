import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlockCards from "./BlockCards";
import UnblockCards from "./UnblockCards";

const BlockAndUnblockCards = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="block" className="w-full">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="block">Block Cards</TabsTrigger>
          <TabsTrigger value="unblock">Unblock Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="block">
          <BlockCards />
        </TabsContent>

        <TabsContent value="unblock">
          <UnblockCards />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockAndUnblockCards;
