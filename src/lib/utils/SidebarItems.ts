import { CreditCard } from "lucide-react";
import { IconCategoryFilled, IconUserShield } from "@tabler/icons-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconCategoryFilled,
  },
  {
    title: "Cards",
    url: "#",
    icon: CreditCard,
    isActive: true,
    items: [
      { title: "All Cards", url: "/cards/all-cards" },
      { title: "Card Requests", url: "/cards/card-requests" },
      { title: "Card Tracker", url: "/cards/card-tracker" },
      {
        title: "Activation/ PIN Reset",
        url: "/cards/activation-pin-reset",
      },
      { title: "Card Transfer", url: "/cards/card-transfer" },
      { title: "Block/ Unblock Cards", url: "/cards/block-unblock-cards" },
    ],
  },
  {
    title: "Administration",
    url: "/administration",
    icon: IconUserShield,
  },
];

export const csoNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconCategoryFilled,
  },
  {
    title: "Cards",
    url: "#",
    icon: CreditCard,
    isActive: true,
    items: [
      { title: "All Cards", url: "/cards/all-cards" },
      { title: "Card Requests", url: "/cards/card-requests" },
      {
        title: "Activation/ PIN Reset",
        url: "/cards/activation-pin-reset",
      },
      { title: "Block/ Unblock Cards", url: "/cards/block-unblock-cards" },
    ],
  },
];
export const hopNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconCategoryFilled,
  },
  {
    title: "Cards",
    url: "#",
    icon: CreditCard,
    isActive: true,
    items: [
      { title: "All Cards", url: "/cards/all-cards" },
      { title: "Card Requests", url: "/cards/card-requests" },
      {
        title: "Activation/ PIN Reset",
        url: "/cards/activation-pin-reset",
      },
      { title: "Block/ Unblock Cards", url: "/cards/block-unblock-cards" },
    ],
  },
];

export const headNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconCategoryFilled,
  },
  {
    title: "Cards",
    url: "#",
    icon: CreditCard,
    isActive: true,
    items: [
      { title: "All Cards", url: "/cards/all-cards" },
      { title: "Card Transfer", url: "/cards/card-transfer" },
    ],
  },
];

export const itNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconCategoryFilled,
  },
  {
    title: "Administration",
    url: "/administration",
    icon: IconUserShield,
  },
];
