import Papa from "papaparse";
import * as XLSX from "xlsx";

export type CsvRow = Record<string, any>;
export const parseFile = (
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
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    reader.onload = ({ target }) => {
      if (!target?.result) return reject("File reading error");

      if (fileExtension === "csv") {
        console.log("csv formating");

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
      } else if (fileExtension === "xlsx") {
        const workbook = XLSX.read(target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: CsvRow[] = XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
        });

        const columns = Object.keys(jsonData[0] || {});

        resolve({
          name: file.name,
          creationDate: new Date(file.lastModified).toLocaleDateString(),
          recordCount: jsonData.length,
          columns,
          data: jsonData,
        });
      } else {
        reject("Unsupported file format. Please upload a CSV or XLSX file.");
      }
    };

    if (fileExtension === "csv") {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  });
};
