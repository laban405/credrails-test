import Papa from "papaparse";

export type CsvRow = Record<string, any>;
export const parseCSV = (
  file: File
): Promise<{
  name: string;
  creationDate: string;
  recordCount: number;
  columns: string[];
  data: CsvRow[];
}> => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const reader = new FileReader();

    reader.onload = ({ target }) => {
      if (!target?.result) return reject("File reading error");
      Papa.parse(target.result as string, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const columns = Object.keys(result.data[0] || {});

          const formattedData: CsvRow[] = result.data.map((row: any) => {
            const formattedRow: CsvRow = {};

            Object.keys(row).forEach((key) => {
              formattedRow[key] = isNaN(Number(row[key]))
                ? row[key]
                : Number(row[key]);
            });

            return formattedRow;
          });

          resolve({
            name: file.name,
            creationDate: new Date(file.lastModified).toLocaleDateString(),
            recordCount: result.data.length,
            columns,
            data: formattedData,
          });
        },
        error: (error) => reject(error.message),
      });
    };
    reader.readAsText(file);
  });
};
