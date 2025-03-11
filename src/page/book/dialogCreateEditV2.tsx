import { addBook, fetchBooks, getBookById } from "@/app/actions/bookAction";
import { closeModal } from "@/app/features/bookSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { BookValidation } from "@/app/validation/book-validation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z, ZodError } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function DialogCreateEditBookV2() {
  const dispatch = useAppDispatch();
  const { isOpenModal, selectedID, modeModal } = useAppSelector(
    (state) => state.book
  );

  //   interface FormBook {
  //     code: string;
  //     title: string;
  //     desc: string;
  //   }
  let form;
  if (modeModal === "create") {
    form = useForm<z.infer<typeof BookValidation.CREATE>>({
      resolver: zodResolver(BookValidation.CREATE),
      defaultValues: {
        code: "",
        title: "",
        desc: "",
      },
    });
  } else {
    form = useForm<z.infer<typeof BookValidation.EDIT>>({
      resolver: zodResolver(BookValidation.EDIT),
      defaultValues: {
        code: "",
        title: "",
        desc: "",
      },
    });
  }

  useEffect(() => {
    if (modeModal === "edit" && selectedID) {
      dispatch(getBookById(selectedID)).then((res) => {
        if (res.payload.data) {
          form.reset({
            code: res.payload.data.code,
            title: res.payload.data.name,
            desc: res.payload.data.description,
          });
        }
      });
    } else {
      form.reset({
        code: "",
        title: "",
        desc: "",
      });
    }
  }, [modeModal, selectedID]);
  

  const handleUpdate = (values: z.infer<typeof BookValidation.EDIT>) => {
    dispatch(addBook(values)).then((res) => {
      if (res.payload.status === "success") {
        toast.success("Book has been updated successfully", {
          position: "top-center",
        });
        dispatch(closeModal());
        dispatch(fetchBooks());
      } else {
        toast.error("Failed to create book");
      }

      form.reset({
        code: "",
        title: "",
        desc: "",
      });
    });
  };

  const handleCreate = (values: z.infer<typeof BookValidation.CREATE>) => {
    dispatch(addBook(values)).then((res) => {
      if (res.payload.status === "success") {
        toast.success("Book has been created successfully", {
          position: "top-center",
        });
        dispatch(closeModal());
        dispatch(fetchBooks());
      } else {
        toast.error("Failed to create book");
      }

      form.reset({
        code: "",
        title: "",
        desc: "",
      });
    });
  };
  return (
    <Dialog open={isOpenModal} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {modeModal === "create" ? "Create Book" : "Edit Book"}
          </DialogTitle>
          <DialogDescription>
            {modeModal === "create"
              ? "Create a new book by filling the form below"
              : "Edit the book by filling the form below"}
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Code"
                      autoFocus
                      disabled={modeModal === "edit"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              placeholder="Enter the code"
              className="col-span-3"
              value={formBook.code}
              disabled={modeModal === "edit"}
              onChange={(e) =>
                setFormBook((prev) => ({ ...prev, code: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter the name"
              className="col-span-3"
              value={formBook.title}
              onChange={(e) =>
                setFormBook((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter the description"
              className="col-span-3"
              value={formBook.desc}
              onChange={(e) =>
                setFormBook((prev) => ({ ...prev, desc: e.target.value }))
              }
            ></Textarea>
          </div>
        </div> */}
        {/* <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
