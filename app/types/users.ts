// Response types for user operations
export interface UserOperationResponse {
  status: "success";
  data: {
    id: string;
  };
  message: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  branch?: string;
}

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  branch?: string;
}
