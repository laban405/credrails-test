import Papa from "papaparse";

export const parseCSV = (file: File): Promise<{ name: string; creationDate: string; recordCount: number }> => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const reader = new FileReader();
    
    reader.onload = ({ target }) => {
      if (!target?.result) return reject("File reading error");
      Papa.parse(target.result as string, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve({
            name: file.name,
            creationDate: new Date(file.lastModified).toLocaleDateString(),
            recordCount: result.data.length,
          });
        },
        error: (error) => reject(error.message),
      });
    };
    reader.readAsText(file);
  });
};
