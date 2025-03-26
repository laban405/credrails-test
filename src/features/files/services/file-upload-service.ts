import { apiClient } from "@/api/axios-mock-Instance";
import { CsvFileDetails } from "../types/file";

export const uploadCSVFile = async (data: CsvFileDetails) => {
  return await apiClient.post("/files/upload", {
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchUserFiles = async () => {
  const response = await apiClient.get("/files");
  return response.data;
};
