import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const buildTableColumns = (columns: string[]): ColumnDef<any>[] => {
  return columns.map((item) => {
    return {
      accessorKey: item,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.getValue(item)}</div>,
    };
  });
};
