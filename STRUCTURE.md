# Project Structure

This project follows a modern React application structure with clear separation of concerns and organized components.

## Directory Structure

```
src/
├── components/           # React components organized by category
│   ├── ui/              # Shadcn/UI components (buttons, inputs, etc.)
│   ├── layout/          # Layout components (navbar, sidebar, etc.)
│   ├── features/        # Feature-specific components
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── cards/       # Card management components
│   │   ├── administration/ # Admin components
│   │   └── settings/    # Settings components
│   ├── common/          # Reusable components
│   │   ├── shared/      # Shared components (tables, filters, etc.)
│   │   └── custom/      # Custom components
│   └── index.ts         # Re-exports all components
├── routes/              # React Router routes (file-based routing)
│   ├── _layout.tsx      # Root layout with providers
│   ├── _index.tsx       # Index route (redirects to dashboard)
│   ├── [...404].tsx     # 404 catch-all route
│   ├── auth/            # Authentication routes
│   │   ├── layout.tsx   # Auth layout
│   │   ├── sign-in.tsx
│   │   ├── forgot-password.tsx
│   │   ├── otp.tsx
│   │   ├── invite.tsx
│   │   └── reset-password.tsx
│   └── root/            # Protected routes
│       ├── layout.tsx   # Root layout with navigation
│       ├── dashboard.tsx
│       ├── cards/       # Card management routes
│       ├── administration.tsx
│       └── account-settings.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries and configurations
│   ├── utils/           # Utility functions
│   └── constants/       # App constants
├── store/               # State management (Zustand)
│   ├── slices/          # Store slices
│   └── providers/       # Store providers
├── api/                 # API layer (React Query)
│   ├── queries/         # API queries
│   ├── mutations/       # API mutations
│   └── services/        # API services
├── styles/              # Global styles and themes
├── types/               # TypeScript type definitions
├── assets/              # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── main.tsx             # Entry point with router setup
└── index.d.ts           # Type declarations
```

## Key Features

### Component Organization

- **UI Components**: Reusable UI primitives from Shadcn/UI
- **Layout Components**: Navigation, sidebar, and layout structure
- **Feature Components**: Domain-specific components organized by feature
- **Common Components**: Shared components used across features

### Routing Structure

- **File-based Routing**: Uses React Router v6+ with `createBrowserRouter`
- **Layout Routes**: `_layout.tsx` files provide layout wrappers
- **Index Routes**: `_index.tsx` files handle default routes
- **Catch-all Routes**: `[...404].tsx` handles unmatched routes
- **Nested Routes**: Proper nesting with `Outlet` components

### State Management

- **Zustand Stores**: Lightweight state management with slices
- **React Query**: Server state management for API calls

### API Layer

- **Queries**: Data fetching operations
- **Mutations**: Data modification operations
- **Services**: API service functions

### Type Safety

- **TypeScript**: Full type safety throughout the application
- **Type Definitions**: Centralized type definitions

## Import Patterns

```typescript
// Import components
import { Button, Card } from "@/components/ui";
import { Navbar, Sidebar } from "@/components/layout";
import { DashboardStats } from "@/components/features/dashboard";

// Import hooks
import { useAuth, useCard } from "@/hooks";

// Import utilities
import { cn, formatDate } from "@/lib";

// Import types
import type { User, Card } from "@/types";

// Import API
import { useUsersQuery, useCreateUserMutation } from "@/api";
```

## Routing Patterns

```typescript
// Route structure in main.tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <IndexRoute /> },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "sign-in", element: <SignIn /> },
          // ... other auth routes
        ],
      },
      {
        path: "root",
        element: <RootLayoutComponent />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          // ... other protected routes
        ],
      },
      { path: "*", element: <NotFoundRoute /> },
    ],
  },
]);
```

## Development Guidelines

1. **Component Placement**: Place components in the appropriate category
2. **File Naming**: Use PascalCase for components, camelCase for utilities
3. **Index Files**: Always create index.ts files for clean imports
4. **Type Safety**: Use TypeScript for all new code
5. **Consistent Imports**: Use the `@/` alias for imports from src
6. **Route Organization**: Group related routes in subdirectories
7. **Layout Components**: Use `_layout.tsx` for route layouts

## Migration Notes

This structure was migrated from the previous `app/` directory structure and React Router Dev to standard React Router v6+ with `createBrowserRouter`. All imports have been updated to use the new path aliases and organization.
