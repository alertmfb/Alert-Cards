import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CardActivationTable from "./CardActivationTable";
import CardPinResetTable from "./CardPinResetTable";

const CardActivationPinResetTable = () => {
  return (
    <Tabs defaultValue="activation" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="activation">Card Activation</TabsTrigger>
        <TabsTrigger value="pin-reset">Card PIN Reset</TabsTrigger>
      </TabsList>

      <TabsContent value="activation">
        <CardActivationTable />
      </TabsContent>

      <TabsContent value="pin-reset">
        <CardPinResetTable />
      </TabsContent>
    </Tabs>
  );
};

export default CardActivationPinResetTable;
