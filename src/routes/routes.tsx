import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./_layout";
import IndexRoute from "./_index";
import NotFoundRoute from "./[...404]";
import "../styles/globals.css";

import AuthLayout from "./auth/layout";
import SignIn from "./auth/sign-in";
import ForgotPassword from "./auth/forgot-password";
import Otp from "./auth/otp";
import Invite from "./auth/invite";
import ResetPassword from "./auth/reset-password";

import RootLayoutComponent from "./dashboard/layout";
import Dashboard from "./dashboard/dashboard";
import Cards from "./dashboard/cards/cards";
import CardServices from "./dashboard/cards/card-services";
import AllCards from "./dashboard/cards/all-cards";
import CardRequests from "./dashboard/cards/card-requests";
import NewCardRequest from "./dashboard/cards/card-requests/new";
import PreviewCardRequest from "./dashboard/cards/card-requests/preview";
import SubmitCardRequest from "./dashboard/cards/card-requests/submit";
import CardTracker from "./dashboard/cards/card-tracker";
import ActivationPinReset from "./dashboard/cards/activation-pin-reset";
import CardActivation from "./dashboard/cards/card-services/activation";
import CardPinReset from "./dashboard/cards/card-services/resetPin";
import CardTransfer from "./dashboard/cards/card-transfers";
import BlockUnblockCards from "./dashboard/cards/block-unblock-cards";
import BlockCard from "./dashboard/cards/card-services/blockCard";
import UnblockCard from "./dashboard/cards/card-services/unblockCard";
import Administration from "./dashboard/administration";
import AccountSettings from "./dashboard/account-settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: "",
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
          {
            path: "cards/card-requests/preview",
            element: <PreviewCardRequest />,
          },
          {
            path: "cards/card-requests/cards-request-submit",
            element: <SubmitCardRequest />,
          },
          { path: "cards/card-tracker", element: <CardTracker /> },
          {
            path: "cards/activation-pin-reset",
            element: <ActivationPinReset />,
          },
          {
            path: "cards/card-services/activation",
            element: <CardActivation />,
          },
          { path: "cards/card-services/pin-reset", element: <CardPinReset /> },
          { path: "cards/card-transfer", element: <CardTransfer /> },
          { path: "cards/block-unblock-cards", element: <BlockUnblockCards /> },
          { path: "cards/card-services/block-card", element: <BlockCard /> },
          {
            path: "cards/card-services/unblock-card",
            element: <UnblockCard />,
          },
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
