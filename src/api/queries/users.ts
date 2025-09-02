// @/api/queries/user.ts
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../services/users";
import { isClient } from "@/lib/utils/storage";
import type { ServerUser } from "@/types";

export const useUsersQuery = (options?: { enabled?: boolean }) =>
  useQuery<ServerUser[]>({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
    enabled: isClient() && options?.enabled !== false,
    retry: (c, e: any) =>
      e?.statusCode === 401 || e?.message === "Unauthorized" ? false : c < 3,
    staleTime: 5 * 60 * 1_000,
    gcTime: 10 * 60 * 1_000,
  });

// Optional: Query for a specific user if needed
// export const useUserQuery = (userId: string) => {
//   return useQuery({
//     queryKey: ["user", userId],
//     queryFn: () => {
//       // This would need to be implemented in your API
//       // For now, you can filter from the users list
//       return usersApi.getUsers().then(users =>
//         users.find(user => user.id === userId)
//       );
//     },
//     enabled: !!userId,
//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//   });
// };
