import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Auth routes (no providers needed)
  layout("routes/auth/layout.tsx", [
    route("sign-in", "routes/auth/sign-in.tsx"),
    route("forgot-password-otp", "routes/auth/otp.tsx"),
    route("invite", "routes/auth/invite.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
    route("forgot-password", "routes/auth/forgot-password.tsx"),
  ]),

  layout("routes/root/layout.tsx", [
    index("routes/root/dashboard.tsx"),
    route("cards", "routes/root/cards/cards.tsx"),
    route("cards/card-services", "routes/root/cards/card-services.tsx"),
    route("cards/all-cards", "routes/root/cards/all-cards.tsx"),
    route("cards/card-requests", "routes/root/cards/card-requests.tsx"),
    route("cards/card-requests/new", "routes/root/cards/card-requests/new.tsx"),
    route(
      "cards/card-requests/preview",
      "routes/root/cards/card-requests/preview.tsx"
    ),
    route(
      "cards/card-requests/cards-request-submit",
      "routes/root/cards/card-requests/submit.tsx"
    ),
    route("cards/card-tracker", "routes/root/cards/card-tracker.tsx"),
    route(
      "cards/activation-pin-reset",
      "routes/root/cards/activation-pin-reset.tsx"
    ),
    route(
      "cards/card-services/activation",
      "routes/root/cards/card-services/activation.tsx"
    ),
    route(
      "cards/card-services/pin-reset",
      "routes/root/cards/card-services/resetPin.tsx"
    ),
    route("cards/card-transfer", "routes/root/cards/card-transfers.tsx"),
    route(
      "cards/block-unblock-cards",
      "routes/root/cards/block-unblock-cards.tsx"
    ),
    route(
      "cards/card-services/block-card",
      "routes/root/cards/card-services/blockCard.tsx"
    ),
    route(
      "cards/card-services/unblock-card",
      "routes/root/cards/card-services/unblockCard.tsx"
    ),
    route("administration", "routes/root/administration.tsx"),
    route("account-settings", "routes/root/account-settings.tsx"),
  ]),

  // Catch-all route
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
