import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";

import { SidebarTrigger } from "./ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronDown } from "lucide-react";

import { toast } from "sonner";
import { useUserRolesStore } from "~/stores/useUserRolesStore";
import NotificationBell from "./shared/NotificationBell";
import { useAuth } from "~/hooks/useAuth";

const formatBreadcrumbText = (str: string) => {
  if (typeof str !== "string") return "Invalid";
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userRole, setUserRole } = useUserRolesStore();
  const auth = useAuth();

  // Debug logging
  console.log("Auth object:", auth);
  console.log("Auth user:", auth.user);

  const handleLogout = () => {
    if (auth.logout) {
      auth.logout();
    }
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

  // Safely extract user data with extensive validation
  const getUserData = () => {
    if (!auth || !auth.user) {
      return {
        name: "User",
        email: "user@example.com",
        avatar: "",
      };
    }

    const user = auth.user;

    // Validate that user is an object and not a Response or other problematic object
    if (typeof user !== "object" || user === null) {
      console.error("Invalid user object:", user);
      return {
        name: "User",
        email: "user@example.com",
        avatar: "",
      };
    }

    // Check if user has a constructor that might indicate it's a Response object
    if (user.constructor && user.constructor.name === "Response") {
      console.error("User is a Response object, not user data:", user);
      return {
        name: "User",
        email: "user@example.com",
        avatar: "",
      };
    }

    return {
      name: typeof user.name === "string" ? user.name : "User",
      email: typeof user.email === "string" ? user.email : "user@example.com",
      avatar: typeof user.avatar === "string" ? user.avatar : "",
    };
  };

  const userData = getUserData();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between px-4 shadow-md backdrop-blur-md backdrop-saturate-150 border-b border-border">
      {/* Left: Sidebar + Breadcrumb */}
      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb className="max-w-full">
          <BreadcrumbList className="text-xs md:text-sm whitespace-nowrap">
            {renderBreadcrumbs()}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Notification + Theme + Avatar */}
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
                <span className="text-xs text-muted-foreground truncate">
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
};

export default Navbar;
