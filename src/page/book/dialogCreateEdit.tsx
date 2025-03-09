import { addBook, fetchBooks, getBookById } from "@/app/actions/bookAction";
import { closeModal, openCreateModal } from "@/app/features/bookSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { AppDispatch } from "@/app/store";
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
import { toast } from "sonner";

export function DialogCreateEditBook() {
  const dispatch = useAppDispatch();
  const { isOpenModal, selectedID, modeModal } = useAppSelector(
    (state) => state.book
  );

  interface FormBook {
    code: string;
    title: string;
    desc: string;
  }

  const [formBook, setFormBook] = useState<FormBook>({
    code: "",
    title: "",
    desc: "",
  });

  useEffect(() => {
    if (modeModal === "edit" && selectedID) {
      dispatch(getBookById(selectedID)).then((res) => {
        if (res.payload.data) {
          setFormBook({
            code: res.payload.data.code,
            title: res.payload.data.name,
            desc: res.payload.data.description,
          });
        }
      });
    } else {
      setFormBook({
        code: "",
        title: "",
        desc: "",
      });
    }
  }, [modeModal, selectedID]);

  const handleSubmit = () => {
    dispatch(addBook(formBook)).then((res) => {
      if (res.payload.status === "success") {
        modeModal === "create" &&
          toast.success("Book has been created successfully", {
            position: "top-center",
          });
        modeModal === "edit" &&
          toast.success("Book has been updated successfully", {
            position: "top-center",
          });
        dispatch(closeModal());
        dispatch(fetchBooks());
      } else {
        toast.error("Failed to create book");
      }

      setFormBook({
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
        <div className="grid gap-4 py-4">
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
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
