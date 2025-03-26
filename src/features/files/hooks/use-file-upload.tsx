
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadCSVFile, fetchUserFiles, } from '../services/file-upload-service';
import { CsvFileDetails } from '../types/file';
import { toast } from 'sonner';

export const useUploadCSV = (navigate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CsvFileDetails) => {
      return await uploadCSVFile(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("File uploaded successfully!");
      navigate('/details')
    },
    onError: () => toast.error("Error saving file"),
  });
};

export const useUserFiles = () => {
  return useQuery({
    queryKey: ['files'],
    queryFn: fetchUserFiles,
  });
};

