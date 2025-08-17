import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/_layout";
import IndexRoute from "./routes/_index";
import NotFoundRoute from "./routes/[...404]";
import "./styles/globals.css";

// Import all route components
import AuthLayout from "./routes/auth/layout";
import SignIn from "./routes/auth/sign-in";
import ForgotPassword from "./routes/auth/forgot-password";
import Otp from "./routes/auth/otp";
import Invite from "./routes/auth/invite";
import ResetPassword from "./routes/auth/reset-password";

import RootLayoutComponent from "./routes/root/layout";
import Dashboard from "./routes/root/dashboard";
import Cards from "./routes/root/cards/cards";
import CardServices from "./routes/root/cards/card-services";
import AllCards from "./routes/root/cards/all-cards";
import CardRequests from "./routes/root/cards/card-requests";
import NewCardRequest from "./routes/root/cards/card-requests/new";
import PreviewCardRequest from "./routes/root/cards/card-requests/preview";
import SubmitCardRequest from "./routes/root/cards/card-requests/submit";
import CardTracker from "./routes/root/cards/card-tracker";
import ActivationPinReset from "./routes/root/cards/activation-pin-reset";
import CardActivation from "./routes/root/cards/card-services/activation";
import CardPinReset from "./routes/root/cards/card-services/resetPin";
import CardTransfer from "./routes/root/cards/card-transfers";
import BlockUnblockCards from "./routes/root/cards/block-unblock-cards";
import BlockCard from "./routes/root/cards/card-services/blockCard";
import UnblockCard from "./routes/root/cards/card-services/unblockCard";
import Administration from "./routes/root/administration";
import AccountSettings from "./routes/root/account-settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "sign-in", element: <SignIn /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "forgot-password-otp", element: <Otp /> },
          { path: "invite", element: <Invite /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
      {
        path: "",
        element: <RootLayoutComponent />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "cards", element: <Cards /> },
          { path: "cards/card-services", element: <CardServices /> },
          { path: "cards/all-cards", element: <AllCards /> },
          { path: "cards/card-requests", element: <CardRequests /> },
          { path: "cards/card-requests/new", element: <NewCardRequest /> },
          { path: "cards/card-requests/preview", element: <PreviewCardRequest /> },
          { path: "cards/card-requests/cards-request-submit", element: <SubmitCardRequest /> },
          { path: "cards/card-tracker", element: <CardTracker /> },
          { path: "cards/activation-pin-reset", element: <ActivationPinReset /> },
          { path: "cards/card-services/activation", element: <CardActivation /> },
          { path: "cards/card-services/pin-reset", element: <CardPinReset /> },
          { path: "cards/card-transfer", element: <CardTransfer /> },
          { path: "cards/block-unblock-cards", element: <BlockUnblockCards /> },
          { path: "cards/card-services/block-card", element: <BlockCard /> },
          { path: "cards/card-services/unblock-card", element: <UnblockCard /> },
          { path: "administration", element: <Administration /> },
          { path: "account-settings", element: <AccountSettings /> },
        ],
      },
      {
        path: "*",
        element: <NotFoundRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
