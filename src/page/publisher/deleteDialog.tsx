import {
  deletePublisher,
  fetchPublishers,
} from "@/app/actions/publisherAction";
import { closeDeleteModal } from "@/app/features/publisherSlice";
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
    (state) => state.publisher
  );

  const handleCloseModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    dispatch(deletePublisher(selectedID as string)).then((res) => {
      if (res.payload.status == "success") {
        toast.success("Publisher has been deleted successfully", {
          position: "top-center",
        });
        dispatch(fetchPublishers());
      } else {
        toast.error("Failed to delete publisher");
      }
    });
  };

  return (
    <AlertDialog open={isDeleteOpenModal} onOpenChange={handleCloseModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            publisher with ID: {selectedID}
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
