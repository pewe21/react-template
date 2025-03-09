import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { deleteBook, fetchBooks } from "@/app/actions/bookAction";
import { useAppDispatch } from "@/app/hook";
import { toast } from "sonner";
import { openCreateModal, openEditModal } from "@/app/features/bookSlice";
import { DeleteDialog } from "./deleteDialog";

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(book.id)}
            >
              <Clipboard /> Copy Book ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                dispatch(openEditModal({ isOpenModal: true, id: book.id }));
              }}
            >
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                dispatch(deleteBook(book.id)).then((res) => {
                  if (res.payload.status == "success") {
                    toast.success("Book has been deleted successfully", {
                      position: "top-center",
                    });
                    dispatch(fetchBooks()).then();
                  } else {
                    toast.error("Failed to delete book");
                  }
                });
              }}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DeleteDialog />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export { bookColumns };
