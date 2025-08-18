import * as React from "react";
import { CreditCard } from "lucide-react";
import { IconCategoryFilled, IconUserShield } from "@tabler/icons-react";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Image from "@/components/common/Image";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  {
    title: "Dashboard",
    url: "/",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const { user } = useAuth();

  const userData = {
    name: user?.firstName || "User",
    email: user?.email || "user@example.com",
    avatar: user?.avatar || "",
  };
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <a
          href="/"
          className={`flex items-center w-full gap-4 transition-all duration-200 ${
            isCollapsed ? "justify-center p-2" : "justify-start"
          }`}
        >
          {/* Logo - always visible */}
          <div
            className={`
            bg-gradient-to-br from-blue-50 to-blue-100 
            border border-blue-200/50
            rounded-xl shadow-sm 
            flex items-center justify-center flex-shrink-0
            transition-all duration-200
            ${isCollapsed ? "p-2" : "p-2.5"}
          `}
          >
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={isCollapsed ? 18 : 35}
              height={isCollapsed ? 18 : 32}
            />
          </div>

          {/* Text - hidden when collapsed */}
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-lg font-semibold truncate">Alert MFB</span>
              <span className="text-xs truncate">Card Management</span>
            </div>
          )}
        </a>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
