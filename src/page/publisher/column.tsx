import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";

import { useAppDispatch } from "@/app/hook";
import { openDeleteModal } from "@/app/features/publisherSlice";
import { PublisherType } from "./types";

const publisherColumns: ColumnDef<PublisherType>[] = [
  {
    accessorKey: "number",
    size: 100,
    maxSize: 100,
    enableResizing: false,
    enableHiding: false,
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    size: 700,
    maxSize: 700,
    enableResizing: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dataRow = row.original;
      return (
        <div className="flex flex-col gap-2">
          <div className="uppercase font-semibold">{row.getValue("name")}</div>
          <div className="capitalize">Added By: {dataRow.addedBy.name}</div>
        </div>
      );
    },
  },

  {
    id: "actions",

    size: 100,
    maxSize: 100,
    enableResizing: false,

    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original;
      const dispatch = useAppDispatch();

      const handleDelete = () => {
        dispatch(openDeleteModal({ isOpenModal: true, id: book.id }));
      };

      return (
        <div className="flex gap-2 items-center justify-center">
          <Button variant="link" onClick={handleDelete}>
            <Trash />
            Delete
          </Button>
        </div>
      );
    },
  },
];

export { publisherColumns };
