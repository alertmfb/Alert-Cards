// components/Navbar.tsx (Updated)
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useUserRolesStore } from "@/store/slices/useUserRolesStore";
import NotificationBell from "@/components/common/shared/NotificationBell";

const formatBreadcrumbText = (str: string) => {
  if (typeof str !== "string") return "Invalid";
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userRole, setUserRole } = useUserRolesStore();
  const { user, accessToken, logout } = useAuth();
  console.log(user, accessToken);
  const handleLogout = () => {
    logout();
  };

  const segments = pathname.split("/").filter((seg) => seg !== "");

  const renderBreadcrumbs = () => {
    if (segments.length === 0) {
      return (
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return segments.map((seg, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      const isLast = idx === segments.length - 1;

      return (
        <React.Fragment key={idx}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>{formatBreadcrumbText(seg)}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={href}>{formatBreadcrumbText(seg)}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  };

  // Safely get user data with fallbacks
  const userData = {
    name: user?.firstName || "User",
    email: user?.email || "user@example.com",
    avatar: user?.avatar || "",
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between px-4 shadow-md backdrop-blur-md backdrop-saturate-150 border-b border-border">
      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb className="max-w-full">
          <BreadcrumbList className="text-xs md:text-sm whitespace-nowrap">
            {renderBreadcrumbs()}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs border rounded px-2 py-1">
              Role: {userRole === "approver" ? "Approval" : "Initiator"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setUserRole("approver")}>
              Approver
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserRole("initiator")}>
              Initiator
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>
                  {userData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col text-sm max-w-[120px] truncate">
                <span className="font-medium truncate">{userData.name}</span>
                <span className="text-xs text-muted-foremaker truncate">
                  {userData.email}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/account-settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
