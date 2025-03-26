export interface CsvFileDetails {
    id: string | number;
    userId: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    startDate: string;
    endDate: string;
    dateType: string;
    recordsCount: number;
    status: 'processed';
    createdAt: string;
    columns:string[],
    data:any[]
  }
