import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileDetailsItems } from "./file-details-items";

const FileDetailsDialog = ({
  data,
  columnsList,
}: {
  data: any[];
  columnsList: string[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[80vw] h-[95vh] overflow-y-hidden flex flex-col ">
        <DialogHeader>
          <DialogTitle>File Content</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <FileDetailsItems data={data} columnsList={columnsList} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileDetailsDialog;
