import React from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "~/components/shared/PageHeader";
import { Ban, Unlock } from "lucide-react";

const CardBlockAndUnblock = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Ban className="w-6 h-6" />,
      title: "Block Card",
      description:
        "Restrict a debit card from being used due to issues such as loss, theft, damage, or suspicious activity. Once blocked, the card becomes inactive for ATM, POS, and online transactions.",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      route: "/cards/card-services/block-card",
    },
    {
      icon: <Unlock className="w-6 h-6" />,
      title: "Unblock Card",
      description:
        "Reactivate a previously blocked debit card after verifying the customer's request and resolving the issue. Once unblocked, the card regains access to ATM, POS, and online channels.",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      route: "/cards/card-services/unblock-card",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Block and Unblock Cards"
        subText="Manage card accessibility by blocking or unblocking debit cards based on customer requests or security concerns."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.route)}
            className="cursor-pointer bg-muted border rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-4"
          >
            <div
              className={`w-12 h-12 ${service.bgColor} ${service.textColor} flex items-center justify-center rounded-full`}
            >
              {service.icon}
            </div>
            <h2 className="text-lg font-semibold">{service.title}</h2>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardBlockAndUnblock;
