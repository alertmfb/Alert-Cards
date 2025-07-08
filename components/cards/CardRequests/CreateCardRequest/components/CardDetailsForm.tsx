// import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
// import { Input } from "components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "components/ui/select";
// import { Label } from "~/components/ui/label";
// import { useCardRequestStore } from "~/stores/useCardRequestStore";

// export function CardDetailsForm() {
//   const { formData, setFormData } = useCardRequestStore();
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Card Request Details</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <Label>Card Scheme</Label>
//             <Select
//               value={formData.scheme ?? ""}
//               onValueChange={(val) => setFormData({ scheme: val })}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select preferred Card Scheme" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Visa Card">Visa Card</SelectItem>
//                 <SelectItem value="Mastercard">Mastercard</SelectItem>
//                 <SelectItem value="Afrigo">Afrigo</SelectItem>
//                 <SelectItem value="Verve Card">Verve Card</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Card Variant</Label>
//             <Select
//               value={formData.variant}
//               onValueChange={(val) => setFormData({ variant: val })}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select preferred Card Variant" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Alert Gold">Alert Gold</SelectItem>
//                 <SelectItem value="Alert Platinum">Alert Platinum</SelectItem>
//                 <SelectItem value="Alert Luxe">Alert Luxe</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Name on Card</Label>
//             <Input
//               value={formData.nameOnCard ?? ""}
//               onChange={(e) => setFormData({ nameOnCard: e.target.value })}
//               placeholder="Enter name as it should appear on card"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Request Type</Label>
//             <Select
//               value={formData.requestType}
//               onValueChange={(val) => setFormData({ requestType: val })}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select request type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="New">New</SelectItem>
//                 <SelectItem value="Renewal">Renewal</SelectItem>
//                 <SelectItem value="Re-Issue">Re-Issue</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Reason for Request</Label>
//             <Select
//               value={formData.reason}
//               onValueChange={(val) => setFormData({ reason: val })}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select reason for request" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Damaged">Damaged</SelectItem>
//                 <SelectItem value="Lost">Lost</SelectItem>
//                 <SelectItem value="Stolen">Stolen</SelectItem>
//                 <SelectItem value="Trapped">Trapped</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Branch</Label>
//             <Select
//               value={formData.branch}
//               onValueChange={(val) => setFormData({ branch: val })}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select branch" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Alert Gold">Alert Gold</SelectItem>
//                 <SelectItem value="Alert Platinum">Alert Platinum</SelectItem>
//                 <SelectItem value="Alert Luxe">Alert Luxe</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Request Channel</Label>
//             <Select
//               value={formData.channel}
//               onValueChange={(val) => setFormData({ channel: val })}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select request channel" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Branch">Branch</SelectItem>
//                 <SelectItem value="Mobile App">Mobile App</SelectItem>
//                 <SelectItem value="Business Banking">
//                   Business Banking
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// components/CardDetailsForm.tsx
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Label } from "~/components/ui/label";
import { CreditCard } from "lucide-react";
import { useCardRequestStore } from "~/stores/cardRequestStore";

export function CardDetailsForm() {
  const { draft, patchCardDetails } = useCardRequestStore();

  const handleFieldChange = (field: string, value: string) => {
    patchCardDetails({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center uppercase gap-2">
          {/* <CreditCard className="h-5 w-5" /> */}
          Card Request Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="scheme">Card Scheme</Label>
            <Select
              value={draft.cardDetails.scheme ?? ""}
              onValueChange={(val) => handleFieldChange("scheme", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred Card Scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Visa Card">Visa Card</SelectItem>
                <SelectItem value="Mastercard">Mastercard</SelectItem>
                <SelectItem value="Afrigo">Afrigo</SelectItem>
                <SelectItem value="Verve Card">Verve Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="variant">Card Variant</Label>
            <Select
              value={draft.cardDetails.variant ?? ""}
              onValueChange={(val) => handleFieldChange("variant", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred Card Variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alert Gold">Alert Gold</SelectItem>
                <SelectItem value="Alert Platinum">Alert Platinum</SelectItem>
                <SelectItem value="Alert Luxe">Alert Luxe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              value={draft.cardDetails.nameOnCard ?? ""}
              onChange={(e) => handleFieldChange("nameOnCard", e.target.value)}
              placeholder="Enter name as it should appear on card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestType">Request Type</Label>
            <Select
              value={draft.cardDetails.requestType ?? ""}
              onValueChange={(val) => handleFieldChange("requestType", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Renewal">Renewal</SelectItem>
                <SelectItem value="Re-Issue">Re-Issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Select
              value={draft.cardDetails.reason ?? ""}
              onValueChange={(val) => handleFieldChange("reason", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select reason for request" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Damaged">Damaged</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
                <SelectItem value="Stolen">Stolen</SelectItem>
                <SelectItem value="Trapped">Trapped</SelectItem>
                <SelectItem value="New Request">New Request</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Pickup Branch</Label>
            <Select
              value={draft.cardDetails.branch ?? ""}
              onValueChange={(val) => handleFieldChange("branch", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select pickup branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Victoria Island">Victoria Island</SelectItem>
                <SelectItem value="Ikeja">Ikeja</SelectItem>
                <SelectItem value="Lekki">Lekki</SelectItem>
                <SelectItem value="Surulere">Surulere</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="channel">Request Channel</Label>
            <Select
              value={draft.cardDetails.channel ?? ""}
              onValueChange={(val) => handleFieldChange("channel", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select request channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Branch">Branch</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="Business Banking">
                  Business Banking
                </SelectItem>
                <SelectItem value="Online Banking">Online Banking</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
