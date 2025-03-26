import { FilesList } from "@/features/files/components/file-list";
import React from "react";

function FileDetailsPage() {
  return (
    <div className="flex items-center flex-col">
      {" "}
      <FilesList />
    </div>
  );
}

export default FileDetailsPage;
