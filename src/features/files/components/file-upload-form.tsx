import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { parseCSV } from "@/utils/parseCsv";
import { CsvFileDetails } from "../types/file";
import {
  FileUploadFormData,
  fileUploadSchema,
} from "../types/file-upload-form-data";
import { useUploadCSV } from "../hooks/use-file-upload";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export const FileUploadForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const methods = useForm<FileUploadFormData>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      dateType: "created",
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const uploadMutation = useUploadCSV(navigate);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

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
        endDate: data.endDate.toDateString(),
        dateType: data.dateType,
        recordsCount: csvDetails.recordCount,
        columns: csvDetails.columns,
        data: csvDetails.data,
        status: "processed",
        createdAt: new Date().toDateString(),
        startDate: data.startDate.toDateString(),
      };
      uploadMutation.mutate(processedCsvRecord);
    } catch (e) {
      toast.error("Error saving file");
    }
  };

  if(uploadMutation.isPending) return <div className="text-center py-4">Processing...</div>
  if(uploadMutation.error) return <div className="text-center py-4">Error uploading file, please refresh page...</div>
  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload CSV File</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="startDate"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-col my-4">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a start date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date && endDate && date > endDate) return;
                        setValue("startDate", date ?? new Date(), {
                          shouldValidate: true,
                        });
                      }}
                      disabled={(date) => (endDate ? date > endDate : false)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>{errors.startDate?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="endDate"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-col my-4">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick an end date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date && startDate && date < startDate) return;
                        setValue("endDate", date ?? new Date(), {
                          shouldValidate: true,
                        });
                      }}
                      disabled={(date) =>
                        startDate ? date < startDate : false
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>{errors.endDate?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="dateType"
            control={control}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>Date Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a date type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="created">Created Date</SelectItem>
                    <SelectItem value="modified">Modified Date</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage>{errors.dateType?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* <div>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
            />
            {errors.file && <p>{errors.file.message}</p>}
          </div> */}
          <FormField
            name="file"
            control={control}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={(e) => setValue("file", e.target.files?.[0])}
                  />
                </FormControl>
                <p className="text-sm mt-2">
                  {field.value?.name ?? "No file selected"}
                </p>
                <FormMessage>{errors.file?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={uploadMutation.isPending}
            className="my-4 ml-auto"
          >
            Upload
          </Button>
        </form>
      </FormProvider>
      {uploadMutation.isPending && <p>Uploading...</p>}
    </div>
  );
};
