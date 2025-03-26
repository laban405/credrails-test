import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { parseCSV } from "@/utils/parseCsv";
import { CsvFileDetails } from "../types/file";
import { FileUploadFormData, fileUploadSchema } from "../types/file-upload-form-data";
import { useUploadCSV } from "../hooks/use-file-upload";

export const FileUploadForm = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm<FileUploadFormData>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      dateType: "created",
    },
  });

  const uploadMutation = useUploadCSV()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setValue("file", event.target.files[0]);
    }
  };

  const onSubmit = async (data: FileUploadFormData) => {
    try {
      const file: File = data.file;
      const csvDetails = await parseCSV(file);
      const processedCsvRecord: CsvFileDetails = {
        id: Date.now(),
        userId: user.id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        endDate: data.endDate,
        dateType: data.dateType,
        recordsCount: csvDetails.recordCount,
        status: "processed",
        createdAt: new Date().toDateString(),
        startDate: data.startDate,
      };
      uploadMutation.mutate(processedCsvRecord);
    } catch (e) {
      toast.error("Error saving file");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload CSV File</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="date" {...register("startDate")} />
          {errors.startDate && <p>{errors.startDate.message}</p>}
        </div>
        <div>
          <input type="date" {...register("endDate")} />
          {errors.endDate && <p>{errors.endDate.message}</p>}
        </div>
        <div>
          <select {...register("dateType")}>
            <option value="created">Created Date</option>
            <option value="modified">Modified Date</option>
          </select>
          {errors.dateType && <p>{errors.dateType.message}</p>}
        </div>
        <div>
          <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
          {errors.file && <p>{errors.file.message}</p>}
        </div>
        <button type="submit" disabled={uploadMutation.isPending}>
          Upload
        </button>
      </form>
      {uploadMutation.isPending && <p>Uploading...</p>}
    </div>
  );
};
