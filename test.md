## Complete Project Structure

```
my-react-app/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/                     # Shadcn/UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── index.ts           # Re-export all UI components
│   │   ├── forms/                 # Form-specific components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── index.ts
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── index.ts
│   │   ├── features/              # Feature-specific components
│   │   │   ├── auth/
│   │   │   │   ├── AuthProvider.tsx
│   │   │   │   ├── LoginButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardStats.tsx
│   │   │   │   ├── DashboardChart.tsx
│   │   │   │   └── index.ts
│   │   │   └── profile/
│   │   │       ├── ProfileCard.tsx
│   │   │       ├── ProfileSettings.tsx
│   │   │       └── index.ts
│   │   ├── common/                # Reusable components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── index.ts
│   │   └── index.ts               # Export all components
│   ├── pages/                     # Page components (if using file-based routing)
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── index.ts
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts             # Auth-related hooks
│   │   ├── useLocalStorage.ts     # Local storage hook
│   │   ├── useDebounce.ts         # Debounce hook for searches
│   │   ├── useApiError.ts         # Error handling hook
│   │   └── index.ts
│   ├── lib/                       # Utility libraries and configurations
│   │   ├── utils.ts               # Shadcn utility functions (cn, etc.)
│   │   ├── constants.ts           # App constants
│   │   ├── validations.ts         # Zod schemas or validation rules
│   │   ├── formatters.ts          # Date, currency, text formatters
│   │   └── index.ts
│   ├── store/                     # Zustand state management
│   │   ├── slices/
│   │   │   ├── authStore.ts       # Auth-related state
│   │   │   ├── userStore.ts       # User profile state
│   │   │   ├── themeStore.ts      # Theme/UI state
│   │   │   └── index.ts
│   │   ├── providers/
│   │   │   ├── QueryProvider.tsx  # React Query provider
│   │   │   ├── ThemeProvider.tsx  # Theme provider
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── api/                       # React Query API layer
│   │   ├── queries/
│   │   │   ├── userQueries.ts     # User-related queries
│   │   │   ├── authQueries.ts     # Auth queries
│   │   │   ├── dashboardQueries.ts
│   │   │   └── index.ts
│   │   ├── mutations/
│   │   │   ├── userMutations.ts   # User mutations
│   │   │   ├── authMutations.ts   # Auth mutations
│   │   │   └── index.ts
│   │   ├── client.ts              # Axios/fetch client setup
│   │   ├── queryKeys.ts           # Query key factory
│   │   └── index.ts
│   ├── styles/                    # Global styles and theme
│   │   ├── globals.css            # Tailwind imports and global styles
│   │   ├── components.css         # Component-specific styles
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   ├── types/                     # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── components.ts
│   │   └── index.ts
│   ├── assets/                    # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── App.tsx                    # Main App component
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts             # Vite type declarations
├── components.json                # Shadcn/UI configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── README.md
```
