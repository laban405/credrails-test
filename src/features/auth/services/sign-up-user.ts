import { apiClient } from "@/api/axios-mock-Instance";
import { SignupData } from "../types/sign-up";

export const signUpUser = async (userData: SignupData) => {
  return  await apiClient.post("/auth/signup", userData);
};
