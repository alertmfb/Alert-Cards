import React from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "@/components/common/shared/PageHeader";
import { CircleUserRound, KeyRound } from "lucide-react";

const CardActivationAndPinReset = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <CircleUserRound className="w-6 h-6" />,
      title: "Card Activation",
      description:
        "Activate newly issued or replacement debit cards to make them ready for customer use. Once activated, the card becomes eligible for ATM, POS, and online transactions.",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      route: "/cards/card-services/activation",
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      title: "Card PIN Reset",
      description:
        "Reset or change the Personal Identification Number (PIN) of a customer's debit card upon request or due to security concerns.",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      route: "/cards/card-services/pin-reset",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Card Activation and PIN Reset"
        subText="Activate newly issued or replaced debit cards to enable transactions."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.route)}
            className="cursor-pointer border rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-4"
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

export default CardActivationAndPinReset;
