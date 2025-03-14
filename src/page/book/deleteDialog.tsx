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

  const handleCloseModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    dispatch(deleteBook(selectedID as string)).then((res) => {
      if (res.payload.status == "success") {
        toast.success("Book has been deleted successfully", {
          position: "top-center",
        });
        dispatch(fetchBooks());
      } else {
        toast.error("Failed to delete book");
      }
    });
  };

  return (
    <AlertDialog open={isDeleteOpenModal} onOpenChange={handleCloseModal}>
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
          <AlertDialogAction onClick={handleDelete}>
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
