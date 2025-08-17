import { UsersIcon, CreditCardIcon, TruckIcon, BanIcon } from "lucide-react";
import { SummaryCard } from "../SummaryCard";

const cardData = [
  {
    title: "Card Requests",
    value: 1522400,
    subText: "Total no. of all card requests (across platforms).",
    icon: <CreditCardIcon className="h-4 w-4" />,
  },
  {
    title: "Pending Approvals",
    value: 62400,
    subText: "Cards awaiting approval.",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Delivered Cards",
    value: 982300,
    subText: "Cards successfully delivered.",
    icon: <TruckIcon className="h-4 w-4" />,
  },
  {
    title: "Blocked Cards",
    value: 14000,
    subText: "Total number of blocked cards.",
    icon: <BanIcon className="h-4 w-4" />,
  },
];

export default function CardStatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          subText={card.subText}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
