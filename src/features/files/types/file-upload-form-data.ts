import { z } from 'zod';

export const fileUploadSchema = z.object({
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  dateType: z.enum(["created", "modified"], {
    required_error: "Date Type is required",
  }),
  file: z
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) =>
        [
          "text/csv",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.type),
      {
        message: "Only CSV or XLSX files are allowed",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File must be less than 5MB",
    }),
});

export type FileUploadFormData = z.infer<typeof fileUploadSchema>;