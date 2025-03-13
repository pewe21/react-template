import { addBook, fetchBooks, getBookById } from "@/app/actions/bookAction";
import { closeModal } from "@/app/features/publisherSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { BookValidation } from "@/app/validation/book-validation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SendIcon } from "lucide-react";
import { PublisherValidation } from "@/app/validation/publisher-validation";
import { addPublisher, fetchPublishers } from "@/app/actions/publisherAction";

export function DialogCreateEditPublisher() {
  const dispatch = useAppDispatch();
  const { isOpenModal, selectedID, modeModal } = useAppSelector(
    (state) => state.publisher
  );
  let form;
  if (modeModal === "create") {
    form = useForm<z.infer<typeof PublisherValidation.CREATE>>({
      resolver: zodResolver(PublisherValidation.CREATE),
      defaultValues: {
        name: "",
      },
    });
  } else {
    form = useForm<z.infer<typeof PublisherValidation.EDIT>>({
      resolver: zodResolver(PublisherValidation.EDIT),
      defaultValues: {
        name: "",
      },
    });
  }

  useEffect(() => {
    if (modeModal === "edit" && selectedID) {
      dispatch(getBookById(selectedID)).then((res) => {
        if (res.payload.data) {
          form.reset({
            name: res.payload.data.name,
          });
        }
      });
    } else {
      form.reset({
        name: "",
      });
    }
  }, [modeModal, selectedID, dispatch]);

  const handleUpdate = (values: z.infer<typeof PublisherValidation.EDIT>) => {
    dispatch(addPublisher(values)).then((res) => {
      if (res.payload.status === "success") {
        toast.success("Publisher has been updated successfully", {
          position: "top-center",
        });
        dispatch(closeModal());
        dispatch(fetchPublishers());
      } else {
        toast.error("Failed to create publisher");
      }

      form.reset({
        name: "",
      });
    });
  };

  const handleCreate = (values: z.infer<typeof PublisherValidation.CREATE>) => {
    dispatch(addPublisher(values)).then((res) => {
      if (res.payload.status === "success") {
        toast.success("Publisher has been created successfully", {
          position: "top-center",
        });
        dispatch(closeModal());
        dispatch(fetchPublishers());
      } else {
        toast.error("Failed to create publisher");
      }

      form.reset({
        name: "",
      });
    });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    form.reset({
      name: "",
    });
  };
  return (
    <Dialog open={isOpenModal} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {modeModal === "create" ? "Create Publisher" : "Edit Publisher"}
          </DialogTitle>
          <DialogDescription>
            {modeModal === "create"
              ? "Create a new publisher by filling the form below"
              : "Edit the publisher by filling the form below"}
          </DialogDescription>
          <DialogClose />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              modeModal === "create" ? handleCreate : handleUpdate
            )}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button type="submit">
                <SendIcon className="w-5 h-5 -ml-1" />
                Submit
              </Button>
              <Button type="button" variant="ghost" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
