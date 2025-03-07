import { addBook, fetchBooks } from "@/app/actions/bookAction";
import { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function DialogCreateBook() {
  const dispatch = useDispatch<AppDispatch>();
  const [formBook, setFormBook] = useState({
    code: "",
    title: "",
    desc: "",
  });

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false); // 🔥 Fungsi untuk menutup dialog
  };

  const handleSubmit = () => {
    dispatch(addBook(formBook)).then((res) => {
      if (res.payload.status === "success") {
        closeDialog();
        dispatch(fetchBooks());
      } else {
        alert("Failed to create book");
      }

      setFormBook({
        code: "",
        title: "",
        desc: "",
      });
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>
            Make sure your book is unique and easy to remember.
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
