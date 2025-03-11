import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Clipboard,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { BookType } from "./types";
import { useAppDispatch } from "@/app/hook";
import { openDeleteModal, openEditModal } from "@/app/features/bookSlice";
import { toast } from "sonner";

const bookColumns: ColumnDef<BookType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "number",
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
    enableResizing: false,
    enableHiding: false,
    size: 100,
    maxSize: 100,
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dataRow = row.original;
      return (
        <div className="flex flex-col gap-2">
          <div className="capitalize font-semibold">{dataRow.code}</div>
          <div className="capitalize">Added By: {dataRow.addedBy.name}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "name",
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div>Description</div>,
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">{row.getValue("description")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original;
      const dispatch = useAppDispatch();

      const handleCopyBookCode = () => {
        navigator.clipboard.writeText(book.code);
        toast.success("Book ID copied to clipboard");
      };

      const handleEdit = () => {
        dispatch(openEditModal({ isOpenModal: true, id: book.id }));
      };

      const handleDelete = () => {
        dispatch(openDeleteModal({ isOpenModal: true, id: book.id }));
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopyBookCode}>
              <Clipboard /> Copy Book Code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export { bookColumns };
