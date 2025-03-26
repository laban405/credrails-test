import { apiClient } from "@/api/axios-mock-Instance";

export const getUser = async () => {
  return await apiClient.get("/auth/me");
};
