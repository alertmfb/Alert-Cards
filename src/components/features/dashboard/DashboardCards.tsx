import { UsersIcon, CreditCardIcon, TruckIcon, BanIcon } from "lucide-react";
import { SummaryCard } from "@/components/common/SummaryCard";
import { useGetCardSummary, useGetChartData } from "@/hooks";
import CardSkeletonLoader from "./CardSkeleton";

export default function CardStatsGrid() {
  const { data: chartSummary, isPending } = useGetCardSummary();

  const cardData = [
    {
      title: "Card Requests",
      value: chartSummary?.data?.cardRequests || 0,
      subText: "Total no. of all card requests (across platforms).",
      icon: <CreditCardIcon className="h-4 w-4" />,
    },
    {
      title: "Pending Approvals",
      value: chartSummary?.data?.pendingApprovals || 0,
      subText: "Cards awaiting approval.",
      icon: <UsersIcon className="h-4 w-4" />,
    },
    {
      title: "Delivered Cards",
      value: chartSummary?.data?.deliveredCards || 0,
      subText: "Cards successfully delivered.",
      icon: <TruckIcon className="h-4 w-4" />,
    },
    {
      title: "Blocked Cards",
      value: chartSummary?.data?.blockedCards || 0,
      subText: "Total number of blocked cards.",
      icon: <BanIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {isPending ? (
        <CardSkeletonLoader />
      ) : (
        <>
          {cardData.map((card, index) => (
            <SummaryCard
              key={index}
              title={card.title}
              value={card.value}
              subText={card.subText}
              icon={card.icon}
            />
          ))}
        </>
      )}
    </div>
  );
}
