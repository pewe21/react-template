import { deleteBook, fetchBooks } from "@/app/actions/bookAction";
import { closeDeleteModal } from "@/app/features/bookSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function DeleteDialog() {
  const dispatch = useAppDispatch();
  const { isDeleteOpenModal, selectedID } = useAppSelector(
    (state) => state.book
  );
  return (
    <AlertDialog
      open={isDeleteOpenModal}
      onOpenChange={() => dispatch(closeDeleteModal())}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the book
            with ID: {selectedID}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              dispatch(deleteBook(selectedID as string)).then((res) => {
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
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
