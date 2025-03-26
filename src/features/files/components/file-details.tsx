import { useUserFiles } from "../hooks/use-file-upload";

const DetailsPage = () => {
  const { data: uploads, isLoading, isError } = useUserFiles();

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Error loading uploads</div>
    );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Uploaded Files</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">File Name</th>
              <th className="py-2 px-4 border">Upload Date</th>
              <th className="py-2 px-4 border">Start Date</th>
              <th className="py-2 px-4 border">End Date</th>
              <th className="py-2 px-4 border">Records</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {uploads?.map((upload) => (
              <tr key={upload.id}>
                <td className="py-2 px-4 border">{upload.fileName}</td>
                <td className="py-2 px-4 border">
                  {new Date(upload.uploadDate).toLocaleString()}
                </td>
                <td className="py-2 px-4 border">{upload.startDate}</td>
                <td className="py-2 px-4 border">{upload.endDate}</td>
                <td className="py-2 px-4 border">{upload.recordCount}</td>
                <td className="py-2 px-4 border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      upload.status === "processed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {upload.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsPage;
