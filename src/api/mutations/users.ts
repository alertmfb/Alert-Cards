import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../services/users";
import { toast } from "sonner";
import type { UpdateUserData } from "@/types/users";

export const useSuspendUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => usersApi.suspendUser(userId),
    onSuccess: (data, userId) => {
      // Invalidate users list to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Show success toast
      toast.success(data.message || "User suspended successfully");
    },
    onError: (error: any) => {
      console.error("Suspend user mutation error:", error);

      // Show error toast
      const errorMessage =
        error?.response?.data?.message || "Failed to suspend user";
      toast.error(errorMessage);
    },
  });
};

export const useActivateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => usersApi.activateUser(userId),
    onSuccess: (data, userId) => {
      // Invalidate users list to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Show success toast
      toast.success(data.message || "User activated successfully");
    },

    onError: (error: any) => {
      console.error("Activate user mutation error:", error);

      // Show error toast
      const errorMessage =
        error?.response?.data?.message || "Failed to activate user";
      toast.error(errorMessage);
    },
  });
};

export const useUpdateUserBranchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      branchName,
    }: {
      userId: string;
      branchName: string;
    }) => usersApi.updateUserBranch(userId, branchName),
    onSuccess: (data, { userId }) => {
      // Invalidate users list to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Show success toast
      toast.success(data.message || "User branch updated successfully");
    },
    onError: (error: any) => {
      console.error("Update user branch mutation error:", error);

      // Show error toast
      const errorMessage =
        error?.response?.data?.message || "Failed to update user branch";
      toast.error(errorMessage);
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      userData,
    }: {
      userId: string;
      userData: UpdateUserData;
    }) => usersApi.updateUser(userId, userData),
    onSuccess: (data, { userId }) => {
      // Invalidate users list to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Show success toast
      toast.success(data.message || "User updated successfully");
    },
    onError: (error: any) => {
      console.error("Update user mutation error:", error);

      // Show error toast
      const errorMessage =
        error?.response?.data?.message || "Failed to update user";
      toast.error(errorMessage);
    },
  });
};
