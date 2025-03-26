import { apiClient } from "@/api/axios-mock-Instance";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  return await apiClient.post("/auth/login", credentials);
};
