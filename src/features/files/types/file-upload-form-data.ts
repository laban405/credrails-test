import { z } from "zod";

export const fileUploadSchema = z
  .object({
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    dateType: z.enum(["created", "modified"], {
      
      required_error: "Date Type is required",
    }).default("created"),
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
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date cannot be after end date",
    path: ["startDate"], // Show error on startDate field
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be before start date",
    path: ["endDate"], // Show error on endDate field
  });

export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
